import { useMutation, useQueryClient } from '@tanstack/react-query';
import { challengeApi, type CheckInRequest, type CheckInResponse } from '../api/challengeApi';

export const useCheckIn = () => {
    const queryClient = useQueryClient();

    return useMutation<CheckInResponse, Error, CheckInRequest>({
        mutationFn: (request) => challengeApi.checkIn(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['challenge', 'leaderboard'] });
            queryClient.invalidateQueries({ queryKey: ['challenge', 'question'] });
        },
    });
};

export default useCheckIn;
