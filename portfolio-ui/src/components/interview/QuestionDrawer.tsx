import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiX, FiBookmark, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from '../../styles/interview/Interview.module.css';
import type { Question } from '../../data/interviewData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface QuestionDrawerProps {
    question: Question | null;
    isOpen: boolean;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export default function QuestionDrawer({
    question,
    isOpen,
    onClose,
    onPrev,
    onNext,
    hasPrev,
    hasNext
}: QuestionDrawerProps) {
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowSolution(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, question]);

    if (!question) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.drawerOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={styles.drawer}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className={styles.drawerHeader}>
                            <div>
                                <div className={styles.drawerMeta}>
                                    <span className={`${styles.badge} ${styles[`badge${question.difficulty}`]}`}>
                                        {question.difficulty}
                                    </span>
                                    <div className={styles.tags}>
                                        {question.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <h2 className={styles.drawerTitle}>{question.title}</h2>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className={styles.closeBtn} title="Bookmark">
                                    <FiBookmark />
                                </button>
                                <button className={styles.closeBtn} onClick={onClose} title="Close">
                                    <FiX />
                                </button>
                            </div>
                        </div>

                        <div className={styles.contentSection}>
                            <div dangerouslySetInnerHTML={{ __html: question.content }} />
                        </div>

                        <button
                            className={styles.solutionBtn}
                            onClick={() => setShowSolution(!showSolution)}
                        >
                            {showSolution ? 'Hide Solution' : 'Show Solution'}
                        </button>

                        <AnimatePresence>
                            {showSolution && (
                                <motion.div
                                    className={styles.solutionContent}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {question.solution}
                                    </ReactMarkdown>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={styles.navButtons}>
                            <button
                                className={styles.navBtn}
                                onClick={onPrev}
                                disabled={!hasPrev}
                            >
                                <FiChevronLeft style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                Previous Question
                            </button>
                            <button
                                className={styles.navBtn}
                                onClick={onNext}
                                disabled={!hasNext}
                            >
                                Next Question
                                <FiChevronRight style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
