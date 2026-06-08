import { useMutation } from '@tanstack/react-query';
import { aiApi, type AiResponse } from '../api/aiApi';

export const useContentEnhancer = () => {
    return useMutation<AiResponse, Error, string>({
        mutationFn: (content) => aiApi.enhanceContent(content),
    });
};

export default useContentEnhancer;
