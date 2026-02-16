import styles from '../styles/Loading.module.css';

export default function PageLoader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
}
