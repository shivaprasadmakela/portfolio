import React from 'react';
import styles from '../../styles/Challenge.module.css';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface ChallengeHeroProps {
    onJoin: () => void;
}

export const ChallengeHero: React.FC<ChallengeHeroProps> = ({ onJoin }) => {
    return (
        <section className={styles.hero}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className={styles.badge}>🔥 30-Day Challenge • 5:00–6:00 AM IST</span>
                <h1 className={styles.title}>Wake Up With Me Challenge</h1>
                <p className={styles.subtitle}>
                    Master your mornings and build unstoppable discipline.
                    Check in daily between 5:00 AM and 6:00 AM IST to build your streak.
                </p>
                <Button onClick={onJoin}>
                    Join The Challenge
                </Button>
            </motion.div>
        </section>
    );
};
