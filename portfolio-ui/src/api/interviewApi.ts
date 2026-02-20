import { apiClient } from './apiClient';
import type { CollectionDto, QuestionDto } from '../types/interview';

const BASE_PATH = '/api/interview';

export const interviewApi = {
    // Public Endpoints
    getAllCategories: (): Promise<CollectionDto[]> => 
        apiClient<CollectionDto[]>(`${BASE_PATH}/categories`),

    getAllSets: (): Promise<CollectionDto[]> => 
        apiClient<CollectionDto[]>(`${BASE_PATH}/sets`),

    getCollection: (id: number): Promise<CollectionDto> => 
        apiClient<CollectionDto>(`${BASE_PATH}/collections/${id}`),

    // Admin Endpoints
    getAllQuestionsAdmin: (): Promise<QuestionDto[]> => 
        apiClient<QuestionDto[]>(`${BASE_PATH}/admin/questions`),

    upsertQuestion: (question: Partial<QuestionDto>): Promise<QuestionDto> => 
        apiClient<QuestionDto>(`${BASE_PATH}/admin/questions`, {
            method: 'POST',
            body: JSON.stringify(question)
        }),

    deleteQuestion: (id: number): Promise<void> => 
        apiClient<void>(`${BASE_PATH}/admin/questions/${id}`, {
            method: 'DELETE'
        }),

    upsertCollection: (collection: Partial<CollectionDto>): Promise<CollectionDto> => 
        apiClient<CollectionDto>(`${BASE_PATH}/admin/collections`, {
            method: 'POST',
            body: JSON.stringify(collection)
        }),

    deleteCollection: (id: number): Promise<void> => 
        apiClient<void>(`${BASE_PATH}/admin/collections/${id}`, {
            method: 'DELETE'
        }),
};
