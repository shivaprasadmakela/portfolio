import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import { blogService } from '../services/blogService';
import { type Blog } from '../types/blog';
import { FiChevronLeft, FiLock, FiClock, FiCalendar } from 'react-icons/fi';
import FadeInSection from '../components/FadeInSection';
import { Button } from '../components/ui';
import styles from '../styles/BlogDetail.module.css';

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const data = blogService.getById(id);
            if (data) {
                setBlog(data);
            } else {
                navigate('/blogs');
            }
        }
        setIsLoading(false);
    }, [id, navigate]);

    if (isLoading) return <div className={styles.loading}>Loading insightful content...</div>;
    if (!blog) return null;

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.container}>
                <FadeInSection>
                    <Link to="/blogs" className={styles.backBtn}>
                        <FiChevronLeft /> Back to all articles
                    </Link>
                </FadeInSection>

                <article className={styles.article}>
                    <header className={styles.header}>
                        <FadeInSection delay={0.1}>
                            <div className={styles.meta}>
                                <span className={styles.metaItem}>
                                    <FiCalendar className={styles.icon} />
                                    {formattedDate}
                                </span>
                                <span className={styles.metaItem}>
                                    <FiClock className={styles.icon} />
                                    {blog.readTime}
                                </span>
                            </div>
                            <h1 className={styles.title}>{blog.title}</h1>
                            <p className={styles.excerpt}>{blog.excerpt}</p>
                        </FadeInSection>
                    </header>

                    <FadeInSection delay={0.2}>
                        <div className={`${styles.content} ${blog.isPremium ? styles.blurred : ''}`}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {blog.content}
                            </ReactMarkdown>
                        </div>
                    </FadeInSection>

                    {blog.isPremium && (
                        <FadeInSection delay={0.3} className={styles.premiumOverlay}>
                            <div className={styles.premiumCard}>
                                <div className={styles.lockIcon}>
                                    <FiLock />
                                </div>
                                <h2 className={styles.premiumTitle}>Premium Article</h2>
                                <p className={styles.premiumDesc}>
                                    This content is reserved for premium members. Unlock full access to gain deep insights and advanced tutorials.
                                </p>
                                <Button>
                                    Unlock Access
                                </Button>
                            </div>
                        </FadeInSection>
                    )}
                </article>
            </main>
            <Footer />
        </div>
    );
}
