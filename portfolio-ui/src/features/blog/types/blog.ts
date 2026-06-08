export interface Blog {
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    isPremium: boolean;
    createdAt: string;
    updatedAt: string;
    readTime: string;
    summary?: string;
}

export type NewBlog = Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'readTime'>;

export type FilterType = 'All' | 'Premium' | 'Free';
export type SortType = 'Latest' | 'Oldest';
