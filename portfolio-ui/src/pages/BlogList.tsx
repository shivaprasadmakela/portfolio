import { useEffect, useState, useMemo } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import { Input, Button } from '../components/ui';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useToast } from '../components/ui/Toast';
import { useConfirm } from '../hooks/useConfirm';
import { type Blog, type FilterType, type SortType } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';
import BlogEditor from '../components/blog/BlogEditor';
import FadeInSection from '../components/FadeInSection';
import styles from '../styles/BlogList.module.css';

const STORAGE_KEY = 'portfolio_blogs';

const MOCK_BLOGS: Blog[] = [
    {
        id: '1',
        title: 'Building a Production-Ready Blog with React',
        excerpt: 'Learn how to architect a scalable, type-safe blogging system using modern React patterns and TypeScript.',
        content: '# Building a Production-Ready Blog\n\nCreating a blog system is a classic developer exercise, but making it production-ready requires careful thought about architecture, UX, and performance.\n\n## Why Type Safety Matters\n\nUsing TypeScript allows us to define clear contracts between our storage, store, and UI layers...',
        isPremium: true,
        createdAt: new Date('2024-03-20').toISOString(),
        updatedAt: new Date('2024-03-20').toISOString(),
        readTime: '8 min read'
    },
    {
        id: '2',
        title: 'The Future of Frontend Development in 2025',
        excerpt: 'Exploring the shift towards server-centric architectures, AI-assisted coding, and the evolving role of the frontend engineer.',
        content: '# The Future of Frontend Development\n\nAs we approach 2025, the landscape of frontend development is shifting faster than ever. AI is no longer a gimmick; it is a core part of the developer workflow.',
        isPremium: false,
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-15').toISOString(),
        readTime: '5 min read'
    }
];

export default function BlogList() {
    const { confirm } = useConfirm();
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
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_BLOGS));
            return MOCK_BLOGS;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            return MOCK_BLOGS;
        }
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

    const handleDelete = async (id: string) => {
        const confirmed = await confirm(
            'Delete Post',
            'Are you sure you want to delete this post? This action cannot be undone.'
        );

        if (confirmed) {
            const updated = blogs.filter(b => b.id !== id);
            saveBlogs(updated);
            showToast('Blog deleted successfully', 'success');
        }
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
                        <Button onClick={handleCreateNew} icon={<FiPlus />}>
                            Create Post
                        </Button>
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
                                    onDelete={handleDelete}
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