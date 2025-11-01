(() => {
  const d = document;
  const $ = (s) => d.querySelector(s);
  const messages = $('#messages');
  const chatMain = $('.chat-main');
  const form = $('#chat-form');
  const input = $('#message');
  const sendBtn = $('#send');

  // Smooth scroll to bottom
  function scrollToBottom() {
    setTimeout(() => {
      if (chatMain) {
        chatMain.scrollTo({
          top: chatMain.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function append(role, text, isLoading = false) {
    const wrap = d.createElement('div');
    wrap.className = `msg ${role}`;
    
    // Icon for messages (user or bot)
    const icon = d.createElement('div');
    icon.className = role === 'bot' ? 'bot-icon' : 'user-icon';
    icon.textContent = role === 'bot' ? '🤖' : '👤';
    wrap.appendChild(icon);

    const content = d.createElement('div');
    content.className = 'msg-content';
    
    const header = d.createElement('div');
    header.className = 'msg-header';
    
    const roleSpan = d.createElement('span');
    roleSpan.className = 'role';
    roleSpan.textContent = role === 'user' ? 'You' : 'Abi.LazAI';
    
    const timeSpan = d.createElement('span');
    timeSpan.className = 'time';
    timeSpan.textContent = formatTime();
    
    header.appendChild(roleSpan);
    header.appendChild(timeSpan);
    
    const textDiv = d.createElement('div');
    textDiv.className = 'msg-text';
    
    if (isLoading) {
      textDiv.className = 'msg-text loading';
      textDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    } else {
      textDiv.textContent = text;
    }
    
    content.appendChild(header);
    content.appendChild(textDiv);
    wrap.appendChild(content);
    
    messages.appendChild(wrap);
    scrollToBottom();
    return wrap;
  }

  async function send(message) {
    sendBtn.disabled = true;
    input.disabled = true;
    try {
      append('user', message);
      const thinking = append('bot', '', true);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      thinking.remove();
      if (!res.ok) {
        append('bot', data?.error || 'Something went wrong.');
        return;
      }
      append('bot', data.reply);
    } catch (e) {
      append('bot', 'Network error. Is the server running?');
    } finally {
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    send(msg);
  });
})();
