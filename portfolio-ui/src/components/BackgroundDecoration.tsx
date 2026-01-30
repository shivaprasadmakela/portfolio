import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/admin/Admin.module.css';

const BackgroundDecoration: React.FC = () => {
    return (
        <div className={styles.loginBackgroundDecoration} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
            <motion.div
                className={styles.decorationCircle}
                style={{
                    top: '10%',
                    right: '15%',
                    width: '500px',
                    height: '500px',
                    background: 'var(--bg-decoration-color-1)',
                    filter: 'blur(120px)',
                    opacity: 'var(--bg-decoration-opacity)'
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={styles.decorationCircle}
                style={{
                    bottom: '10%',
                    left: '10%',
                    width: '450px',
                    height: '450px',
                    background: 'var(--bg-decoration-color-2)',
                    filter: 'blur(100px)',
                    opacity: 'var(--bg-decoration-opacity)'
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -60, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={styles.decorationCircle}
                style={{
                    top: '40%',
                    left: '30%',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(80px)',
                    opacity: 0.05
                }}
                animate={{
                    x: [0, 20, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default BackgroundDecoration;
