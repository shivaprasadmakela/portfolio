import { Link } from 'react-router-dom';
import styles from '../../styles/interview/Interview.module.css';
import type { CollectionDto } from '../../types/interview';
import { FiCode, FiLayers, FiDatabase, FiServer, FiYoutube } from 'react-icons/fi';

interface CategoryCardProps {
    category: CollectionDto;
}

const iconMap: Record<string, React.ReactNode> = {
    'JavaScript': <FiCode />,
    'React': <FiLayers />,
    'Java': <FiDatabase />,
    'Frontend Projects': <FiServer />,
    'YouTube Sets': <FiYoutube />,
};

export default function CategoryCard({ category }: CategoryCardProps) {
    const targetPath = category.type === 'YOUTUBE_SET'
        ? `/interview/collection/${category.slug}`
        : `/interview/collection/${category.slug}`;

    return (
        <Link to={targetPath} className={styles.categoryCard}>
            <div>
                <div className={styles.categoryIcon}>
                    {iconMap[category.name] || (category.icon ? <span>{category.icon}</span> : <FiCode />)}
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
