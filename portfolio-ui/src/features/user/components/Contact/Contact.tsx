import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.css';
import {
  FaEnvelope,
  FaRegCopy,
  FaPaperPlane
} from 'react-icons/fa';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const email = 'shivaprasadmekala@gmail.com';

  const resetTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyToClipboard = async () => {
    try {
      // Rejects outside a secure context, and is undefined in some in-app browsers.
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopyFailed(true);
    }
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, 2000);
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contactCard}>
          <div className={styles.cardHeader}>
            <span className={styles.tag}>GET IN TOUCH</span>
            <h1 className={styles.title}>Let's <span className={styles.green}>Connect</span></h1>
            <p className={styles.description}>
              I'm always open to discussing new projects, creative ideas, or being part of
              your visions. Join my <span className={styles.highlight}>journey</span> of consistency.
            </p>
          </div>

          <div className={styles.actionSection}>
            <div className={styles.mailGroup}>
              <div className={styles.iconWrapper}>
                <FaEnvelope />
              </div>
              <div className={styles.mailInfo}>
                <h2 className={styles.cardTitle}>Drop me a message</h2>
                <p className={styles.cardSubtitle}>
                  For collaborations, inquiries, or just a virtual coffee.
                </p>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <a href={`mailto:${email}`} className={styles.sendButton}>
                <FaPaperPlane className={styles.btnIcon} />
                Send Email
              </a>
              <button type="button" onClick={copyToClipboard} className={styles.copyButton}>
                <FaRegCopy className={styles.btnIcon} aria-hidden="true" />
                {copyFailed ? 'Press Ctrl+C to copy' : copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
