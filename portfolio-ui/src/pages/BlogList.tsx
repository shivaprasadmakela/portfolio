import { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import { Input, Button } from '../components/ui';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useBlogStore } from '../store/useBlogStore';
import { useToast } from '../components/ui/Toast';
import BlogCard from '../components/blog/BlogCard';
import BlogEditor from '../components/blog/BlogEditor';
import FadeInSection from '../components/FadeInSection';
import { useConfirmStore } from '../store/useConfirmStore';
import { type Blog } from '../types/blog';
import styles from '../styles/BlogList.module.css';

export default function BlogList() {
    const { confirm } = useConfirmStore();
    const { 
        fetchBlogs, 
        searchTerm, 
        setSearchTerm, 
        getFilteredBlogs,
        addBlog,
        updateBlog,
        deleteBlog,
        isLoading
    } = useBlogStore();

    const { showToast } = useToast();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const filteredBlogs = getFilteredBlogs();

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
            deleteBlog(id);
            showToast('Blog deleted successfully', 'success');
        }
    };

    const handleSave = (blogData: Partial<Blog>) => {
        if (editingBlog) {
            updateBlog(editingBlog.id, blogData);
            showToast('Blog updated successfully', 'success');
        } else {
            addBlog(blogData as any);
            showToast('Blog published successfully', 'success');
        }
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
                            <p>Try adjusting your search or filters.</p>
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