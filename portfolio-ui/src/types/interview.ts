export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface QuestionDto {
  id: number;
  title: string;
  summary: string;
  contentHtml: string;
  solutionMd: string;
  difficulty: Difficulty;
  views: number;
  tags: string[];
  isPublished: boolean;
  collectionIds?: number[];
}

export interface CollectionDto {
  id: number;
  name: string;
  description: string;
  thumbnailUrl?: string;
  icon?: string;
  videoId?: string;
  publishDate?: string;
  type: 'CATEGORY' | 'YOUTUBE_SET';
  questions?: QuestionDto[];
  questionCount: number;
}
