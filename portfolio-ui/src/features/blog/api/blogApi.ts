import { type Blog } from '../types/blog';
import { MOCK_BLOGS } from '../../../data/blogs';

/**
 * Read-only blog source.
 *
 * Posts are authored in `src/data/blogs.ts` and ship with the bundle. The previous
 * implementation also wrote to localStorage from the editor, which meant a "published"
 * post only ever existed in the browser that wrote it — never visible to a reader.
 * The editor is gone; this reads the static set and nothing else.
 */
export const blogApi = {
    getAllBlogs: async (): Promise<Blog[]> => MOCK_BLOGS,

    getBlogBySlug: async (slug: string): Promise<Blog | null> =>
        MOCK_BLOGS.find(b => b.slug === slug) ?? null,
};
