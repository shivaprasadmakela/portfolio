import React from 'react';
import { motion } from 'framer-motion';
import { FiLayers, FiFileText, FiVideo, FiTag } from 'react-icons/fi';
import styles from '../../styles/admin/Admin.module.css';

const AdminDashboard: React.FC = () => {
    const stats = [
        { title: 'Total Question Sets', value: '42', icon: <FiLayers />, delay: 0.1 },
        { title: 'Total Questions', value: '156', icon: <FiFileText />, delay: 0.2 },
        { title: 'Video Sets', value: '12', icon: <FiVideo />, delay: 0.3 },
        { title: 'Category Sets', value: '30', icon: <FiTag />, delay: 0.4 },
    ];

    return (
        <div className={styles.dashboard}>
            <header className={styles.pageHeader}>
                <h1>Dashboard</h1>
            </header>

            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className={styles.statCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay, duration: 0.5 }}
                    >
                        <div className={styles.statCardIcon}>
                            {stat.icon}
                        </div>
                        <h3>{stat.title}</h3>
                        <p>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className={styles.welcomeCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <h2>Welcome, Admin</h2>
                <p>
                    This is your personal dashboard for managing interview question sets.
                    Use the sidebar to navigate between different configuration options.
                    You can add, edit, or remove question sets and individual questions.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
