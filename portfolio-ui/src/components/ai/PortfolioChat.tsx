import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes, FaRegComments } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../../styles/ai/PortfolioChat.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  animate?: boolean;
}

const TypewriterMessage: React.FC<{ text: string; animate?: boolean }> = ({ text, animate }) => {
  const [displayedText, setDisplayedText] = useState(animate ? '' : text);

  useEffect(() => {
    if (!animate) return;
    
    const timeout = setTimeout(() => {
      if (displayedText.length < text.length) {
        setDisplayedText(text.substring(0, displayedText.length + 3));
      }
    }, 15);
    return () => clearTimeout(timeout);
  }, [text, displayedText, animate]);

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{animate ? displayedText : text}</ReactMarkdown>;
};

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

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/ai/chat/stream`, {
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
      if (!response.body) throw new Error('No readable stream available');

      setIsTyping(false); // Remove "Assistant is thinking..."
      
      const aiMessageId = (Date.now() + 1).toString();
      // Add empty message that will be filled up
      setMessages((prev) => [...prev, {
        id: aiMessageId,
        text: '',
        sender: 'ai',
        timestamp: new Date(),
        animate: true
      }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        // The chunk might contain SSE formatted lines like "data: hello\n\n"
        // Since the backend just does emitter.send(text), Spring usually formats it as "data:text\n\n"
        // Wait, Spring's SseEmitter usually prefixes with "data:"
        // Let's clean the SSE format for text
        const textChunks = chunk.split('\n')
            .filter(line => line.startsWith('data:'))
            .map(line => line.substring(5))
            .join('');

        if (textChunks) {
            setMessages((prev) => 
              prev.map((msg) => 
                msg.id === aiMessageId ? { ...msg, text: msg.text + textChunks } : msg
              )
            );
        }
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong. Shiva's backend might be sleeping. Try again later!",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaRegComments />}
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
                <div className={styles.avatar}>S</div>
                <div>
                  <h3>Shiva's AI</h3>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: '#28a745' }}>Online</p>
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
                  {msg.sender === 'ai' ? (
                    <TypewriterMessage text={msg.text} animate={msg.animate} />
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  )}
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
