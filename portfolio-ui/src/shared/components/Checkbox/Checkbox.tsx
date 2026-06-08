import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
    return (
        <label className={styles.checkboxLabel}>
            <input
                type="checkbox"
                className={`${styles.checkbox} ${className}`}
                {...props}
            />
            {label}
        </label>
    );
};
