import { useState } from 'react';
import styles from '../../styles/home/Contact.module.css';
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaRegCopy,
  FaPaperPlane
} from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const socialLinks = [
  {
    name: 'LinkedIn',
    handle: '@in/shiva-prasad-m',
    url: 'https://linkedin.com/in/shiva-prasad-m',
    icon: <FaLinkedin />
  },
  {
    name: 'GitHub',
    handle: '@shivaprasadmakela',
    url: 'https://github.com/shivaprasadmakela',
    icon: <FaGithub />
  },

  {
    name: 'Instagram',
    handle: '@shivaprasad',
    url: 'https://instagram.com/mr_chiva',
    icon: <FaInstagram />
  }
];

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
        <div className={styles.header}>
          <span className={styles.tag}>CONNECT</span>
          <h1 className={styles.title}>Let's Connect</h1>
          <p className={styles.description}>
            I'm always open to discussing new projects, creative ideas, or being part of
            your visions. Join my <span className={styles.highlight}>journey</span> of consistency.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.messageCard}>
            <div className={styles.iconWrapper}>
              <FaEnvelope />
            </div>
            <h2 className={styles.cardTitle}>Drop me a message</h2>
            <p className={styles.cardSubtitle}>
              For collaborations, inquiries, or just a virtual coffee.
            </p>

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

          <div className={styles.socialList}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className={styles.socialCard}
              >
                <div className={styles.socialInfo}>
                  <div className={styles.socialIcon}>
                    {link.icon}
                  </div>
                  <div className={styles.socialText}>
                    <span className={styles.socialName}>{link.name}</span>
                    <span className={styles.socialHandle}>{link.handle}</span>
                  </div>
                </div>
                <FiArrowUpRight className={styles.externalLinkIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}