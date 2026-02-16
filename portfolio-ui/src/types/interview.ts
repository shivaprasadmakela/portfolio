export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface QuestionDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  contentHtml: string;
  solutionMd: string;
  difficulty: Difficulty;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  views: number;
  tags: string[];
  collectionIds?: number[];
  createdBy?: number;
}

export interface CollectionDto {
  id: number;
  name: string;
  slug?: string;
  description: string;
  thumbnailUrl?: string;
  icon?: string;
  videoId?: string;
  publishDate?: string;
  type: 'CATEGORY' | 'YOUTUBE_SET';
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  questions?: QuestionDto[];
  questionCount: number;
}
