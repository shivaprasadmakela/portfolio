import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSets } from '../hooks/useCollections';
import styles from '../Interview.module.css';
import { FiChevronLeft, FiPlayCircle, FiCalendar, FiBookOpen } from 'react-icons/fi';

export default function SetsHub() {
    const { data: sets = [], isLoading, error } = useSets();

    if (isLoading) {
        return <div className={styles.loading}>Loading video sets...</div>;
    }

    if (error) {
        return <div className={styles.error}>Failed to load interview video sets.</div>;
    }

    return (
        <motion.main
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.listHeader}>
                <Link to="/interview" className={styles.backLink}>
                    <FiChevronLeft /> Back to Hub
                </Link>
                <h1 className={styles.title}>YouTube Interview Sets</h1>
                <p className={styles.subtitle}>Detailed video breakdowns with associated questions</p>
            </div>

            <div className={styles.categoryGrid}>
                {sets.map((set) => (
                    <Link to={`/interview/collection/${set.slug}`} key={set.id} className={styles.categoryCard} style={{ padding: 0, overflow: 'hidden' }}>
                        <div className={styles.cardThumbnail}>
                            <img src={set.thumbnailUrl} alt={set.name} loading="lazy" />
                            <div className={styles.thumbnailOverlay}>
                                <FiPlayCircle size={40} />
                            </div>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <h3 className={styles.categoryName}>{set.name}</h3>
                            <p className={styles.categoryDesc}>{set.description}</p>
                            <div className={styles.meta}>
                                <div className={styles.metaItem}><FiCalendar /> <span>{set.publishDate}</span></div>
                                <div className={styles.metaItem}><FiBookOpen /> <span>{set.questionCount} Questions</span></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.main>
    );
}
