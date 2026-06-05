import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../../styles/ai/PortfolioChat.module.css';
import { PortfolioMascot, type MascotState } from './PortfolioMascot';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SUGGESTIONS = [
  "Tell me about Shiva's experience.",
  "What is his core tech stack?",
  "Can you share some of his full-stack projects?",
  "Does he have a YouTube channel?",
];

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('portfolio_chat_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return [
      {
        id: '1',
        text: "Hi there! I'm Shiva's AI Assistant. Ask me anything about Shiva's career, projects, or skills!",
        sender: 'ai',
        timestamp: new Date(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('portfolio_chat_messages', JSON.stringify(messages));
  }, [messages]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState<MascotState>('listening');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(), 150);
    } else {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setChatStatus('thinking');

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: text,
          history: messages.map(msg => ({
            text: msg.text,
            sender: msg.sender
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.result || "I'm sorry, I couldn't process that. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setChatStatus('success');
      setTimeout(() => setChatStatus('listening'), 2000);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong. Shiva's backend might be sleeping. Try again later!",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setChatStatus('error');
      setTimeout(() => setChatStatus('listening'), 3000);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <PortfolioMascot state="listening" size={40} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <PortfolioMascot state={chatStatus} size={32} />
                <div>
                  <h3>Shiva's AI</h3>
                  <p 
                    style={{ 
                      margin: 0, 
                      fontSize: '0.7rem', 
                      color: chatStatus === 'error' ? '#f43f5e' : chatStatus === 'thinking' ? '#818cf8' : '#28a745',
                      fontWeight: 600,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {chatStatus === 'thinking' ? 'Thinking...' : chatStatus === 'error' ? 'Offline/Error' : 'Online'}
                  </p>
                </div>
              </div>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.messageList}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${msg.sender === 'user' ? styles.userMessage : styles.aiMessage
                    }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.message} ${styles.aiMessage}`}>
                  <div className={styles.thinking}>Assistant is thinking...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length < 3 && (
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    className={styles.suggestionChip}
                    onClick={() => handleSend(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form
              className={styles.chatInputArea}
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={!input.trim() || isTyping}
              >
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
