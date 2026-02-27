export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type DSALevel =
  | 'Foundation'
  | 'Arrays'
  | 'Linked List'
  | 'Strings'
  | 'Stack and Queues'
  | 'Binary Search Algorithm'
  | 'Two Pointers & Sliding Window'
  | 'Binary Tree'
  | 'Binary Search Tree'
  | 'Heap'
  | 'Patterns'
  | 'Advanced';

export type FilterDifficulty = 'All' | ProblemDifficulty;
export type FilterStatus = 'All' | 'Not Started' | 'In Progress' | 'Solved' | 'Revised';
export type SortOption = 'Default' | 'Recently Solved' | 'Difficulty';

export interface DSAFiltersState {
  search: string;
  difficulty: FilterDifficulty;
  status: FilterStatus;
  topic: string;
  sortBy: SortOption;
}

export interface DSAProblem {
  id: string;
  name: string;
  difficulty: ProblemDifficulty;
  tags: string[];
  leetcodeUrl: string;
  youtubeUrl?: string;
}

export interface DSATopic {
  id: string;
  name: string;
  problems: DSAProblem[];
}

export interface DSARoadmapLevel {
  id: string;
  level: DSALevel;
  levelNumber: number;
  topics: DSATopic[];
}
