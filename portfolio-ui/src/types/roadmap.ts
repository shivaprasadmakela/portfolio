export type RoadmapStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface RoadmapNode {
  id: string;
  parentId?: string; // Reference to parent node ID
  title: string;
  type: 'core' | 'optional' | 'advanced' | 'sub-topic';
  position: { x: number; y: number };
  content?: {
    explanation: string;
    videoUrl?: string; // YouTube video ID or full URL
    resources?: { label: string; url: string }[];
    realWorldUsage?: string;
    subTopics?: string[]; // Checklist items
  };
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  nodes: RoadmapNode[];
}

export interface UserProgress {
  nodeStatuses: Record<string, RoadmapStatus>;
}
