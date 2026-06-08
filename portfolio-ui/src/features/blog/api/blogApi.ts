import { type Blog } from '../types/blog';
import { MOCK_BLOGS } from '../../../data/blogs';

const STORAGE_KEY = 'portfolio_blogs';

export const blogApi = {
    getAllBlogs: async (): Promise<Blog[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const stored = localStorage.getItem(STORAGE_KEY);
        let existingBlogs: Blog[] = [];
        
        if (stored) {
            try {
                existingBlogs = JSON.parse(stored);
            } catch (e) {
                existingBlogs = [];
            }
        }

        const updatedBlogs = MOCK_BLOGS.map(mock => {
            const existing = existingBlogs.find(eb => eb.id === mock.id);
            return existing ? { ...mock, summary: existing.summary } : mock;
        });

        const userBlogs = existingBlogs.filter(
            eb => !MOCK_BLOGS.some(m => m.id === eb.id)
        );

        const finalBlogs = [...updatedBlogs, ...userBlogs];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalBlogs));
        return finalBlogs;
    },

    getBlogBySlug: async (slug: string): Promise<Blog | null> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const stored = localStorage.getItem(STORAGE_KEY);
        let found: Blog | undefined;

        if (stored) {
            try {
                const blogs: Blog[] = JSON.parse(stored);
                found = blogs.find(b => b.slug === slug);
            } catch (e) {
                console.error("Failed to parse blogs from storage", e);
            }
        }

        if (!found) {
            found = MOCK_BLOGS.find(b => b.slug === slug);
        }

        return found || null;
    },

    saveBlog: async (blogData: any, editingBlog: Blog | null, currentBlogs: Blog[]): Promise<Blog> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        let savedBlog: Blog;
        let updatedBlogs: Blog[];

        if (editingBlog) {
            savedBlog = {
                ...editingBlog,
                ...blogData,
                updatedAt: new Date().toISOString(),
                readTime: `${Math.ceil(blogData.content.split(' ').length / 200)} min read`
            };
            updatedBlogs = currentBlogs.map(b => b.id === editingBlog.id ? savedBlog : b);
        } else {
            savedBlog = {
                ...blogData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                readTime: `${Math.ceil(blogData.content.split(' ').length / 200)} min read`
            };
            updatedBlogs = [savedBlog, ...currentBlogs];
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
        return savedBlog;
    },

    updateBlogSummary: async (slug: string, summary: string): Promise<void> => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let blogs: Blog[] = [];
        
        if (stored) {
            try {
                blogs = JSON.parse(stored);
            } catch (e) {
                blogs = MOCK_BLOGS;
            }
        } else {
            blogs = MOCK_BLOGS;
        }

        const updated = blogs.map(b => 
            b.slug === slug ? { ...b, summary } : b
        );
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
};
