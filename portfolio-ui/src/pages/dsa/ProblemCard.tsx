import type { DSAProblem } from '../../types/dsa';
import { useState } from 'react';
import { SiLeetcode, SiYoutube } from 'react-icons/si';
import { FiChevronDown } from 'react-icons/fi';
import styles from '../../styles/dsa/DSARoadmap.module.css';

interface ProblemCardProps {
    problem: DSAProblem;
    index: number;
    note: string;
    onNoteChange: (id: string, note: string) => void;
}

const difficultyClass = (d: string) => {
    if (d === 'Easy') return styles.easy;
    if (d === 'Medium') return styles.medium;
    return styles.hard;
};

export default function ProblemCard({ problem, index, note, onNoteChange }: ProblemCardProps) {
    const [notesOpen, setNotesOpen] = useState(false);
    const [localNote, setLocalNote] = useState(note);

    const handleBlur = () => onNoteChange(problem.id, localNote);

    return (
        <div className={styles.problemCard}>
            {/* Header row */}
            <div className={styles.problemHeader}>
                <span className={styles.problemIndex}>{index + 1}.</span>
                <span className={styles.problemName}>{problem.name}</span>
                <div className={styles.tagList}>
                    {problem.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                <span className={`${styles.difficultyBadge} ${difficultyClass(problem.difficulty)}`}>
                    {problem.difficulty}
                </span>
            </div>

            {/* Links + Notes toggle row */}
            <div className={styles.problemFooter}>
                <div className={styles.linkGroup}>
                    <a
                        href={problem.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkBtn} ${styles.lcLink}`}
                        title="Open on LeetCode"
                    >
                        <SiLeetcode className={styles.linkIcon} />
                        LeetCode
                    </a>

                    {problem.youtubeUrl ? (
                        <a
                            href={problem.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.linkBtn} ${styles.ytLink}`}
                            title="Watch on YouTube"
                        >
                            <SiYoutube className={styles.linkIcon} />
                            Video
                        </a>
                    ) : (
                        <span className={`${styles.linkBtn} ${styles.ytLink} ${styles.linkDisabled}`}>
                            <SiYoutube className={styles.linkIcon} />
                            Video
                        </span>
                    )}
                </div>

                <button
                    className={styles.notesToggleBtn}
                    onClick={() => setNotesOpen(prev => !prev)}
                >
                    <FiChevronDown
                        style={{ transform: notesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
                    />
                    Notes
                </button>
            </div>

            {/* Notes section */}
            <div className={`${styles.notesSection} ${notesOpen ? styles.notesSectionOpen : ''}`}>
                <textarea
                    className={styles.notesTextarea}
                    placeholder="Approach, observations, edge cases…"
                    value={localNote}
                    onChange={e => setLocalNote(e.target.value)}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
}
