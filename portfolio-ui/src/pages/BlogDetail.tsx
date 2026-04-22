import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import { type Blog } from '../types/blog';
import { FiChevronLeft, FiLock, FiClock, FiCalendar } from 'react-icons/fi';
import FadeInSection from '../components/FadeInSection';
import { Button } from '../components/ui';
import { AiSummarizer } from '../components/blog/AiSummarizer';
import styles from '../styles/BlogDetail.module.css';
import { MOCK_BLOGS } from './BlogList';

const STORAGE_KEY = 'portfolio_blogs';

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const stored = localStorage.getItem(STORAGE_KEY);
            let found: Blog | undefined;

            if (stored) {
                try {
                    const blogs: Blog[] = JSON.parse(stored);
                    found = blogs.find(b => String(b.id) === String(id));
                } catch (e) {
                    console.error("Failed to parse blogs from storage", e);
                }
            }

            // Fallback to MOCK_BLOGS if not found in storage
            if (!found) {
                found = MOCK_BLOGS.find(b => String(b.id) === String(id));
            }

            if (found) {
                setBlog(found);
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
        <>
            <Header />
            <main className={styles.blogDetailMain}>
                <div className={styles.container}>
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

                        <FadeInSection delay={0.15}>
                            <AiSummarizer content={blog.content} />
                        </FadeInSection>

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
                </div>
            </main>
            <Footer />
        </>
    );
}
