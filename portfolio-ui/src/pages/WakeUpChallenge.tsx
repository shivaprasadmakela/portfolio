/* src/pages/WakeUpChallenge.tsx */
import React, { useState } from 'react';
import Header from '../components/home/Header';
import { ChallengeHero } from '../components/challenge/ChallengeHero';
import { CheckInCard } from '../components/challenge/CheckInCard';
import { Leaderboard } from '../components/challenge/Leaderboard';
import styles from '../styles/Challenge.module.css';
import FadeInSection from '../components/FadeInSection';

const WakeUpChallenge: React.FC = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccessfulCheckIn = () => {
        setRefreshKey(prev => prev + 1);
    };

    const scrollToJoin = () => {
        const section = document.getElementById('check-in-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
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
                    <Leaderboard key={refreshKey} />
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
