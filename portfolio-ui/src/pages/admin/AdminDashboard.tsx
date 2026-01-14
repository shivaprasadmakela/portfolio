import React from 'react';
import styles from '../../styles/admin/Admin.module.css';

const AdminDashboard: React.FC = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.pageHeader}>
                <h1>Dashboard</h1>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Total Question Sets</h3>
                    <p>42</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Questions</h3>
                    <p>156</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Video Sets</h3>
                    <p>12</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Category Sets</h3>
                    <p>30</p>
                </div>
            </div>

            <div style={{ marginTop: '40px', padding: '24px', backgroundColor: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <h2 style={{ marginBottom: '16px' }}>Welcome, Admin</h2>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    This is your personal dashboard for managing interview question sets.
                    Use the sidebar to navigate between different configuration options.
                    You can add, edit, or remove question sets and individual questions.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
