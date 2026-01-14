import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    MdDashboard,
    MdLibraryBooks,
    MdSettings,
    MdPerson,
    MdLogout
} from 'react-icons/md';
import styles from '../../styles/admin/Admin.module.css';

const AdminSidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <MdDashboard size={20} /> },
        { name: 'Question Sets', path: '/admin/question-sets', icon: <MdLibraryBooks size={20} /> },
        { name: 'Configuration', path: '/admin/configuration', icon: <MdSettings size={20} /> },
        { name: 'Profile', path: '/admin/profile', icon: <MdPerson size={20} /> },
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>Portfolio Admin</h2>
            </div>

            <ul className={styles.navMenu}>
                {navItems.map((item) => (
                    <li key={item.path} className={styles.navItem}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className={styles.sidebarFooter}>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <MdLogout size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
