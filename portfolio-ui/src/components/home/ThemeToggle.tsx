import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
                fontSize: '1.2rem',
                marginLeft: '1rem',
            }}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
};
