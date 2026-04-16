import { type Blog } from '../types/blog';

const STORAGE_KEY = 'portfolio_blogs';

const MOCK_BLOGS: Blog[] = [
    {
        id: '1',
        title: 'Building a Production-Ready Blog with React',
        excerpt: 'Learn how to architect a scalable, type-safe blogging system using modern React patterns and TypeScript.',
        content: '# Building a Production-Ready Blog\n\nCreating a blog system is a classic developer exercise, but making it production-ready requires careful thought about architecture, UX, and performance.\n\n## Why Type Safety Matters\n\nUsing TypeScript allows us to define clear contracts between our storage, store, and UI layers...',
        isPremium: true,
        createdAt: new Date('2024-03-20').toISOString(),
        updatedAt: new Date('2024-03-20').toISOString(),
        readTime: '8 min read'
    },
    {
        id: '2',
        title: 'The Future of Frontend Development in 2025',
        excerpt: 'Exploring the shift towards server-centric architectures, AI-assisted coding, and the evolving role of the frontend engineer.',
        content: '# The Future of Frontend Development\n\nAs we approach 2025, the landscape of frontend development is shifting faster than ever. AI is no longer a gimmick; it is a core part of the developer workflow.',
        isPremium: false,
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-15').toISOString(),
        readTime: '5 min read'
    }
];

export const blogService = {
    getAll(): Blog[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            this.saveAll(MOCK_BLOGS);
            return MOCK_BLOGS;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse blogs from localStorage', e);
            return [];
        }
    },

    getById(id: string): Blog | undefined {
        const blogs = this.getAll();
        return blogs.find(b => b.id === id);
    },

    saveAll(blogs: Blog[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    },

    create(newBlog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'readTime'>): Blog {
        const blogs = this.getAll();
        const blog: Blog = {
            ...newBlog,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            readTime: `${Math.ceil(newBlog.content.split(' ').length / 200)} min read`
        };
        this.saveAll([blog, ...blogs]);
        return blog;
    },

    update(id: string, updates: Partial<Blog>): Blog {
        const blogs = this.getAll();
        const index = blogs.findIndex(b => b.id === id);
        if (index === -1) throw new Error('Blog not found');

        const updatedBlog = {
            ...blogs[index],
            ...updates,
            updatedAt: new Date().toISOString(),
            readTime: updates.content 
                ? `${Math.ceil(updates.content.split(' ').length / 200)} min read`
                : blogs[index].readTime
        };

        blogs[index] = updatedBlog;
        this.saveAll(blogs);
        return updatedBlog;
    },

    delete(id: string): void {
        const blogs = this.getAll();
        this.saveAll(blogs.filter(b => b.id !== id));
    }
};
