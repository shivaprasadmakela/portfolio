/* src/pages/WakeUpChallenge.tsx */
import React, { useState, useEffect } from 'react';
import Header from '../components/home/Header';
import { ChallengeHero } from '../components/challenge/ChallengeHero';
import { CheckInCard } from '../components/challenge/CheckInCard';
import { Leaderboard } from '../components/challenge/Leaderboard';
import styles from '../styles/Challenge.module.css';
import FadeInSection from '../components/FadeInSection';

import { challengeApi, type LeaderboardEntry } from '../api/challengeApi';

const WakeUpChallenge: React.FC = () => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchLeaderboard = async () => {
        setIsLoading(true);
        try {
            const data = await challengeApi.getLeaderboard();
            setLeaderboardData(data);
            setError('');
        } catch (err: any) {
            setError('Failed to load leaderboard.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const handleSuccessfulCheckIn = (newData?: LeaderboardEntry[]) => {
        if (newData) {
            setLeaderboardData(newData);
        } else {
            fetchLeaderboard();
        }
    };

    const scrollToJoin = () => {
        const section = document.getElementById('check-in-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
            <Header />

            <main className={styles.container}>
                <FadeInSection>
                    <ChallengeHero onJoin={scrollToJoin} />
                </FadeInSection>

                <FadeInSection>
                    <CheckInCard onSuccess={handleSuccessfulCheckIn} />
                </FadeInSection>

                <FadeInSection>
                    <Leaderboard users={leaderboardData} isLoading={isLoading} error={error} />
                </FadeInSection>
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '40px',
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                borderTop: '1px solid var(--color-border)'
            }}>
                © {new Date().getFullYear()} Wake Up With Me Challenge. Build your discipline.
            </footer>
        </div>
    );
};

export default WakeUpChallenge;
