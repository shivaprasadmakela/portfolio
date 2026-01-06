import React from 'react';
import styles from '../../styles/SharedUI.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
    isLoading?: boolean;
    className?: string;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    className = '',
    icon,
    disabled,
    ...props
}) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    return (
        <button
            className={buttonClass}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className={styles.loader}>Loading...</span>
            ) : (
                <>
                    {icon && <span className={styles.btnIcon}>{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};
