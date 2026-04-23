import { useEffect, useState, useMemo } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import { Input, Button } from '../components/ui';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useToast } from '../components/ui/Toast';
import { type Blog, type FilterType, type SortType } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';
import BlogEditor from '../components/blog/BlogEditor';
import FadeInSection from '../components/FadeInSection';
import { MOCK_BLOGS } from '../data/blogs';
import styles from '../styles/BlogList.module.css';

const STORAGE_KEY = 'portfolio_blogs';

export default function BlogList() {
    const { showToast } = useToast();

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter] = useState<FilterType>('All');
    const [sortBy] = useState<SortType>('Latest');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

    const loadBlogs = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let existingBlogs: Blog[] = [];
        
        if (stored) {
            try {
                existingBlogs = JSON.parse(stored);
            } catch (e) {
                existingBlogs = [];
            }
        }

        const updatedBlogs = MOCK_BLOGS.map(mock => {
            const existing = existingBlogs.find(eb => eb.id === mock.id);
            return existing ? { ...mock, summary: existing.summary } : mock;
        });

        const userBlogs = existingBlogs.filter(
            eb => !MOCK_BLOGS.some(m => m.id === eb.id)
        );

        const finalBlogs = [...updatedBlogs, ...userBlogs];
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalBlogs));
        return finalBlogs;
    };

    const saveBlogs = (updatedBlogs: Blog[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
        setBlogs(updatedBlogs);
    };

    useEffect(() => {
        const data = loadBlogs();
        setBlogs(data);
        setIsLoading(false);
    }, []);

    const filteredBlogs = useMemo(() => {
        if (!blogs || !Array.isArray(blogs)) return [];

        let result = blogs.filter(blog => {
            if (!blog) return false;
            const title = blog.title || '';
            const excerpt = blog.excerpt || '';
            return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (filter === 'Premium') result = result.filter(b => b.isPremium);
        else if (filter === 'Free') result = result.filter(b => !b.isPremium);

        return result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return sortBy === 'Latest' ? dateB - dateA : dateA - dateB;
        });
    }, [blogs, searchTerm, filter, sortBy]);

    const handleCreateNew = () => {
        setEditingBlog(null);
        setIsEditorOpen(true);
    };

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setIsEditorOpen(true);
    };



    const handleSave = (blogData: any) => {
        if (editingBlog) {
            const updated = blogs.map(b => b.id === editingBlog.id ? {
                ...b,
                ...blogData,
                updatedAt: new Date().toISOString(),
                readTime: `${Math.ceil(blogData.content.split(' ').length / 200)} min read`
            } : b);
            saveBlogs(updated);
            showToast('Blog updated successfully', 'success');
        } else {
            const newBlog: Blog = {
                ...blogData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                readTime: `${Math.ceil(blogData.content.split(' ').length / 200)} min read`
            };
            saveBlogs([newBlog, ...blogs]);
            showToast('Blog published successfully', 'success');
        }
        setIsEditorOpen(false);
    };

    return (
        <>
            <Header />
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
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<FiSearch />}
                            />
                        </div>
                        {import.meta.env.DEV && (
                            <Button
                                onClick={handleCreateNew}
                                icon={<FiPlus />}
                                className={styles.createBtn}
                            >
                                Create Post
                            </Button>
                        )}
                    </div>
                </FadeInSection>

                <div className={styles.grid}>
                    {isLoading ? (
                        <div className={styles.emptyState}>Loading insights...</div>
                    ) : filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog: Blog, idx: number) => (
                            <FadeInSection key={blog.id} delay={0.1 + idx * 0.05}>
                                <BlogCard
                                    blog={blog}
                                    onEdit={handleEdit}
                                    showEdit={import.meta.env.DEV}
                                />
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

            <BlogEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onSave={handleSave}
                editingBlog={editingBlog}
            />

            <Footer />
        </>
    );
}