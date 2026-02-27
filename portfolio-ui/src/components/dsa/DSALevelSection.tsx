import { useState } from 'react';
import type { DSARoadmapLevel } from '../../types/dsa';
import ProblemCard from './ProblemCard';
import styles from '../../styles/dsa/DSARoadmap.module.css';
import { FiChevronDown } from 'react-icons/fi';

interface DSALevelSectionProps {
    level: DSARoadmapLevel;
    getNote: (id: string) => string;
    onNoteChange: (id: string, note: string) => void;
}

export default function DSALevelSection({ level, getNote, onNoteChange }: DSALevelSectionProps) {
    const [open, setOpen] = useState(false);

    const allProblems = level.topics.flatMap(t => t.problems);
    const isComingSoon = allProblems.length === 0;

    return (
        <div className={styles.levelSection}>
            <div className={styles.levelHeader} onClick={() => setOpen(prev => !prev)}>
                <div className={styles.levelHeaderLeft}>
                    <div className={styles.levelBadge}>{level.levelNumber}</div>
                    <div>
                        <div className={styles.levelTitle}>Level {level.levelNumber} — {level.level}</div>
                        <div className={styles.levelMeta}>
                            {isComingSoon ? (
                                <span style={{ color: 'var(--color-text-primary-green)', fontStyle: 'italic' }}>
                                    Coming Soon
                                </span>
                            ) : (
                                `${allProblems.length} problems`
                            )}
                        </div>
                    </div>
                </div>
                <FiChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
            </div>

            {open && (
                <div className={styles.levelBody}>
                    {isComingSoon ? (
                        <p style={{
                            textAlign: 'center',
                            color: 'var(--color-text-secondary)',
                            padding: '1.5rem 0',
                            fontStyle: 'italic',
                            fontSize: '0.95rem',
                        }}>
                            🚧 Problems for this section are coming soon. Stay tuned!
                        </p>
                    ) : (
                        allProblems.map((problem, idx) => (
                            <ProblemCard
                                key={problem.id}
                                problem={problem}
                                index={idx}
                                note={getNote(problem.id)}
                                onNoteChange={onNoteChange}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
