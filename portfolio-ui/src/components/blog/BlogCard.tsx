import { type Blog } from '../../types/blog';
import styles from '../../styles/BlogList.module.css';
import { FiEdit2, FiTrash2, FiClock, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    blog: Blog;
    onEdit: (blog: Blog) => void;
    onDelete: (id: string) => void;
}

export default function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.meta}>
                        <span className={styles.date}>{formattedDate}</span>
                        <span className={styles.separator}>•</span>
                        <span className={styles.readTime}>
                            <FiClock className={styles.inlineIcon} />
                            {blog.readTime}
                        </span>
                    </div>
                    {blog.isPremium && (
                        <span className={styles.premiumBadge}>
                            <FiLock className={styles.inlineIcon} />
                            Premium
                        </span>
                    )}
                </div>

                <Link to={`/blog/${blog.id}`} className={styles.cardTitle}>
                    {blog.title}
                </Link>
                
                <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                
                <div className={styles.cardFooter}>
                    <Link to={`/blog/${blog.id}`} className={styles.readMore}>
                        Read Article <FiArrowRight size={14} />
                    </Link>
                    
                    <div className={styles.cardActions}>
                        <button 
                            className={styles.iconAction} 
                            onClick={(e) => { e.preventDefault(); onEdit(blog); }}
                            title="Edit post"
                        >
                            <FiEdit2 size={15} />
                        </button>
                        <button 
                            className={`${styles.iconAction} ${styles.dangerAction}`} 
                            onClick={(e) => { e.preventDefault(); onDelete(blog.id); }}
                            title="Delete post"
                        >
                            <FiTrash2 size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
