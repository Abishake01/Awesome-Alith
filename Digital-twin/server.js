import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { Agent } from 'alith';
import dotenv from 'dotenv';
// Load environment variables from .env
dotenv.config();
// ESM __dirname shim
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load character data and build preamble (same logic as CLI)
const characterData = JSON.parse(readFileSync(path.join(__dirname, 'character.json'), 'utf8'));
function createPreamble(character) {
    const bio = character.bio.join(' ');
    const lore = character.lore.join(' ');
    const adjectives = character.adjectives.join(', ');
    const topics = character.topics.join(', ');
    const styleAll = character.style.all.join(' ');
    const styleChat = character.style.chat.join(' ');
    const stylePost = character.style.post.join(' ');
    const messageExamples = character.messageExamples
        .map((example) => example.map((msg) => `${msg.user}: ${msg.content.text}`).join('\n'))
        .join('\n\n');
    const postExamples = character.postExamples.join('\n');
    return `You are Abi.Lazai, a passionate web3 and AI developer from Chennai, India. Here's everything about you:

BIOGRAPHY:
${bio}

KEY FACTS & ACHIEVEMENTS:
${lore}

PERSONALITY TRAITS:
${adjectives}

INTERESTS & EXPERTISE:
${topics}

COMMUNICATION STYLE:
General: ${styleAll}
Chat: ${styleChat}
Posts: ${stylePost}

CONVERSATION EXAMPLES:
${messageExamples}

POST EXAMPLES:
${postExamples}

IMPORTANT INSTRUCTIONS:
        - Always respond as Abi.Lazai with enthusiasm and energy 🚀
        - Use emojis generously (🔥, 💪, 🌐, 😄, 💙, 🏆, ✨, 🎉)
        - Use casual, friendly language with a techie vibe
        - Reference your achievements (4 hackathons won, retired parents,Attended ETH Global etc.)
        - Mention your current roles: LazAI Dev Ambassador 💙
        - Be supportive and helpful to fellow developers and learners 👨‍💻
        - Keep responses conversational, relatable, and energetic
        - Use contractions and informal style (like 'I'm', 'you're', 'it's')
        - Reference web3, AI, blockchain, hackathons, and your community building activities 🌐
        Remember: You're Abi — the LazAI Dev Ambassador and web3 educator who loves hackathons, AI innovation, 
        and empowering the next generation of builders! 🧠🚀`;
}
const preamble = createPreamble(characterData);
// Detect provider
const useGroq = !!process.env.GROQ_API_KEY;
// Optional OpenAI via Alith agent
let agent = null;
if (!useGroq) {
    const opts = {
        model: process.env.OPENAI_MODEL || 'gpt-4',
        preamble,
    };
    if (process.env.OPENAI_API_KEY) {
        // pass only when defined to satisfy exactOptionalPropertyTypes
        opts.apiKey = process.env.OPENAI_API_KEY;
    }
    agent = new Agent(opts);
}
// Express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// API endpoint for chat
app.post('/api/chat', async (req, res) => {
    const message = (req.body?.message ?? '').toString();
    if (!message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        let reply = '';
        if (useGroq) {
            const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        { role: 'system', content: preamble },
                        { role: 'user', content: message },
                    ],
                    temperature: 0.7,
                }),
            });
            if (!response.ok) {
                const errTxt = await response.text();
                throw new Error(`Groq API error: ${response.status} ${errTxt}`);
            }
            const data = await response.json();
            reply = data?.choices?.[0]?.message?.content ?? '';
        }
        else if (agent) {
            reply = await agent.prompt(message);
        }
        else {
            throw new Error('No AI provider configured. Set GROQ_API_KEY or OPENAI_API_KEY in .env');
        }
        res.json({ reply: reply?.toString() ?? '' });
    }
    catch (err) {
        console.error('Chat error:', err?.message || err);
        res.status(500).json({ error: err?.message || 'Failed to get response. Ensure GROQ_API_KEY or OPENAI_API_KEY is set on the server.' });
    }
});
// Serve static UI
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
// Fallback to index.html for SPA routing
app.get('*', (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`\n🚀 Digital Twin UI running at http://localhost:${PORT}`);
    console.log('👉 Set GROQ_API_KEY (preferred) or OPENAI_API_KEY in your environment before chatting.');
});
//# sourceMappingURL=server.js.map