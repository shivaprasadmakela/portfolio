import styles from '../../styles/interview/Interview.module.css';
import type { Question } from '../../data/interviewData';
import { FiChevronRight } from 'react-icons/fi';

interface QuestionCardProps {
    question: Question;
    onClick: () => void;
}

export default function QuestionCard({ question, onClick }: QuestionCardProps) {
    return (
        <div className={styles.questionCard} onClick={onClick}>
            <div className={styles.questionInfo}>
                <h4 className={styles.questionTitle}>{question.title}</h4>
                <p className={styles.questionSummary}>{question.summary}</p>
                <div className={styles.meta}>
                    <span className={`${styles.badge} ${styles[`badge${question.difficulty}`]}`}>
                        {question.difficulty}
                    </span>
                    <div className={styles.tags}>
                        {question.tags.map(tag => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                    <span className={styles.views}>{question.views.toLocaleString()} views</span>
                </div>
            </div>
            <div className={styles.openHint}>
                <FiChevronRight size={24} color="var(--color-text-secondary)" />
            </div>
        </div>
    );
}
