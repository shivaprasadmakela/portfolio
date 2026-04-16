import { create } from 'zustand';
import { type Blog, type NewBlog, type FilterType, type SortType } from '../types/blog';
import { blogService } from '../services/blogService';

interface BlogState {
    blogs: Blog[];
    isLoading: boolean;
    searchTerm: string;
    filter: FilterType;
    sortBy: SortType;
    
    // Actions
    fetchBlogs: () => void;
    setSearchTerm: (term: string) => void;
    setFilter: (filter: FilterType) => void;
    setSortBy: (sort: SortType) => void;
    
    // CRUD
    addBlog: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'readTime'>) => void;
    updateBlog: (id: string, updates: Partial<Blog>) => void;
    deleteBlog: (id: string) => void;
    
    // Computed (logic for the UI)
    getFilteredBlogs: () => Blog[];
}

export const useBlogStore = create<BlogState>((set: (partial: Partial<BlogState> | ((state: BlogState) => Partial<BlogState>)) => void, get: () => BlogState) => ({
    blogs: [],
    isLoading: false,
    searchTerm: '',
    filter: 'All',
    sortBy: 'Latest',

    fetchBlogs: () => {
        set({ isLoading: true });
        const blogs = blogService.getAll();
        set({ blogs, isLoading: false });
    },

    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    setFilter: (filter: FilterType) => set({ filter }),
    setSortBy: (sortBy: SortType) => set({ sortBy }),

    addBlog: (newBlog: NewBlog) => {
        const blog = blogService.create(newBlog);
        set((state: BlogState) => ({ blogs: [blog, ...state.blogs] }));
    },

    updateBlog: (id: string, updates: Partial<Blog>) => {
        const blog = blogService.update(id, updates);
        set((state: BlogState) => ({
            blogs: state.blogs.map((b: Blog) => (b.id === id ? blog : b))
        }));
    },

    deleteBlog: (id: string) => {
        blogService.delete(id);
        set((state: BlogState) => ({
            blogs: state.blogs.filter((b: Blog) => b.id !== id)
        }));
    },

    getFilteredBlogs: () => {
        const { blogs, searchTerm, filter, sortBy } = get();
        
        let filtered = blogs.filter((blog: Blog) => 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filter === 'Premium') {
            filtered = filtered.filter((b: Blog) => b.isPremium);
        } else if (filter === 'Free') {
            filtered = filtered.filter((b: Blog) => !b.isPremium);
        }

        return filtered.sort((a: Blog, b: Blog) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortBy === 'Latest' ? dateB - dateA : dateA - dateB;
        });
    }
}));
