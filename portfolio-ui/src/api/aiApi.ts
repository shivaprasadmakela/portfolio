import { apiClient } from './apiClient';

export interface AiResponse {
    result: string;
}

const BASE_PATH = '/api/ai';

export const aiApi = {
    improveTitle: (title: string): Promise<AiResponse> => 
        apiClient<AiResponse>(`${BASE_PATH}/improve-title`, {
            method: 'POST',
            body: JSON.stringify({ input: title }),
        }),

    enhanceContent: (content: string): Promise<AiResponse> => 
        apiClient<AiResponse>(`${BASE_PATH}/enhance-content`, {
            method: 'POST',
            body: JSON.stringify({ input: content }),
        }),

    summarize: (content: string): Promise<AiResponse> => 
        apiClient<AiResponse>(`${BASE_PATH}/summarize`, {
            method: 'POST',
            body: JSON.stringify({ input: content }),
        }),
};
