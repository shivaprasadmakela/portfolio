import styles from '../../styles/home/Header.module.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <h5 className={styles.logoText}>
        <span className={styles.brace}>{"{"}</span>
        S
        <span className={styles.brace}>{"}"}</span>
      </h5>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const getLinkClass = (path: string) =>
    `${styles.link} ${pathname === path ? styles.active : ''}`;

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
          <Link to="/" className={getLinkClass('/')} onClick={closeMenu}>Home</Link>
          <Link to="/projects" className={getLinkClass('/projects')} onClick={closeMenu}>Projects</Link>
          <Link to="/blogs" className={getLinkClass('/blogs')} onClick={closeMenu}>Blog</Link>
        </nav>
      </header>
    </motion.header>
  );
}
