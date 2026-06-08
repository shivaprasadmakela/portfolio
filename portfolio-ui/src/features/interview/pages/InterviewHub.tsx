import { motion } from 'framer-motion';
import CategoryCard from '../components/CategoryCard';
import { useCategories } from '../hooks/useCollections';
import styles from '../Interview.module.css';

export default function InterviewHub() {
    const { data: categories = [], isLoading, error } = useCategories();

    if (isLoading) {
        return <div className={styles.loading}>Loading categories...</div>;
    }

    if (error) {
        return <div className={styles.error}>Failed to load interview categories.</div>;
    }

    return (
        <motion.main
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.hubHeader}>
                <h1 className={styles.title}>Interview Hub</h1>
                <p className={styles.subtitle}>Curated questions, video breakdowns, and project-based prep</p>
            </div>

            <div className={styles.categoryGrid}>
                {categories.map(cat => (
                    <CategoryCard key={cat.id} category={cat as any} />
                ))}
            </div>
        </motion.main>
    );
}
