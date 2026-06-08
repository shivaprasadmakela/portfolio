import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '../api/blogApi';
import type { Blog } from '../types/blog';

export const useBlogs = () => {
    return useQuery<Blog[], Error>({
        queryKey: ['blogs'],
        queryFn: blogApi.getAllBlogs,
        staleTime: 5 * 60 * 1000,
    });
};

export const useBlogDetail = (slug: string) => {
    return useQuery<Blog | null, Error>({
        queryKey: ['blogs', 'detail', slug],
        queryFn: () => blogApi.getBlogBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000,
    });
};

interface SaveBlogParams {
    blogData: any;
    editingBlog: Blog | null;
    currentBlogs: Blog[];
}

export const useSaveBlog = () => {
    const queryClient = useQueryClient();
    return useMutation<Blog, Error, SaveBlogParams>({
        mutationFn: ({ blogData, editingBlog, currentBlogs }) => 
            blogApi.saveBlog(blogData, editingBlog, currentBlogs),
        onSuccess: (savedBlog) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            queryClient.invalidateQueries({ queryKey: ['blogs', 'detail', savedBlog.slug] });
        },
    });
};

interface UpdateSummaryParams {
    slug: string;
    summary: string;
}

export const useUpdateBlogSummary = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, UpdateSummaryParams>({
        mutationFn: ({ slug, summary }) => blogApi.updateBlogSummary(slug, summary),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            queryClient.invalidateQueries({ queryKey: ['blogs', 'detail', variables.slug] });
        },
    });
};
