import { useState, useMemo } from 'react';
import { Input, FadeInSection } from '../../../shared/components';
import { FiSearch } from 'react-icons/fi';
import { type Blog } from '../types/blog';
import BlogCard from '../components/BlogCard';
import styles from './BlogList.module.css';
import { useBlogs } from '../hooks/useBlogs';

export default function BlogList() {
    const { data: blogs = [], isLoading } = useBlogs();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlogs = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return blogs
            .filter(blog => {
                if (!term) return true;
                const title = blog.title?.toLowerCase() ?? '';
                const excerpt = blog.excerpt?.toLowerCase() ?? '';
                return title.includes(term) || excerpt.includes(term);
            })
            .sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });
    }, [blogs, searchTerm]);

    return (
        <main className={styles.blogMain}>
            <FadeInSection>
                <h1 className={styles.title}>Blog</h1>
                <p className={styles.subtitle}>
                    Thoughts on software engineering, development workflows, and tech trends.
                </p>
            </FadeInSection>

            <FadeInSection delay={0.1}>
                <div className={styles.controls}>
                    <div className={styles.search}>
                        <Input
                            type="search"
                            placeholder="Search articles..."
                            aria-label="Search articles"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<FiSearch />}
                        />
                    </div>
                </div>
            </FadeInSection>

            <div className={styles.grid}>
                {isLoading ? (
                    <div className={styles.emptyState}>Loading insights...</div>
                ) : filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog: Blog, idx: number) => (
                        <FadeInSection key={blog.id} delay={0.1 + idx * 0.05}>
                            <BlogCard blog={blog} />
                        </FadeInSection>
                    ))
                ) : (
                    <FadeInSection delay={0.2} className={styles.emptyState}>
                        <h3>No articles found</h3>
                        <p>Try adjusting your search terms.</p>
                    </FadeInSection>
                )}
            </div>
        </main>
    );
}
