import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import styles from '../../styles/ErrorPages.module.css';

const NotFound: React.FC = () => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.backgroundShapes}>
                <motion.div
                    className={`${styles.shape} ${styles.shape1}`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className={`${styles.shape} ${styles.shape2}`}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.4, 0.3],
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
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <FiAlertCircle />
            </motion.div>

            <motion.h1
                className={styles.errorCode}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                404
            </motion.h1>

            <motion.h2
                className={styles.errorTitle}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Oops! Page Not Found
            </motion.h2>

            <motion.p
                className={styles.errorDescription}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                The page you're looking for doesn't exist or has been moved.
                Don't worry, even the best explorers get lost sometimes.
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

export default NotFound;
