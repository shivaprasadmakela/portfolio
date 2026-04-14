export type RoadmapStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export type ConnectionType = 'vertical' | 'curve-left' | 'curve-right' | 'fork-2';

export interface RoadmapNode {
  id: string;
  parentId?: string; // Reference to parent node ID for connection logic
  title: string;
  type: 'core' | 'optional' | 'advanced' | 'sub-topic';
  level: number;   // Vertical position (row)
  column: number;  // Horizontal position (col)
  connectionType?: ConnectionType;
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
