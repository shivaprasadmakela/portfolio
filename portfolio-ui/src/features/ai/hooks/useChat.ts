import { useMutation } from '@tanstack/react-query';
import { aiApi, type ChatRequest, type AiResponse } from '../api/aiApi';

export const useChat = () => {
    return useMutation<AiResponse, Error, ChatRequest>({
        mutationFn: (request) => aiApi.chat(request),
    });
};

export default useChat;
