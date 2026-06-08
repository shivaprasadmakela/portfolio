import { useQuery } from '@tanstack/react-query';
import { challengeApi, type VerificationQuestion } from '../api/challengeApi';

export const useChallengeQuestion = () => {
    return useQuery<VerificationQuestion, Error>({
        queryKey: ['challenge', 'question'],
        queryFn: challengeApi.getQuestion,
        staleTime: 0, // Verification questions should not be stale
    });
};

export default useChallengeQuestion;
