const BASE_URL = '/api/ai';

export interface AiResponse {
    result: string;
}

export const aiApi = {
    async improveTitle(title: string): Promise<AiResponse> {
        return this.post('/improve-title', title);
    },

    async enhanceContent(content: string): Promise<AiResponse> {
        return this.post('/enhance-content', content);
    },

    async summarize(content: string): Promise<AiResponse> {
        return this.post('/summarize', content);
    },

    async post(endpoint: string, input: string): Promise<AiResponse> {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ result: 'Request failed' }));
            throw new Error(error.result || 'AI service error');
        }

        return response.json();
    }
};
