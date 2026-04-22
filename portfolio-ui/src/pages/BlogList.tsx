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

    // State
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter] = useState<FilterType>('All');
    const [sortBy] = useState<SortType>('Latest');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

    // Storage Functions
    const loadBlogs = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let existingBlogs: Blog[] = [];
        
        if (stored) {
            try {
                existingBlogs = JSON.parse(stored);
            } catch (e) {
                existingBlogs = MOCK_BLOGS;
            }
        } else {
            existingBlogs = MOCK_BLOGS;
        }

        // Force update existing mock blogs with latest data from MOCK_BLOGS
        // This ensures slugs and new content are synced even if the ID already exists
        const updatedBlogs = existingBlogs.map(eb => {
            const mock = MOCK_BLOGS.find(m => m.id === eb.id);
            return mock ? { ...mock } : eb;
        });

        // Add any completely new mock blogs
        const missingDefaults = MOCK_BLOGS.filter(
            defaultBlog => !updatedBlogs.some(ub => ub.id === defaultBlog.id)
        );

        const finalBlogs = [...missingDefaults, ...updatedBlogs];
        
        // Save back to localStorage if there were changes
        if (JSON.stringify(finalBlogs) !== stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(finalBlogs));
        }

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

    // Filter Logic
    const filteredBlogs = useMemo(() => {
        let result = blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filter === 'Premium') result = result.filter(b => b.isPremium);
        else if (filter === 'Free') result = result.filter(b => !b.isPremium);

        return result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortBy === 'Latest' ? dateB - dateA : dateA - dateB;
        });
    }, [blogs, searchTerm, filter, sortBy]);

    // Handlers
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