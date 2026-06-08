import { useQuery } from '@tanstack/react-query';
import { challengeApi, type LeaderboardEntry } from '../api/challengeApi';

export const useLeaderboard = () => {
    return useQuery<LeaderboardEntry[], Error>({
        queryKey: ['challenge', 'leaderboard'],
        queryFn: challengeApi.getLeaderboard,
    });
};

export default useLeaderboard;
