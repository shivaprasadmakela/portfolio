import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiLock, FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { Button } from '../../../shared/components';
import { useToast } from '../../../shared/components/Toast/Toast';
import { AiSummarizer } from '../components/AiSummarizer';
import styles from './BlogDetail.module.css';
import { useBlogDetail, useUpdateBlogSummary } from '../hooks/useBlogs';

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { showToast } = useToast();
    const { data: blog, isLoading } = useBlogDetail(slug || '');
    const updateSummaryMutation = useUpdateBlogSummary();

    const handleUnlockPremium = () => {
        const messages = [
            "Nice try! But even the AI needs coffee. Payment system is still in 'coming soon' mode! ☕️",
            "Hold on! My developer hasn't connected Stripe yet. You're too fast for us! 🏃‍♂️",
            "Wait, you actually want to pay? I should probably tell the developer to add a price tag... 💸",
            "This content is so premium that even I can't read it yet. Stay tuned! 🕵️‍♂️"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        showToast(randomMsg, 'info');
    };

    const handleSummaryGenerated = (summary: string) => {
        if (!slug) return;
        updateSummaryMutation.mutate({ slug, summary });
    };

    if (isLoading) return <div className={styles.loading}>Loading insightful content...</div>;
    
    // Redirect if not found after loading
    if (!blog) {
        return (
            <main className={styles.blogDetailMain}>
                <div className={styles.container}>
                    <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        Article not found. <Link to="/blogs" style={{ color: 'var(--color-text-primary-green)' }}>Back to blog</Link>
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.blogDetailMain}>
            <div className={styles.container}>
                <Link to="/blogs" className={styles.backBtn}>
                    <FiArrowLeft /> Back to all articles
                </Link>

                <article className={styles.article}>
                    <header className={styles.header}>
                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <FiCalendar /> {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                            <div className={styles.metaItem}>
                                <FiClock /> {blog.readTime}
                            </div>
                            {blog.isPremium && (
                                <div className={styles.metaItem}>
                                    <FiLock /> Premium
                                </div>
                            )}
                        </div>
                        <h1 className={styles.title}>{blog.title}</h1>
                        <p className={styles.excerpt}>{blog.excerpt}</p>

                        <AiSummarizer
                            content={blog.content}
                            isPremium={blog.isPremium}
                            existingSummary={blog.summary}
                            onSummaryGenerated={handleSummaryGenerated}
                        />
                    </header>

                    {blog.isPremium && (
                        <div className={styles.premiumOverlay}>
                            <div className={styles.premiumCard}>
                                <FiLock className={styles.lockIcon} />
                                <h2>Premium Article</h2>
                                <p>This deep-dive is available for premium members. Unlock full access to all engineering journals.</p>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleUnlockPremium}
                                >
                                    Unlock Access
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className={`${styles.content} ${blog.isPremium ? styles.blurred : ''}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {blog.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </main>
    );
}
