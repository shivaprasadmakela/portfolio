import React from 'react';
import styles from '../../styles/admin/Admin.module.css';

const AdminConfiguration: React.FC = () => {
    return (
        <div className={styles.adminContent}>
            <h1 className={styles.pageTitle}>Configuration</h1>
            <div className={styles.card}>
                <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem' }}>
                    Configuration settings coming soon...
                </p>
            </div>
        </div>
    );
};

export default AdminConfiguration;
