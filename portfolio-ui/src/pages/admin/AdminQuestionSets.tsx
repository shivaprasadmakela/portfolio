import React, { useState } from 'react';
import { youtubeQuestionData, type YoutubeVideoSet } from '../../data/youtubeQuestionData';
import styles from '../../styles/admin/Admin.module.css';
import { MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';

const AdminQuestionSets: React.FC = () => {
    const [sets] = useState<YoutubeVideoSet[]>(youtubeQuestionData);

    return (
        <div className={styles.questionSets}>
            <div className={styles.pageHeader}>
                <h1>Question Sets</h1>
                <button className={styles.btnPrimary}>
                    <MdAdd size={20} />
                    Add New Set
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.adminTable}>
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Questions</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sets.map((set) => (
                            <tr key={set.id}>
                                <td>
                                    <img src={set.thumbnailUrl} alt={set.title} className={styles.thumbnailSm} />
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{set.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                                        {set.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                                    </div>
                                </td>
                                <td>{set.publishDate}</td>
                                <td>{set.questionCount}</td>
                                <td>
                                    <span className={styles.tag} style={{ backgroundColor: 'rgba(60, 207, 145, 0.1)', color: '#3ccf91' }}>
                                        Published
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.btnIcon} title="Preview">
                                            <MdVisibility size={18} />
                                        </button>
                                        <button className={styles.btnIcon} title="Edit">
                                            <MdEdit size={18} />
                                        </button>
                                        <button className={styles.btnIcon} title="Delete" style={{ color: '#ff4d4d' }}>
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminQuestionSets;
