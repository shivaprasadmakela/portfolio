import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import styles from '../../styles/admin/Admin.module.css';

const AdminLayout: React.FC = () => {
    return (
        <div className={styles.adminLayout}>
            <div className={styles.loginBackgroundDecoration}>
                <div
                    className={styles.decorationCircle}
                    style={{ top: '5%', right: '5%', width: '500px', height: '500px', background: 'var(--color-text-primary-green)' }}
                />
                <div
                    className={styles.decorationCircle}
                    style={{ bottom: '10%', left: '10%', width: '400px', height: '400px', background: 'rgba(60, 207, 145, 0.3)' }}
                />
            </div>

            <AdminSidebar />
            <main className={styles.mainContent}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default AdminLayout;
