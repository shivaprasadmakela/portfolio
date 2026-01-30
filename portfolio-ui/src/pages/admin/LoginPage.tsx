import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin/Admin.module.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const success = login(email, password);
        if (success) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <motion.div
                className={styles.loginCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className={styles.loginHeader}>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Admin Portal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Login to manage question sets
                    </motion.p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            className={styles.errorMsg}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <FiAlertCircle /> {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit}>
                    <motion.div
                        className={styles.formGroup}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <label htmlFor="email">Email Address</label>
                        <div className={styles.inputWrapper}>
                            <FiMail className={styles.inputIcon} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.formGroup}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <label htmlFor="password">Password</label>
                        <div className={styles.inputWrapper}>
                            <FiLock className={styles.inputIcon} />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className={styles.loginButton}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        Sign In
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginPage;
