import React, { useState } from 'react';
import type { Question, Difficulty } from '../../data/interviewData';
import styles from '../../styles/admin/Admin.module.css';
import { MdClose, MdVisibility, MdCode } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface QuestionFormProps {
    initialData?: Question;
    onClose: () => void;
    onSave: (data: Partial<Question>) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ initialData, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<Question>>(
        initialData || {
            title: '',
            summary: '',
            content: '',
            solution: '',
            difficulty: 'Easy',
            tags: [],
            views: 0
        }
    );

    const [previewMode, setPreviewMode] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags?.includes(tagInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...(prev.tags || []), tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData ? 'Edit Question' : 'Add New Question'}</h2>
                    <button className={styles.btnIcon} onClick={onClose}><MdClose size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                            <label>Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                            <label>Summary (Brief overview)</label>
                            <input
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Difficulty</label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className={styles.formInput}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Views (Initial count)</label>
                            <input
                                name="views"
                                type="number"
                                value={formData.views}
                                onChange={handleChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                            <label>Description Content (HTML supported)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className={styles.formInput}
                                style={{ minHeight: '80px' }}
                                required
                            />
                        </div>

                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <label>Solution (Markdown supported)</label>
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode(!previewMode)}
                                    className={styles.btnIcon}
                                    style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    {previewMode ? <MdCode /> : <MdVisibility />}
                                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                                </button>
                            </div>

                            {previewMode ? (
                                <div style={{
                                    padding: '12px',
                                    backgroundColor: 'var(--color-background)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '6px',
                                    minHeight: '200px',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    color: 'var(--color-text-primary)'
                                }} className="markdown-body">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {formData.solution || '*No solution content provided*'}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <textarea
                                    name="solution"
                                    value={formData.solution}
                                    onChange={handleChange}
                                    className={styles.formInput}
                                    style={{ minHeight: '200px', fontFamily: 'monospace' }}
                                    placeholder="# Write your solution here... (supports Markdown)"
                                    required
                                />
                            )}
                        </div>

                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                            <label>Tags (Press Enter to add)</label>
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                className={styles.formInput}
                                placeholder="e.g. react, hooks"
                            />
                            <div style={{ marginTop: '10px' }}>
                                {formData.tags?.map(tag => (
                                    <span key={tag} className={styles.tag} style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)}>
                                        {tag} ×
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>

                <div className={styles.modalFooter}>
                    <button type="button" className={styles.btnIcon} onClick={onClose} style={{ padding: '10px 20px' }}>Cancel</button>
                    <button type="submit" onClick={handleSubmit} className={styles.btnPrimary}>Save Question</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
