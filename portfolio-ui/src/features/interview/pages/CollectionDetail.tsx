import { useParams, Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import QuestionCard from '../components/QuestionCard';
import QuestionDrawer from '../components/QuestionDrawer';
import styles from '../Interview.module.css';
import { useCollectionBySlug } from '../hooks/useQuestion';
import { motion } from 'framer-motion';
import { Input, Button, EmptyState } from '../../../shared/components';
import { FiSearch, FiChevronLeft, FiCalendar } from 'react-icons/fi';

const DIFFICULTIES = ['All', 'EASY', 'MEDIUM', 'HARD'] as const;

const CollectionDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: collection, isLoading, error } = useCollectionBySlug(slug || '');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'All' | 'EASY' | 'MEDIUM' | 'HARD'>('All');
    const [selectedQuestionSlug, setSelectedQuestionSlug] = useState<string | null>(null);

    const filteredQuestions = useMemo(() => {
        if (!collection?.questions) return [];
        return collection.questions.filter(q => {
            const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (q.summary && q.summary.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesFilter = filter === 'All' || q.difficulty === filter;
            return matchesSearch && matchesFilter;
        });
    }, [collection, searchQuery, filter]);

    const selectedQuestion = useMemo(() =>
        collection?.questions?.find(q => q.slug === selectedQuestionSlug) || null
        , [collection, selectedQuestionSlug]);

    const currentIndex = useMemo(() =>
        filteredQuestions.findIndex(q => q.slug === selectedQuestionSlug)
        , [filteredQuestions, selectedQuestionSlug]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSelectedQuestionSlug(filteredQuestions[currentIndex - 1].slug);
        }
    };

    const handleNext = () => {
        if (currentIndex < filteredQuestions.length - 1) {
            setSelectedQuestionSlug(filteredQuestions[currentIndex + 1].slug);
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Loading collection...</div>;
    }

    if (error || !collection) {
        return <div className={styles.error}>{error ? 'Failed to load collection.' : 'Collection not found'}</div>;
    }

    const isVideo = collection.type === 'YOUTUBE_SET';

    return (
        <div className={styles.pageWrapper}>
            <motion.main
                className={styles.container}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.listHeader}>
                    <div className={styles.breadcrumb}>
                        <Link to={isVideo ? "/interview/sets" : "/interview"} className={styles.backLink}>
                            <FiChevronLeft /> Back to {isVideo ? 'Video Sets' : 'Interview Hub'}
                        </Link>
                        <span>/</span>
                        <span>{collection.name}</span>
                    </div>
                </div>

                <div className={styles.setHero}>
                    {isVideo && collection.videoId && (
                        <div className={styles.videoPlayer}>
                            <iframe
                                src={`https://www.youtube.com/embed/${collection.videoId}`}
                                title={collection.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    <div className={styles.setInfo}>
                        <h1 className={styles.title}>{collection.name}</h1>
                        <p className={styles.subtitle}>{collection.description}</p>
                        <div className={styles.setMeta}>
                            {collection.publishDate && (
                                <div className={styles.metaItem}>
                                    <FiCalendar />
                                    <span>{collection.publishDate}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <Input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={<FiSearch />}
                    />

                    <div className={styles.filters}>
                        {DIFFICULTIES.map(d => (
                            <Button
                                key={d}
                                variant={filter === d ? 'primary' : 'secondary'}
                                className={`${styles.filterBtn} ${filter === d ? styles.filterBtnActive : ''}`}
                                onClick={() => setFilter(d)}
                            >
                                {d === 'All' ? 'All' : d.charAt(0) + d.slice(1).toLowerCase()}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className={styles.questionList}>
                    {filteredQuestions.map(q => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            onClick={() => setSelectedQuestionSlug(q.slug)}
                        />
                    ))}
                    {filteredQuestions.length === 0 && (
                        <EmptyState 
                            title="No questions found" 
                            message="No questions in this collection match your search criteria." 
                        />
                    )}
                </div>
            </motion.main>

            <QuestionDrawer
                question={selectedQuestion as any}
                isOpen={!!selectedQuestionSlug}
                onClose={() => setSelectedQuestionSlug(null)}
                onPrev={handlePrev}
                onNext={handleNext}
                hasPrev={currentIndex > 0}
                hasNext={currentIndex < filteredQuestions.length - 1}
            />
        </div>
    );
};

export default CollectionDetail;
