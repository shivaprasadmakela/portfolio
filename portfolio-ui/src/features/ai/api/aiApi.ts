import { apiClient } from '../../../shared/api/apiClient';

export interface AiResponse {
    result: string;
}

export interface ChatMessage {
    text: string;
    sender: 'user' | 'ai';
}

export interface ChatRequest {
    input: string;
    history: ChatMessage[];
}

const BASE_PATH = '/api/ai';

export const aiApi = {
    chat: (request: ChatRequest): Promise<AiResponse> =>
        apiClient<AiResponse>(`${BASE_PATH}/chat`, {
            method: 'POST',
            body: JSON.stringify(request),
        }),

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

