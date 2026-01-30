import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
    FiGrid,
    FiLayers,
    FiSettings,
    FiUser,
    FiLogOut
} from 'react-icons/fi';
import styles from '../../styles/admin/Admin.module.css';

const AdminSidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FiGrid size={20} /> },
        { name: 'Question Sets', path: '/admin/question-sets', icon: <FiLayers size={20} /> },
        { name: 'Configuration', path: '/admin/configuration', icon: <FiSettings size={20} /> },
        { name: 'Profile', path: '/admin/profile', icon: <FiUser size={20} /> },
    ];

    return (
        <motion.div
            className={styles.sidebar}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={styles.sidebarHeader}>
                <h2>Portfolio Admin</h2>
            </div>

            <ul className={styles.navMenu}>
                {navItems.map((item, index) => (
                    <motion.li
                        key={item.path}
                        className={styles.navItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    </motion.li>
                ))}
            </ul>

            <div className={styles.sidebarFooter}>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <FiLogOut size={20} />
                    Logout
                </button>
            </div>
        </motion.div>
    );
};

export default AdminSidebar;
