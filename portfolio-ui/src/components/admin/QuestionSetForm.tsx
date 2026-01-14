import React, { useState } from 'react';
import type { YoutubeVideoSet } from '../../data/youtubeQuestionData';
import styles from '../../styles/admin/Admin.module.css';
import { MdClose } from 'react-icons/md';

interface QuestionSetFormProps {
    initialData?: YoutubeVideoSet;
    onClose: () => void;
    onSave: (data: Partial<YoutubeVideoSet>) => void;
}

const QuestionSetForm: React.FC<QuestionSetFormProps> = ({ initialData, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<YoutubeVideoSet>>(
        initialData || {
            title: '',
            description: '',
            thumbnailUrl: '',
            publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            tags: [],
            questions: []
        }
    );

    const [tagInput, setTagInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <h2>{initialData ? 'Edit Question Set' : 'Add New Question Set'}</h2>
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
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Thumbnail URL</label>
                            <input
                                name="thumbnailUrl"
                                value={formData.thumbnailUrl}
                                onChange={handleChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Publish Date</label>
                            <input
                                name="publishDate"
                                value={formData.publishDate}
                                onChange={handleChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup + ' ' + styles.fullWidth}>
                            <label>Tags (Press Enter to add)</label>
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                className={styles.formInput}
                                placeholder="e.g. react, javascript"
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
                    <button type="submit" onClick={handleSubmit} className={styles.btnPrimary}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionSetForm;
