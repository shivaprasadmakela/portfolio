 import React from 'react';
import styles from '../../styles/admin/Admin.module.css';

const AdminProfile: React.FC = () => {
    return (
        <div className={styles.profile}>
            <div className={styles.pageHeader}>
                <h1>Profile</h1>
            </div>

            <div className={styles.loginCard} style={{ maxWidth: '600px', margin: '0' }}>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" value="admin@local.dev" disabled style={{ opacity: 0.7 }} />
                </div>
                <div className={styles.formGroup}>
                    <label>Name</label>
                    <input type="text" value="Admin" disabled style={{ opacity: 0.7 }} />
                </div>
                <div className={styles.formGroup}>
                    <label>Role</label>
                    <input type="text" value="Super Admin" disabled style={{ opacity: 0.7 }} />
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '20px' }}>
                    Profile editing is disabled in the local development environment.
                </p>
            </div>
        </div>
    );
};

export default AdminProfile;
