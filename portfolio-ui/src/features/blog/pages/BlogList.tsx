import { useState, useMemo } from 'react';
import { Input, Button, FadeInSection } from '../../../shared/components';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useToast } from '../../../shared/components/Toast/Toast';
import { type Blog, type FilterType, type SortType } from '../types/blog';
import BlogCard from '../components/BlogCard';
import BlogEditor from '../components/BlogEditor';
import styles from './BlogList.module.css';
import { useBlogs, useSaveBlog } from '../hooks/useBlogs';

export default function BlogList() {
    const { showToast } = useToast();
    const { data: blogs = [], isLoading } = useBlogs();
    const saveBlogMutation = useSaveBlog();

    const [searchTerm, setSearchTerm] = useState('');
    const [filter] = useState<FilterType>('All');
    const [sortBy] = useState<SortType>('Latest');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

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
        saveBlogMutation.mutate({
            blogData,
            editingBlog,
            currentBlogs: blogs
        }, {
            onSuccess: () => {
                showToast(editingBlog ? 'Blog updated successfully' : 'Blog published successfully', 'success');
            },
            onError: (err: any) => {
                showToast(err.message || 'Failed to save blog post', 'error');
            }
        });
    };

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
                            disabled={saveBlogMutation.isPending}
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

            <BlogEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                onSave={handleSave}
                editingBlog={editingBlog}
            />
        </main>
    );
}