import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/admin/Admin.module.css';
import intStyles from '../../styles/interview/Interview.module.css';
import { interviewApi } from '../../api/interviewApi';
import type { QuestionDto, CollectionDto } from '../../types/interview';
import { MdAdd, MdEdit, MdDelete, MdSave, MdClose, MdVisibility, MdSearch, MdInbox } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const InterviewAdmin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'questions' | 'categories' | 'sets'>('questions');
    const [questions, setQuestions] = useState<QuestionDto[]>([]);
    const [categories, setCategories] = useState<CollectionDto[]>([]);
    const [sets, setSets] = useState<CollectionDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Search and Filter
    const [searchQuery, setSearchQuery] = useState('');

    // Editor States
    const [isEditingQuestion, setIsEditingQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Partial<QuestionDto>>({});

    const [isEditingCollection, setIsEditingCollection] = useState(false);
    const [currentCollection, setCurrentCollection] = useState<Partial<CollectionDto>>({});

    const [isPreviewMode, setIsPreviewMode] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [qData, cData, sData] = await Promise.all([
                interviewApi.getAllQuestionsAdmin(),
                interviewApi.getAllCategories(),
                interviewApi.getAllSets()
            ]);
            setQuestions(qData);
            setCategories(cData);
            setSets(sData);
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveQuestion = async () => {
        try {
            await interviewApi.upsertQuestion(currentQuestion);
            setIsEditingQuestion(false);
            fetchData();
        } catch (error) {
            alert('Failed to save question');
        }
    };

    const handleDeleteQuestion = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;
        try {
            await interviewApi.deleteQuestion(id);
            fetchData();
        } catch (error) {
            alert('Failed to delete question');
        }
    };

    const handleSaveCollection = async () => {
        try {
            // Set type based on active tab if it's a new collection
            const collectionToSave = {
                ...currentCollection,
                type: currentCollection.type || (activeTab === 'categories' ? 'CATEGORY' : 'YOUTUBE_SET')
            };
            await interviewApi.upsertCollection(collectionToSave);
            setIsEditingCollection(false);
            fetchData();
        } catch (error) {
            alert('Failed to save collection');
        }
    };

    const handleDeleteCollection = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this collection?')) return;
        try {
            await interviewApi.deleteCollection(id);
            fetchData();
        } catch (error) {
            alert('Failed to delete collection');
        }
    };

    const filteredQuestions = questions.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSets = sets.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const EmptyState = ({ title, message }: { title: string, message: string }) => (
        <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}><MdInbox /></div>
            <div className={styles.emptyStateTitle}>{title}</div>
            <div className={styles.emptyStateText}>{message}</div>
        </div>
    );

    return (
        <div className={styles.adminConfig}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'questions' ? styles.activeTab : ''}`}
                    onClick={() => { setActiveTab('questions'); setSearchQuery(''); }}
                >
                    Question Bank
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'categories' ? styles.activeTab : ''}`}
                    onClick={() => { setActiveTab('categories'); setSearchQuery(''); }}
                >
                    Categories
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'sets' ? styles.activeTab : ''}`}
                    onClick={() => { setActiveTab('sets'); setSearchQuery(''); }}
                >
                    YouTube Sets
                </button>
            </div>

            <div className={styles.tabContent}>
                <div className={styles.contentHeader}>
                    <div className={styles.searchBar}>
                        <MdSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button className={styles.btnPrimary} onClick={() => {
                        if (activeTab === 'questions') {
                            setCurrentQuestion({ difficulty: 'MEDIUM', status: 'DRAFT', tags: [], collectionIds: [] } as any);
                            setIsEditingQuestion(true);
                        } else {
                            setCurrentCollection({
                                type: activeTab === 'categories' ? 'CATEGORY' : 'YOUTUBE_SET'
                            } as any);
                            setIsEditingCollection(true);
                        }
                    }}>
                        <MdAdd size={20} /> {activeTab === 'questions' ? 'New Question' : activeTab === 'categories' ? 'New Category' : 'New Video Set'}
                    </button>
                </div>

                {isLoading ? (
                    <div className={styles.loadingContainer}>Loading...</div>
                ) : (
                    <>
                        {activeTab === 'questions' && (
                            <div className={styles.tableContainer}>
                                {filteredQuestions.length > 0 ? (
                                    <table className={styles.adminTable}>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Difficulty</th>
                                                <th>Tags</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredQuestions.map(q => (
                                                <tr key={q.id}>
                                                    <td style={{ fontWeight: 600 }}>{q.title}</td>
                                                    <td>
                                                        <span className={`${intStyles.badge} ${intStyles[`badge${q.difficulty.charAt(0) + q.difficulty.slice(1).toLowerCase()}`]}`}>
                                                            {q.difficulty}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tagGroup}>
                                                            {q.tags?.map(t => <span key={t} className={styles.miniTag}>{t}</span>)}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={q.status === 'PUBLISHED' ? styles.statusPublished : styles.statusDraft}>
                                                            {q.status === 'PUBLISHED' ? 'Published' : q.status === 'DRAFT' ? 'Draft' : 'Archived'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.actions}>
                                                            <button className={styles.btnIcon} onClick={() => {
                                                                setCurrentQuestion(q);
                                                                setIsEditingQuestion(true);
                                                            }}><MdEdit /></button>
                                                            <button className={styles.btnIcon} style={{ color: '#ff4d4d' }} onClick={() => handleDeleteQuestion(q.id)}><MdDelete /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <EmptyState
                                        title={searchQuery ? "No matching questions" : "Question bank is empty"}
                                        message={searchQuery ? "Try adjusting your search terms" : "Start by adding your first interview question"}
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'categories' && (
                            <div className={styles.tableContainer}>
                                {filteredCategories.length > 0 ? (
                                    <table className={styles.adminTable}>
                                        <thead>
                                            <tr>
                                                <th>Icon</th>
                                                <th>Name</th>
                                                <th>Questions</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCategories.map(cat => (
                                                <tr key={cat.id}>
                                                    <td style={{ fontSize: '1.5rem' }}>{cat.icon}</td>
                                                    <td style={{ fontWeight: 600 }}>{cat.name}</td>
                                                    <td>{cat.questionCount}</td>
                                                    <td>
                                                        <div className={styles.actions}>
                                                            <button className={styles.btnIcon} onClick={() => {
                                                                setCurrentCollection(cat);
                                                                setIsEditingCollection(true);
                                                            }}><MdEdit /></button>
                                                            <button className={styles.btnIcon} style={{ color: '#ff4d4d' }} onClick={() => handleDeleteCollection(cat.id)}><MdDelete /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <EmptyState
                                        title={searchQuery ? "No matching categories" : "No categories yet"}
                                        message={searchQuery ? "Try searching for something else" : "Create a category to group your questions by topic"}
                                    />
                                )}
                            </div>
                        )}

                        {activeTab === 'sets' && (
                            <div className={styles.tableContainer}>
                                {filteredSets.length > 0 ? (
                                    <table className={styles.adminTable}>
                                        <thead>
                                            <tr>
                                                <th>Thumbnail</th>
                                                <th>Title</th>
                                                <th>Questions</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSets.map(s => (
                                                <tr key={s.id}>
                                                    <td><img src={s.thumbnailUrl} alt="" className={styles.thumbnailSm} /></td>
                                                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                                                    <td>{s.questionCount}</td>
                                                    <td>
                                                        <div className={styles.actions}>
                                                            <button className={styles.btnIcon} onClick={() => {
                                                                setCurrentCollection(s);
                                                                setIsEditingCollection(true);
                                                            }}><MdEdit /></button>
                                                            <button className={styles.btnIcon} style={{ color: '#ff4d4d' }} onClick={() => handleDeleteCollection(s.id)}><MdDelete /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <EmptyState
                                        title={searchQuery ? "No matching sets" : "No video sets yet"}
                                        message={searchQuery ? "Try a different search query" : "Add a YouTube video set to organize curated questions"}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Question Editor Overlay */}
            <AnimatePresence>
                {isEditingQuestion && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                        >
                            <div className={styles.modalHeader}>
                                <h3>{currentQuestion.id ? 'Edit Question' : 'New Question'}</h3>
                                <div className={styles.modalActions}>
                                    <button
                                        className={`${styles.btnSecondary} ${isPreviewMode ? styles.active : ''}`}
                                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                                    >
                                        <MdVisibility /> {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                                    </button>
                                    <button className={styles.btnIcon} onClick={() => { setIsEditingQuestion(false); setIsPreviewMode(false); }}>
                                        <MdClose size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.modalBody}>
                                {!isPreviewMode ? (
                                    <div className={styles.formGrid}>
                                        <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                value={currentQuestion.title || ''}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Difficulty</label>
                                            <select
                                                value={currentQuestion.difficulty}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, difficulty: e.target.value as any })}
                                            >
                                                <option value="EASY">Easy</option>
                                                <option value="MEDIUM">Medium</option>
                                                <option value="HARD">Hard</option>
                                            </select>
                                        </div>
                                        <div className={styles.field}>
                                            <label>Tags (Comma separated)</label>
                                            <input
                                                type="text"
                                                value={currentQuestion.tags?.join(', ') || ''}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label>Status</label>
                                            <select
                                                value={currentQuestion.status || 'DRAFT'}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, status: e.target.value as any })}
                                            >
                                                <option value="DRAFT">Draft</option>
                                                <option value="PUBLISHED">Published</option>
                                                <option value="ARCHIVED">Archived</option>
                                            </select>
                                        </div>
                                        <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                            <label>Summary</label>
                                            <textarea
                                                value={currentQuestion.summary || ''}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, summary: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                            <label>Content (HTML)</label>
                                            <textarea
                                                style={{ height: '100px' }}
                                                value={currentQuestion.contentHtml || ''}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, contentHtml: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                            <label>Solution (Markdown)</label>
                                            <textarea
                                                style={{ height: '200px', fontFamily: 'monospace' }}
                                                value={currentQuestion.solutionMd || ''}
                                                onChange={e => setCurrentQuestion({ ...currentQuestion, solutionMd: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                            <label>Collections (Categories & YouTube Sets)</label>
                                            <div className={styles.collectionGrid}>
                                                <div className={styles.collectionSection}>
                                                    <div className={styles.collectionSectionTitle}>Categories</div>
                                                    {categories.map(cat => (
                                                        <label key={cat.id} className={styles.checkboxLabel}>
                                                            <input
                                                                type="checkbox"
                                                                checked={currentQuestion.collectionIds?.includes(cat.id!) || false}
                                                                onChange={e => {
                                                                    const ids = currentQuestion.collectionIds || [];
                                                                    const newIds = e.target.checked
                                                                        ? [...ids, cat.id!]
                                                                        : ids.filter(id => id !== cat.id);
                                                                    setCurrentQuestion({ ...currentQuestion, collectionIds: newIds });
                                                                }}
                                                            />
                                                            <span>{cat.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                <div className={styles.collectionSection}>
                                                    <div className={styles.collectionSectionTitle}>YouTube Sets</div>
                                                    {sets.map(s => (
                                                        <label key={s.id} className={styles.checkboxLabel}>
                                                            <input
                                                                type="checkbox"
                                                                checked={currentQuestion.collectionIds?.includes(s.id!) || false}
                                                                onChange={e => {
                                                                    const ids = currentQuestion.collectionIds || [];
                                                                    const newIds = e.target.checked
                                                                        ? [...ids, s.id!]
                                                                        : ids.filter(id => id !== s.id);
                                                                    setCurrentQuestion({ ...currentQuestion, collectionIds: newIds });
                                                                }}
                                                            />
                                                            <span>{s.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.previewContainer}>
                                        <div className={intStyles.contentSection}>
                                            <div dangerouslySetInnerHTML={{ __html: currentQuestion.contentHtml || '' }} />
                                        </div>
                                        <div className={intStyles.solutionContent}>
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {currentQuestion.solutionMd || ''}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.modalFooter}>
                                <button className={styles.btnSecondary} onClick={() => { setIsEditingQuestion(false); setIsPreviewMode(false); }}>Cancel</button>
                                <button className={styles.btnPrimary} onClick={handleSaveQuestion}>
                                    <MdSave /> Save Question
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Collection Editor Overlay */}
            <AnimatePresence>
                {isEditingCollection && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{ maxWidth: '500px' }}
                        >
                            <div className={styles.modalHeader}>
                                <h3>{currentCollection.id ? 'Edit' : 'New'} {currentCollection.type === 'CATEGORY' ? 'Category' : 'YouTube Set'}</h3>
                                <button className={styles.btnIcon} onClick={() => setIsEditingCollection(false)}>
                                    <MdClose size={24} />
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.formGrid}>
                                    <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                        <label>Name / Title</label>
                                        <input
                                            type="text"
                                            value={currentCollection.name || ''}
                                            onChange={e => setCurrentCollection({ ...currentCollection, name: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                        <label>Description</label>
                                        <textarea
                                            value={currentCollection.description || ''}
                                            onChange={e => setCurrentCollection({ ...currentCollection, description: e.target.value })}
                                        />
                                    </div>
                                    {currentCollection.type === 'CATEGORY' ? (
                                        <div className={styles.field}>
                                            <label>Icon (Emoji or Icon Name)</label>
                                            <input
                                                type="text"
                                                value={currentCollection.icon || ''}
                                                placeholder="e.g. 🚀"
                                                onChange={e => setCurrentCollection({ ...currentCollection, icon: e.target.value })}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <div className={styles.field} style={{ gridColumn: 'span 2' }}>
                                                <label>Thumbnail URL</label>
                                                <input
                                                    type="text"
                                                    value={currentCollection.thumbnailUrl || ''}
                                                    onChange={e => setCurrentCollection({ ...currentCollection, thumbnailUrl: e.target.value })}
                                                />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Video ID</label>
                                                <input
                                                    type="text"
                                                    value={currentCollection.videoId || ''}
                                                    onChange={e => setCurrentCollection({ ...currentCollection, videoId: e.target.value })}
                                                />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Publish Date</label>
                                                <input
                                                    type="date"
                                                    value={currentCollection.publishDate || ''}
                                                    onChange={e => setCurrentCollection({ ...currentCollection, publishDate: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <button className={styles.btnSecondary} onClick={() => setIsEditingCollection(false)}>Cancel</button>
                                <button className={styles.btnPrimary} onClick={handleSaveCollection}>
                                    <MdSave /> Save Collection
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InterviewAdmin;
