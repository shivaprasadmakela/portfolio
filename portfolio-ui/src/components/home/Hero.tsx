import React, { useState } from 'react';
import styles from '../../styles/home/Hero.module.css';
import DotPattern from '../../assets/dot-pattern.svg';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PieceData {
  id: number;
  style: React.CSSProperties;
}

export default function Hero() {
  const [pieces, setPieces] = useState<PieceData[]>([]);

  const handleBurst = (e: React.MouseEvent) => {
    const originX = e.clientX;
    const originY = e.clientY;

    const newPieces: PieceData[] = [];

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 500 + Math.random() * 400;

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const rotationDirection = Math.random() > 0.5 ? 1 : -1;

      newPieces.push({
        id: i,
        style: {
          left: originX,
          top: originY,
          '--x': `${x}px`,
          '--y': `${y}px`,
          '--r': rotationDirection.toString(),
          animationDelay: `${Math.random() * 0.3}s`,
          width: `${8 + Math.random() * 8}px`,
          height: `${10 + Math.random() * 10}px`,
          backgroundColor: Math.random() > 0.5 ? '#28a745' : '#ffffff',
        } as React.CSSProperties,
      });
    }

    setPieces(newPieces);
    setTimeout(() => setPieces([]), 1300);
  };



  return (
    <motion.section
      className={styles.mainHero}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      onClick={handleBurst}
      style={{ cursor: 'pointer', display: 'inline-block', position: 'relative' }}
    >
      <section className={styles.hero}>
        <img src={DotPattern} className={styles.pattern} alt="" loading="lazy" />
        <p className={styles.greeting}>Hey there!, I'm–</p>

        <div
          className={styles.nameContainer}

          style={{ width: '100%', cursor: 'pointer', display: 'inline-block', position: 'relative' }}
        >
          <h1 className={styles.name}>
            Shiva Prasad M<span className={styles.dot}>.</span>
          </h1>

        </div>

        <h2 className={styles.subtitle}>
          <span className={styles.jobTitle}>Software Development Engineer.</span> A self-taught developer with an interest in Computer Science.
        </h2>

        <div className={styles.description}>
          <p className={styles.note}>🚀 Currently specializing in Frontend and Backend(React / Java)</p>
          <p className={styles.note}>⚡ SDE -1 at <a href="#">Modlix</a></p>
        </div>

        <div className={styles.buttonGroup}>
          <a href="https://linkedin.com/in/shiva-prasad-m" target="_blank" className={styles.button}>
            <FaLinkedin className={styles.icon} />
            LinkedIn
          </a>
          <a href="mailto:shivaprasadmakela@gmail.com" className={styles.button}>
            <FaEnvelope className={styles.icon} />
            Email
          </a>

          <a href="https://github.com/shivaprasadmakela" className={styles.button} download>
            <FaGithub className={styles.icon} />
            Github
          </a>
        </div>

        {/* Paper pieces full window */}
        <div className={styles.fullScreenBurst}>
          {pieces.map(({ id, style }) => (
            <span key={id} className={styles.paperPiece} style={style} />
          ))}
        </div>
      </section>
    </motion.section>
  );
}
