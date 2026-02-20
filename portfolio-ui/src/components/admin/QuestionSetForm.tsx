import React, { useState } from 'react';
import type { CollectionDto } from '../../types/interview';
import styles from '../../styles/admin/Admin.module.css';
import { MdClose } from 'react-icons/md';

interface QuestionSetFormProps {
    initialData?: CollectionDto;
    onClose: () => void;
    onSave: (data: Partial<CollectionDto>) => void;
}

const QuestionSetForm: React.FC<QuestionSetFormProps> = ({ initialData, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<CollectionDto>>(
        initialData || {
            name: '',
            description: '',
            thumbnailUrl: '',
            publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            type: 'YOUTUBE_SET',
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                                name="name"
                                value={formData.name}
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
                            <label>Video ID (YouTube)</label>
                            <input
                                name="videoId"
                                value={formData.videoId || ''}
                                onChange={handleChange}
                                className={styles.formInput}
                                placeholder="e.g. dQw4w9WgXcQ"
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

                        <div className={styles.formGroup}>
                            <label>Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className={styles.formInput}
                            >
                                <option value="YOUTUBE_SET">YouTube Set</option>
                                <option value="CATEGORY">Category</option>
                            </select>
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
