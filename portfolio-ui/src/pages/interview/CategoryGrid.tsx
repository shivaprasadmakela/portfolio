import Header from '../../components/home/Header';
import CategoryCard from '../../components/interview/CategoryCard';
import styles from '../../styles/interview/Interview.module.css';
import { interviewData } from '../../data/interviewData';
import { youtubeQuestionData } from '../../data/youtubeQuestionData';
import { motion } from 'framer-motion';
import Footer from '../../components/home/Footer';

export default function CategoryGrid() {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <motion.main
                className={styles.container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.title}>Interview Question Bank</h1>
                <p className={styles.subtitle}>Practice structured interview questions across multiple topics</p>

                <div className={styles.categoryGrid}>
                    <CategoryCard
                        category={{
                            id: 'youtube-sets',
                            name: 'YouTube Sets',
                            description: 'Structured interview questions explained in my videos',
                            questionCount: youtubeQuestionData.length, // Showing set count instead
                            questions: []
                        }}
                    />
                    {interviewData.map(category => (
                        <CategoryCard key={category.id} category={category} />
                    ))}

                </div>
            </motion.main>
            <Footer />
        </div>
    );
}
