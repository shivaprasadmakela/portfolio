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

export const aiApi = {
    chat: (request: ChatRequest): Promise<AiResponse> =>
        apiClient<AiResponse>('/api/ai/chat', {
            method: 'POST',
            body: JSON.stringify(request),
        }),
};
