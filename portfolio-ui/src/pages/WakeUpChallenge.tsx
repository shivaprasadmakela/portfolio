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

    useEffect(() => {
        console.log("Leaderboard requested", performance.now());
        challengeApi.getLeaderboard()
            .then(setLeaderboardData)
            .catch(() => setError("Failed to load leaderboard."))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSuccessfulCheckIn = () => {
        challengeApi.getLeaderboard()
            .then(setLeaderboardData)
            .catch(() => setError("Failed to load leaderboard."));
    };

    const scrollToJoin = () => {
        const section = document.getElementById('check-in-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div style={{ background: 'transparent', minHeight: '100vh' }}>
            <Header />

            <main className={styles.container}>
                <FadeInSection>
                    <ChallengeHero onJoin={scrollToJoin} />
                </FadeInSection>

                <FadeInSection>
                    <CheckInCard onSuccess={handleSuccessfulCheckIn} />
                </FadeInSection>

                <Leaderboard users={leaderboardData} isLoading={isLoading} error={error} />
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
