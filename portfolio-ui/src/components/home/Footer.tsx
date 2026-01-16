import styles from '../../styles/home/Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.divider} />
                <div className={styles.content}>
                    <p className={styles.copyright}>
                        © {currentYear} shiva prasad m. All rights reserved.
                    </p>
                    <p className={styles.attribution}>
                        Made with <span className={styles.heart}>❤️</span> by shiva prasad m
                    </p>
                </div>
            </div>
        </footer>
    );
}
