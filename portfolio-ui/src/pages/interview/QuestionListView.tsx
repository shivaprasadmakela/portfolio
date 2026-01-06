import { useParams, Link } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import Header from '../../components/home/Header';
import QuestionCard from '../../components/interview/QuestionCard';
import QuestionDrawer from '../../components/interview/QuestionDrawer';
import styles from '../../styles/interview/Interview.module.css';
import { interviewData } from '../../data/interviewData';
import { motion } from 'framer-motion';
import { Input, Button } from '../../components/ui';
import { FiSearch } from 'react-icons/fi';

const QuestionListView: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

    // Find the category data
    const category = interviewData.find(cat => cat.id === categoryId);

    const filteredQuestions = useMemo(() => {
        if (!category) return [];
        return category.questions.filter(q => {
            const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (q.summary && q.summary.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesFilter = filter === 'All' || q.difficulty === filter;
            return matchesSearch && matchesFilter;
        });
    }, [category, searchQuery, filter]);

    const selectedQuestion = useMemo(() =>
        category?.questions.find(q => q.id === selectedQuestionId) || null
        , [category, selectedQuestionId]);

    const currentIndex = useMemo(() =>
        category?.questions.findIndex(q => q.id === selectedQuestionId) ?? -1
        , [category, selectedQuestionId]);

    const handlePrev = () => {
        if (currentIndex > 0 && category) {
            setSelectedQuestionId(category.questions[currentIndex - 1].id);
        }
    };

    const handleNext = () => {
        if (currentIndex < (category?.questions.length ?? 0) - 1 && category) {
            setSelectedQuestionId(category.questions[currentIndex + 1].id);
        }
    };

    if (!category) {
        return <div>Category not found</div>;
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
                        <Link to="/interview-prep">Home</Link>
                        <span>/</span>
                        <span>{category.name} Questions</span>
                    </div>
                    <h1 className={styles.title}>{category.name} Interview Questions</h1>
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
                        {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
                            <Button
                                key={d}
                                variant={filter === d ? 'primary' : 'secondary'}
                                className={`${styles.filterBtn} ${filter === d ? styles.filterBtnActive : ''}`}
                                onClick={() => setFilter(d)}
                            >
                                {d}
                            </Button>
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
                hasNext={currentIndex < (category?.questions.length ?? 0) - 1}
            />
        </div>
    );
};

export default QuestionListView;
