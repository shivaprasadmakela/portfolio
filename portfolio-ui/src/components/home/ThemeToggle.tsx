import { useTheme } from '../../context/ThemeContext';
import sunIcon from '../../assets/brightness.png';
import moonIcon from '../../assets/moon.png';

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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '1rem',
                padding: '4px',
                transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <img
                src={theme === 'dark' ? sunIcon : moonIcon}
                alt={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                    width: '30px',
                    height: '30px',
                    objectFit: 'contain',
                    filter: theme === 'dark' ? 'none' : 'invert(0)', // Adjust if needed
                }}
            />
        </button>
    );
};
