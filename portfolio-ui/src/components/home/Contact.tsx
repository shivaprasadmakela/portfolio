import { useState } from 'react';
import styles from '../../styles/home/Contact.module.css';
import {
  FaEnvelope,
  FaRegCopy,
  FaPaperPlane
} from 'react-icons/fa';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'shivaprasadmekala@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contactCard}>
          <div className={styles.cardHeader}>
            <span className={styles.tag}>GET IN TOUCH</span>
            <h1 className={styles.title}>Let's Connect</h1>
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
              <button onClick={copyToClipboard} className={styles.copyButton}>
                <FaRegCopy className={styles.btnIcon} />
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}