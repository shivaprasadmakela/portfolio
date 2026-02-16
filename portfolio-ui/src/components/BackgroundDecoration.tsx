import React from 'react';
import styles from '../styles/admin/Admin.module.css';

const BackgroundDecoration: React.FC = () => {
    return (
        <div className={styles.loginBackgroundDecoration}>
            <div className={`${styles.decorationCircle} ${styles.circle1}`} />
            <div className={`${styles.decorationCircle} ${styles.circle2}`} />
            <div className={`${styles.decorationCircle} ${styles.circle3}`} />
        </div>
    );
};

export default BackgroundDecoration;
