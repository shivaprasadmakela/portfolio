import styles from './Loading.module.css';

export function PageLoader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
}

export default PageLoader;
