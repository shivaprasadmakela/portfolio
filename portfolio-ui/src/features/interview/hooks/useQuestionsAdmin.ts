import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewApi } from '../api/interviewApi';
import type { QuestionDto, CollectionDto } from '../types/interview';

export const useQuestionsAdmin = () => {
    return useQuery<QuestionDto[], Error>({
        queryKey: ['interview', 'questions', 'admin'],
        queryFn: interviewApi.getAllQuestionsAdmin,
    });
};

export const useUpsertQuestion = () => {
    const queryClient = useQueryClient();
    return useMutation<QuestionDto, Error, Partial<QuestionDto>>({
        mutationFn: (q) => interviewApi.upsertQuestion(q),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interview', 'questions', 'admin'] });
            queryClient.invalidateQueries({ queryKey: ['interview', 'collection'] });
        },
    });
};

export const useDeleteQuestion = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>({
        mutationFn: (id) => interviewApi.deleteQuestion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interview', 'questions', 'admin'] });
            queryClient.invalidateQueries({ queryKey: ['interview', 'collection'] });
        },
    });
};

export const useUpsertCollection = () => {
    const queryClient = useQueryClient();
    return useMutation<CollectionDto, Error, Partial<CollectionDto>>({
        mutationFn: (c) => interviewApi.upsertCollection(c),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interview', 'categories'] });
            queryClient.invalidateQueries({ queryKey: ['interview', 'sets'] });
            queryClient.invalidateQueries({ queryKey: ['interview', 'collection'] });
        },
    });
};

export const useDeleteCollection = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>({
        mutationFn: (id) => interviewApi.deleteCollection(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interview', 'categories'] });
            queryClient.invalidateQueries({ queryKey: ['interview', 'sets'] });
            queryClient.invalidateQueries({ queryKey: ['interview', 'collection'] });
        },
    });
};
