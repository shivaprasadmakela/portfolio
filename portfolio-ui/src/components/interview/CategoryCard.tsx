import { Link } from 'react-router-dom';
import styles from '../../styles/interview/Interview.module.css';
import type { CollectionDto } from '../../types/interview';
import type { Category } from '../../data/interviewData';
import { FiCode, FiLayers, FiDatabase, FiServer } from 'react-icons/fi';

interface CategoryCardProps {
    category: CollectionDto | Category;
}

const iconMap: Record<string, React.ReactNode> = {
    'JavaScript': <FiCode />,
    'React': <FiLayers />,
    'Java': <FiDatabase />,
    'Frontend Projects': <FiServer />,
};

export default function CategoryCard({ category }: CategoryCardProps) {
    const targetPath = category.type === 'YOUTUBE_SET'
        ? '/interview/sets'
        : `/interview/collection/${category.id}`;

    return (
        <Link to={targetPath} className={styles.categoryCard}>
            <div>
                <div className={styles.categoryIcon}>
                    {iconMap[category.name] || <FiCode />}
                </div>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <p className={styles.categoryDesc}>{category.description}</p>
            </div>
            <div className={styles.questionCount}>
                {category.questionCount} Questions
            </div>
        </Link>
    );
}
