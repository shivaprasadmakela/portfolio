import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiLock } from 'react-icons/fi';
import styles from '../../styles/ErrorPages.module.css';

const Forbidden: React.FC = () => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.backgroundShapes}>
                <motion.div
                    className={`${styles.shape} ${styles.shape1}`}
                    style={{ background: 'var(--color-text-primary-green)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className={`${styles.shape} ${styles.shape2}`}
                    style={{ background: 'var(--color-text-primary-green)' }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <motion.div
                className={styles.iconContainer}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
                <motion.div
                    animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                >
                    <FiLock size={80} color="var(--color-text-primary-green)" />
                </motion.div>
            </motion.div>

            <motion.h1
                className={styles.errorCode}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                403
            </motion.h1>

            <motion.h2
                className={styles.errorTitle}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Access Denied
            </motion.h2>

            <motion.p
                className={styles.errorDescription}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                You don't have permission to access this page.
                Please contact the administrator if you believe this is an error.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to="/" className={styles.homeButton}>
                    <FiHome /> Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default Forbidden;
