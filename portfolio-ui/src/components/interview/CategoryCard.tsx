import { Link } from 'react-router-dom';
import styles from '../../styles/interview/Interview.module.css';
import type { Category } from '../../data/interviewData';
import { FiCode, FiLayers, FiDatabase, FiServer, FiVideo } from 'react-icons/fi';

interface CategoryCardProps {
    category: Category;
}

const iconMap: Record<string, React.ReactNode> = {
    'javascript': <FiCode />,
    'react': <FiLayers />,
    'dsa': <FiDatabase />,
    'system-design': <FiServer />,
    'youtube-sets': <FiVideo />,
};

export default function CategoryCard({ category }: CategoryCardProps) {
    const isYoutube = category.id === 'youtube-sets';
    const targetPath = isYoutube ? '/youtube-sets' : `/interview-prep/${category.id}`;

    return (
        <Link to={targetPath} className={styles.categoryCard}>
            <div>
                <div className={styles.categoryIcon}>
                    {iconMap[category.id] || <FiCode />}
                </div>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.categoryDesc}>{category.description}</p>
            </div>
            <div className={styles.questionCount}>
                {category.questionCount} {isYoutube ? 'Video Sets' : 'Questions'}
            </div>
        </Link>
    );
}
