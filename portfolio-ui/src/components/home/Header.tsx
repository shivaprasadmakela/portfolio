import styles from '../../styles/home/Header.module.css';
import { motion } from 'framer-motion';
import { useState } from 'react';

function Logo() {
  return (
    <a className={styles.logo} href="/">
      <h5 className={styles.logoText}>
        <span className={styles.brace}>{"{"}</span>
        S
        <span className={styles.brace}>{"}"}</span>
      </h5>
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      className={styles.mainHeader}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <header className={styles.header}>
        <Logo />
        <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle navigation">
          ☰
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <a href="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/projects" className={styles.link} onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="/blogs" className={styles.link} onClick={() => setMenuOpen(false)}>Blog</a>
        </nav>
      </header>
    </motion.header>
  );
}
