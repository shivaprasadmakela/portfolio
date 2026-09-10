import { useQuery } from '@tanstack/react-query';
import { blogApi } from '../api/blogApi';
import type { Blog } from '../types/blog';

export const useBlogs = () => {
    return useQuery<Blog[], Error>({
        queryKey: ['blogs'],
        queryFn: blogApi.getAllBlogs,
        staleTime: Infinity, // static content, bundled with the app
    });
};

export const useBlogDetail = (slug: string) => {
    return useQuery<Blog | null, Error>({
        queryKey: ['blogs', 'detail', slug],
        queryFn: () => blogApi.getBlogBySlug(slug),
        enabled: !!slug,
        staleTime: Infinity,
    });
};
