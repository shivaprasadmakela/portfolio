import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Modal, Button, Input } from '../ui';
import { useToast } from '../ui/Toast';
import { AiAssistant } from './AiAssistant';
import { type Blog, type NewBlog } from '../../types/blog';
import styles from '../../styles/BlogEditor.module.css';

interface BlogEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (blog: NewBlog | Partial<Blog>) => void;
    editingBlog?: Blog | null;
}

export default function BlogEditor({ isOpen, onClose, onSave, editingBlog }: BlogEditorProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const { showToast } = useToast();

    const handleAiApply = (type: 'title' | 'content' | 'excerpt', value: string) => {
        if (type === 'title') setTitle(value);
        else if (type === 'content') setContent(value);
        else if (type === 'excerpt') setExcerpt(value);
        showToast(`AI ${type} applied!`, 'success');
    };

    useEffect(() => {
        if (editingBlog) {
            setTitle(editingBlog.title);
            setContent(editingBlog.content);
            setExcerpt(editingBlog.excerpt);
            setIsPremium(editingBlog.isPremium);
        } else {
            setTitle('');
            setContent('');
            setExcerpt('');
            setIsPremium(false);
        }
    }, [editingBlog, isOpen]);

    const handleSave = () => {
        if (!title || !content) {
            showToast('Title and content are required to publish.', 'error');
            return;
        }
        
        onSave({
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            isPremium
        });
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={editingBlog ? 'Edit Article' : 'Create New Article'}
            className={styles.modalContainer}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>Discard Changes</Button>
                    <Button onClick={handleSave}>
                        {editingBlog ? 'Update & Publish' : 'Publish Article'}
                    </Button>
                </>
            }
        >
            <div className={styles.editorBody}>
                <div className={styles.inputSection}>
                    <AiAssistant 
                        title={title} 
                        content={content} 
                        onApply={handleAiApply} 
                    />
                    <div className={styles.field}>
                        <label className={styles.label}>Post Title</label>
                        <Input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g. Mastering React 19 Patterns"
                        />
                    </div>
                    
                    <div className={styles.field}>
                        <label className={styles.label}>Search Excerpt</label>
                        <Input 
                            value={excerpt} 
                            onChange={(e) => setExcerpt(e.target.value)} 
                            placeholder="Brief summary for indexing..."
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.checkboxContainer}>
                            <input 
                                type="checkbox" 
                                className={styles.checkbox}
                                checked={isPremium} 
                                onChange={(e) => setIsPremium(e.target.checked)} 
                            />
                            <span className={styles.label}>Premium Content (Requires unlock)</span>
                        </label>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Article Content (Markdown)</label>
                        <textarea
                            className={styles.textarea}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start typing your article here..."
                        />
                    </div>
                </div>

                <div className={styles.previewSection}>
                    <span className={styles.previewTitle}>Article Preview</span>
                    <div className={styles.markdownContent}>
                        <h1 style={{ marginBottom: '1.5rem' }}>{title || 'Untitled Article'}</h1>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content || '*Write something to see the preview...*'}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
