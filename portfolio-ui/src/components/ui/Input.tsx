import React from 'react';
import styles from '../../styles/SharedUI.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    wrapperClassName?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    wrapperClassName = '',
    id,
    icon,
    ...props
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`${styles.inputContainer} ${wrapperClassName}`}>
            {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
            <div className={`${styles.inputWrapper} ${error ? styles.errorBorder : ''} ${className}`}>
                {icon && <div className={styles.inputIcon}>{icon}</div>}
                <input
                    id={inputId}
                    className={`${styles.input} ${icon ? styles.withIcon : ''}`}
                    {...props}
                />
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};
