import { useMutation } from '@tanstack/react-query';
import { aiApi, type AiResponse } from '../api/aiApi';

export const useTitleImprover = () => {
    return useMutation<AiResponse, Error, string>({
        mutationFn: (title) => aiApi.improveTitle(title),
    });
};

export default useTitleImprover;
