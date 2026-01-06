import React from 'react';
import styles from '../../styles/SharedUI.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
    error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, className = '', ...props }) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label className={styles.label}>{label}</label>}
            <select className={`${styles.select} ${className}`} {...props}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};
