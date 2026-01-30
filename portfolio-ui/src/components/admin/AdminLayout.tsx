import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import styles from '../../styles/admin/Admin.module.css';

const AdminLayout: React.FC = () => {
    return (
        <div className={styles.adminLayout}>
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
