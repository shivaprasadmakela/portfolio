import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import styles from './PortfolioChat.module.css';
import { PortfolioMascot, type MascotState } from './PortfolioMascot';
import { ChatMessage } from './ChatMessage';
import { useChatStore } from '../../../shared/stores/chatStore';
import { useChat } from '../hooks/useChat';

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
  const { isOpen, setIsOpen } = useChatStore();
  const chatMutation = useChat();

  const handleCloseChat = () => {
    setIsOpen(false);
  };

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
        text: "Beep boop! 🤖 I'm Shiva's AI sidekick. I know all about his coding adventures, React/Java projects, and secret coffee addiction. Ask me anything!",
        sender: 'ai',
        timestamp: new Date(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('portfolio_chat_messages', JSON.stringify(messages));
  }, [messages]);

  const [input, setInput] = useState('');
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
  }, [messages, chatMutation.isPending, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setChatStatus('thinking');

    const chatHistory = messages.map(msg => ({
      text: msg.text,
      sender: msg.sender
    }));

    chatMutation.mutate({
      input: text,
      history: chatHistory
    }, {
      onSuccess: (data) => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.result || "I'm sorry, I couldn't process that. Please try again.",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setChatStatus('success');
        setTimeout(() => setChatStatus('listening'), 2000);
      },
      onError: () => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Oops! Something went wrong. Shiva's backend might be sleeping. Try again later!",
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setChatStatus('error');
        setTimeout(() => setChatStatus('listening'), 3000);
      }
    });
  };

  return (
    <div className={styles.chatWrapper}>
      <button className={styles.chatButton} onClick={isOpen ? handleCloseChat : () => setIsOpen(true)}>
        {isOpen ? (
          <FaTimes />
        ) : (
          <motion.div 
            layoutId="hero-to-chat-mascot"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
          >
            <PortfolioMascot state="listening" size={40} />
          </motion.div>
        )}
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
                <motion.div layoutId="hero-to-chat-mascot" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PortfolioMascot state={chatStatus} size={32} />
                </motion.div>
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
              <button className={styles.closeButton} onClick={handleCloseChat}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.messageList}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {chatMutation.isPending && (
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
                disabled={chatMutation.isPending}
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={!input.trim() || chatMutation.isPending}
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
