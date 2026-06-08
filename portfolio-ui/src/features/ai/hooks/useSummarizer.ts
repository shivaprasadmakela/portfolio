import { useMutation } from '@tanstack/react-query';
import { aiApi, type AiResponse } from '../api/aiApi';

export const useSummarizer = () => {
    return useMutation<AiResponse, Error, string>({
        mutationFn: (content) => aiApi.summarize(content),
    });
};

export default useSummarizer;
