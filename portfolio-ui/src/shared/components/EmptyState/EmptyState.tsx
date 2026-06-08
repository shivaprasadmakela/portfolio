import React from 'react';

interface EmptyStateProps {
    title?: string;
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
    title = 'No items found', 
    message = 'Try modifying your search query or filters.' 
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 1.5rem',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            width: '100%'
        }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>{title}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{message}</p>
        </div>
    );
};

export default EmptyState;
