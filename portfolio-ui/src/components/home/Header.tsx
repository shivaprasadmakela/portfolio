import styles from '../../styles/home/Header.module.css';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className={styles.logoGrid}>
      <div className={styles.logoBox}>S</div>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [prepDropdownOpen, setPrepDropdownOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    // setPrepDropdownOpen(false);
  };

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

        <div className={styles.navContainer}>

          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
            <Link to="/" className={getLinkClass('/')} onClick={closeMenu}>Home</Link>
            <Link to="/projects" className={getLinkClass('/projects')} onClick={closeMenu}>Projects</Link>

            {/* <div className={styles.dropdownContainer}
              onMouseEnter={() => setPrepDropdownOpen(true)}
              onMouseLeave={() => setPrepDropdownOpen(false)}>
              <Link to="/interview-prep" className={getLinkClass('/interview-prep')} onClick={closeMenu}>
                Interview Prep
              </Link>
              {prepDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to="/interview-prep/javascript" onClick={closeMenu}>JavaScript Questions</Link>
                  <Link to="/interview-prep/react" onClick={closeMenu}>React Questions</Link>
                  <Link to="/interview-prep/dsa" onClick={closeMenu}>DSA Questions</Link>
                  <Link to="/interview-prep/system-design" onClick={closeMenu}>System Design</Link>
                  <Link to="/youtube-sets" onClick={closeMenu}>YouTube Question Sets</Link>
                </div>
              )}
            </div> */}

            {/* <Link to="/youtube-sets" className={getLinkClass('/youtube-sets')} onClick={closeMenu}>YouTube Sets</Link> */}
            <Link to="/challenge" className={getLinkClass('/challenge')} onClick={closeMenu}>Challenge</Link>
            {/* <Link to="/blogs" className={getLinkClass('/blogs')} onClick={closeMenu}>Blog</Link> */}
          </nav>
          <ThemeToggle />
          <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle navigation">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>
    </motion.header>
  );
}
