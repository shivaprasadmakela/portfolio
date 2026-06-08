import { useQuery } from '@tanstack/react-query';
import { interviewApi } from '../api/interviewApi';
import type { CollectionDto } from '../types/interview';

export const useCollectionBySlug = (slug: string) => {
    return useQuery<CollectionDto, Error>({
        queryKey: ['interview', 'collection', slug],
        queryFn: () => interviewApi.getCollectionBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
};
export default useCollectionBySlug;
