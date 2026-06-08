import { useQuery } from '@tanstack/react-query';
import { interviewApi } from '../api/interviewApi';
import type { CollectionDto } from '../types/interview';

export const useCategories = () => {
    return useQuery<CollectionDto[], Error>({
        queryKey: ['interview', 'categories'],
        queryFn: interviewApi.getAllCategories,
        staleTime: 10 * 60 * 1000, // 10 minutes cache
    });
};

export const useSets = () => {
    return useQuery<CollectionDto[], Error>({
        queryKey: ['interview', 'sets'],
        queryFn: interviewApi.getAllSets,
        staleTime: 10 * 60 * 1000,
    });
};
