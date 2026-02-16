import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import CategoryCard from '../../components/interview/CategoryCard';
import { interviewApi } from '../../api/interviewApi';
import type { CollectionDto } from '../../types/interview';
import styles from '../../styles/interview/Interview.module.css';


export default function InterviewHub() {
    const [categories, setCategories] = useState<CollectionDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await interviewApi.getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <Header />
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

                {/* <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Main Categories</h2>
                    <Link to="/interview/sets" className={styles.viewSetsBtn}>
                        <FiVideo /> YouTube Video Sets
                    </Link>
                </div> */}

                {isLoading ? (
                    <div className={styles.loading}>Loading categories...</div>
                ) : (
                    <div className={styles.categoryGrid}>
                        {categories.map(cat => (
                            <CategoryCard key={cat.id} category={cat as any} />
                        ))}
                    </div>
                )}
            </motion.main>
            <Footer />
        </div>
    );
}
