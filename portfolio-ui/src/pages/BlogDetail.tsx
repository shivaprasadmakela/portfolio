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
import { useToast } from '../components/ui/Toast';
import { AiSummarizer } from '../components/blog/AiSummarizer';
import styles from '../styles/BlogDetail.module.css';
import { MOCK_BLOGS } from '../data/blogs';

const STORAGE_KEY = 'portfolio_blogs';

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        if (slug) {
            const stored = localStorage.getItem(STORAGE_KEY);
            let found: Blog | undefined;

            if (stored) {
                try {
                    const blogs: Blog[] = JSON.parse(stored);
                    found = blogs.find(b => b.slug === slug);
                } catch (e) {
                    console.error("Failed to parse blogs from storage", e);
                }
            }

            if (!found) {
                found = MOCK_BLOGS.find(b => b.slug === slug);
            }

            if (found) {
                setBlog(found);
            } else {
                navigate('/blogs');
            }
        }
        setIsLoading(false);
    }, [slug, navigate]);

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

                        <article className={styles.article}>
                            <header className={styles.header}>
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
                            </header>

                            <AiSummarizer 
                                content={blog.content} 
                                isPremium={blog.isPremium} 
                            />

                            {blog.isPremium && (
                                <div className={styles.premiumOverlay}>
                                    <div className={styles.premiumCard}>
                                        <div className={styles.lockIcon}>
                                            <FiLock />
                                        </div>
                                        <h2 className={styles.premiumTitle}>Premium Article</h2>
                                        <p className={styles.premiumDesc}>
                                            This content is reserved for premium members. Unlock full access to gain deep insights and advanced tutorials.
                                        </p>
                                        <Button onClick={handleUnlockPremium}>
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
                    </FadeInSection>
                </div>
            </main>
            <Footer />
        </>
    );
}
