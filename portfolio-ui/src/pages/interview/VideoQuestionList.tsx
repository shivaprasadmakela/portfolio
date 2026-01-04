import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import Header from '../../components/home/Header';
import QuestionCard from '../../components/interview/QuestionCard';
import QuestionDrawer from '../../components/interview/QuestionDrawer';
import styles from '../../styles/interview/Interview.module.css';
import { youtubeQuestionData } from '../../data/youtubeQuestionData';
import type { Difficulty } from '../../data/interviewData';
import { motion } from 'framer-motion';
import { FiSearch, FiExternalLink } from 'react-icons/fi';

export default function VideoQuestionList() {
    const { videoId } = useParams<{ videoId: string }>();
    const videoSet = youtubeQuestionData.find(v => v.id === videoId);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

    const filteredQuestions = useMemo(() => {
        if (!videoSet) return [];
        return videoSet.questions.filter(q => {
            const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
            return matchesSearch && matchesDifficulty;
        });
    }, [videoSet, searchQuery, filterDifficulty]);

    const selectedQuestion = useMemo(() =>
        videoSet?.questions.find(q => q.id === selectedQuestionId) || null
        , [videoSet, selectedQuestionId]);

    const currentIndex = useMemo(() =>
        videoSet?.questions.findIndex(q => q.id === selectedQuestionId) ?? -1
        , [videoSet, selectedQuestionId]);

    const handlePrev = () => {
        if (currentIndex > 0 && videoSet) {
            setSelectedQuestionId(videoSet.questions[currentIndex - 1].id);
        }
    };

    const handleNext = () => {
        if (currentIndex < (videoSet?.questions.length ?? 0) - 1 && videoSet) {
            setSelectedQuestionId(videoSet.questions[currentIndex + 1].id);
        }
    };

    if (!videoSet) {
        return <div>Video set not found</div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <motion.main
                className={styles.container}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.listHeader}>
                    <div className={styles.breadcrumb}>
                        <Link to="/youtube-sets">YouTube Sets</Link>
                        <span>/</span>
                        <span>{videoSet.title}</span>
                    </div>
                    <h1 className={styles.title}>{videoSet.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                        <p className={styles.subtitle} style={{ marginBottom: 0 }}>Questions discussed in this video</p>
                        <a
                            href={`https://www.youtube.com/watch?v=${videoSet.id.replace('yt-', 'ER9SspLe4Hg')}`} // Mock link placeholder
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.badge}
                            style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', background: 'rgba(255, 0, 0, 0.1)', color: '#ff0000', cursor: 'pointer' }}
                        >
                            <FiExternalLink size={12} />
                            Watch Video
                        </a>
                    </div>
                </div>

                <div className={styles.controls}>
                    <div style={{ position: 'relative' }}>
                        <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                        <input
                            type="text"
                            className={styles.searchBar}
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ paddingLeft: '48px' }}
                        />
                    </div>

                    <div className={styles.filters}>
                        {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
                            <button
                                key={d}
                                className={`${styles.filterBtn} ${filterDifficulty === d ? styles.filterBtnActive : ''}`}
                                onClick={() => setFilterDifficulty(d)}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.questionList}>
                    {filteredQuestions.map(q => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            onClick={() => setSelectedQuestionId(q.id)}
                        />
                    ))}
                    {filteredQuestions.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '40px' }}>
                            No questions found matching your criteria.
                        </p>
                    )}
                </div>
            </motion.main>

            <QuestionDrawer
                question={selectedQuestion}
                isOpen={!!selectedQuestionId}
                onClose={() => setSelectedQuestionId(null)}
                onPrev={handlePrev}
                onNext={handleNext}
                hasPrev={currentIndex > 0}
                hasNext={currentIndex < (videoSet?.questions.length ?? 0) - 1}
            />
        </div>
    );
}
