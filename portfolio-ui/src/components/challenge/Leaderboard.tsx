import React from 'react';
import styles from '../../styles/Challenge.module.css';
import type { LeaderboardEntry } from '../../api/challengeApi';
import { formatDateTime } from '../../utils/timeUtils';

interface LeaderboardProps {
    users: LeaderboardEntry[];
    isLoading: boolean;
    error: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, isLoading, error }) => {
    return (
        <div className={styles.card}>
            <header className={styles.leaderboardHeader}>
                <span style={{ fontSize: '2rem' }}>🔥</span>
                <h2 className={styles.leaderboardTitle}>Streak Leaderboard</h2>
            </header>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Rank</th>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Current Streak</th>
                            <th className={styles.th}>Longest Streak</th>
                            <th className={styles.th}>Last Check-In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className={styles.td} style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    Loading leaderboard...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={5} className={styles.td} style={{ textAlign: 'center', color: 'red' }}>
                                    {error}
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.td} style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    No submissions yet. Be the first!
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={index} className={index < 3 ? styles.topRow : ''}>
                                    <td className={styles.td}>
                                        <span className={styles.rank}>#{index + 1}</span>
                                        {index === 0 && <span className={styles.trophy}>🥇</span>}
                                        {index === 1 && <span className={styles.trophy}>🥈</span>}
                                        {index === 2 && <span className={styles.trophy}>🥉</span>}
                                    </td>
                                    <td className={styles.td}>{user.name}</td>
                                    <td className={styles.td}><span className={styles.streak}>{user.currentStreak} days</span></td>
                                    <td className={styles.td}>{user.longestStreak} days</td>
                                    <td className={styles.td}>{formatDateTime(user.lastCheckIn)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
