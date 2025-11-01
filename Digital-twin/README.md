# LazAI Digital Twin 🤖

A TypeScript-based digital twin application that simulates conversations with ourself, a passionate web3 developer and community builder. This interactive chatbot uses the Alith library to create an AI-powered conversational experience based on our personality, achievements, and communication style.

## 🚀 Features

- **Interactive Chat Interface**: Terminal-based conversation with our digital twin
- **Personality-Driven Responses**: AI responses based on our character data, achievements, and communication style
- **Web3 Focus**: Specialized knowledge in blockchain, DeFi, hackathons, and web3 development
- **TypeScript Support**: Full TypeScript implementation with proper type definitions
- **Character Customization**: Easy to modify personality traits and responses via `character.json`

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **OpenAI API Key** (for the Alith library)

## 🛠️ Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/0xLazAI/Digital-Twin-Starter-kit
   cd Digital-Twin-Starter-kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your OpenAI API Key**
   ```bash
   export OPENAI_API_KEY="your-openai-api-key-here"
   ```
   
   Or add it to your shell profile (`.bashrc`, `.zshrc`, etc.):
   ```bash
   echo 'export OPENAI_API_KEY="your-openai-api-key-here"' >> ~/.zshrc
   source ~/.zshrc
   ```

## 🏃‍♂️ Running the Application

### Development Mode (Recommended)
```bash
npm run dev
```
This command will:
1. Compile TypeScript to JavaScript
2. Run the application

### Production Mode
```bash
npm run build
npm start
```

### Manual Compilation
```bash
npm run build
node index.js
```

## 🎯 Usage

1. **Start the application** using one of the methods above
2. **Wait for the welcome message** - you'll see Thiru.eth's introduction
3. **Type your message** and press Enter to chat
4. **Type "exit"** to end the conversation

### Example Conversation
```
🤖 Abi.LazAI Digital Twin Activated! 🤖

==================================================
👋 Hey! I'm Abi.LazAI, your web3 digital twin!
💬 Let's chat about web3, hackathons, or anything!
📝 Type "exit" to end the conversation
==================================================

You: How do I get started in web3?
Abi.LazAI: Hey! Welcome to the web3 space! 🚀 I'd recommend starting with understanding the basics of blockchain, then diving into smart contracts. I started my journey at hackathons - they're amazing for learning! What's your background? 💪

You: exit
👋 Thanks for chatting! Keep building in web3! 🚀
```

## ⚙️ Configuration

### Character Customization
Edit `character.json` to modify Thiru.eth's personality:

- **bio**: Background information
- **lore**: Key achievements and facts
- **adjectives**: Personality traits
- **topics**: Areas of expertise
- **style**: Communication preferences
- **messageExamples**: Sample conversations
- **postExamples**: Sample social media posts

### TypeScript Configuration
The project uses a modern TypeScript configuration in `tsconfig.json` with:
- ES modules support
- Strict type checking
- Source maps for debugging
- Declaration files generation

## 🔧 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm run dev` - Build and run in one command
- `npm test` - Run tests (placeholder)

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module 'alith'"**
   ```bash
   npm install
   ```

2. **"Error: Failed to get response. Make sure you have set your API key"**
   ```bash
   export OPENAI_API_KEY="your-api-key"
   ```

3. **TypeScript compilation errors**
   ```bash
   npm run build
   # Check the error messages and fix any type issues
   ```

4. **Permission denied errors**
   ```bash
   chmod +x index.js
   ```

## 📚 Dependencies

### Production Dependencies
- **alith**: AI conversation library for creating digital twins

### Development Dependencies
- **typescript**: TypeScript compiler
- **@types/node**: Node.js type definitions
- **@types/json-schema**: JSON Schema type definitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License - see package.json for details
