export interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    isPremium: boolean;
    createdAt: string;
    updatedAt: string;
    readTime: string;
}

export type NewBlog = Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'readTime'>;

export type FilterType = 'All' | 'Premium' | 'Free';
export type SortType = 'Latest' | 'Oldest';
