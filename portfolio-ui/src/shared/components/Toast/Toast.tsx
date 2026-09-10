import { useState, useCallback, useMemo, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { ToastContext, type ToastType } from './useToast';
import styles from './Toast.module.css';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

const DISMISS_AFTER_MS = 3000;

const renderIcon = (type: ToastType) => {
    switch (type) {
        case 'success':
            return <FiCheckCircle />;
        case 'error':
            return <FiAlertCircle />;
        case 'info':
        default:
            return <FiInfo />;
    }
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timers = useRef<number[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { id, message, type }]);
        timers.current.push(window.setTimeout(() => removeToast(id), DISMISS_AFTER_MS));
    }, [removeToast]);

    // Pending dismissals would otherwise fire against an unmounted provider.
    useEffect(() => () => {
        timers.current.forEach(window.clearTimeout);
        timers.current = [];
    }, []);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {/* role="status" + aria-live so screen readers announce a toast;
                without it these were invisible to non-sighted users. */}
            <div className={styles.container} role="status" aria-live="polite" aria-atomic="false">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            layout
                            initial={{ opacity: 0, y: 50, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            className={`${styles.toast} ${styles[toast.type]}`}
                        >
                            <span className={styles.icon} aria-hidden="true">
                                {renderIcon(toast.type)}
                            </span>
                            <span className={styles.message}>{toast.message}</span>
                            <button
                                type="button"
                                className={styles.close}
                                onClick={() => removeToast(toast.id)}
                                aria-label="Dismiss notification"
                            >
                                <FiX />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
