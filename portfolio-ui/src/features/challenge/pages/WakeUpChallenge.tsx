import React, { useCallback } from 'react';
import { ChallengeHero } from '../components/ChallengeHero';
import { CheckInCard } from '../components/CheckInCard';
import { Leaderboard } from '../components/Leaderboard';
import styles from '../Challenge.module.css';
import { FadeInSection } from '../../../shared/components/FadeInSection/FadeInSection';
import { useLeaderboard } from '../hooks/useLeaderboard';

const WakeUpChallenge: React.FC = () => {
    const { data: leaderboardData = [], isLoading, error, refetch } = useLeaderboard();

    const handleSuccessfulCheckIn = useCallback(() => {
        refetch();
    }, [refetch]);

    const scrollToJoin = useCallback(() => {
        const section = document.getElementById('check-in-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    return (
        <main className={styles.container}>
            <FadeInSection>
                <ChallengeHero onJoin={scrollToJoin} />
            </FadeInSection>

            <FadeInSection>
                <CheckInCard onSuccess={handleSuccessfulCheckIn} />
            </FadeInSection>

            <Leaderboard 
                users={leaderboardData} 
                isLoading={isLoading} 
                error={error ? 'Failed to load leaderboard.' : ''} 
            />
        </main>
    );
};

export default WakeUpChallenge;
