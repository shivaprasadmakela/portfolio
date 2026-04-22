import { type Blog } from '../../types/blog';
import styles from '../../styles/BlogList.module.css';
import { FiEdit2, FiClock, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    blog: Blog;
    onEdit: (blog: Blog) => void;
    showEdit?: boolean;
}

export default function BlogCard({ blog, onEdit, showEdit = false }: BlogCardProps) {
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

                <Link to={`/blog/${blog.slug}`} className={styles.cardTitle}>
                    {blog.title}
                </Link>
                
                <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                
                <div className={styles.cardFooter}>
                    <Link to={`/blog/${blog.slug}`} className={styles.readMore}>
                        Read Article <FiArrowRight size={14} />
                    </Link>
                    
                    <div className={styles.cardActions}>
                        {showEdit && (
                            <button 
                                className={styles.iconAction} 
                                onClick={(e) => { e.preventDefault(); onEdit(blog); }}
                                title="Edit post"
                            >
                                <FiEdit2 size={15} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
