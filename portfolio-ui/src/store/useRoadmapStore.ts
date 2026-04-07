import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RoadmapStatus } from '../types/roadmap';

interface RoadmapState {
  // nodeStatuses[roadmapId][nodeId] = status
  nodeStatuses: Record<string, Record<string, RoadmapStatus>>;
  // subTopicStatuses[roadmapId][nodeId][subTopicIndex] = isDone
  subTopicStatuses: Record<string, Record<string, Record<number, boolean>>>;
  selectedNodeId: string | null;
  
  // Actions
  setNodeStatus: (roadmapId: string, nodeId: string, status: RoadmapStatus) => void;
  setSubTopicStatus: (roadmapId: string, nodeId: string, subTopicIndex: number, isDone: boolean) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  resetProgress: (roadmapId: string) => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      nodeStatuses: {},
      subTopicStatuses: {},
      selectedNodeId: null,

      setNodeStatus: (roadmapId, nodeId, status) =>
        set((state) => ({
          nodeStatuses: {
            ...state.nodeStatuses,
            [roadmapId]: {
              ...(state.nodeStatuses[roadmapId] || {}),
              [nodeId]: status,
            },
          },
        })),

      setSubTopicStatus: (roadmapId, nodeId, subTopicIndex, isDone) =>
        set((state) => ({
          subTopicStatuses: {
            ...state.subTopicStatuses,
            [roadmapId]: {
              ...(state.subTopicStatuses[roadmapId] || {}),
              [nodeId]: {
                ...(state.subTopicStatuses[roadmapId]?.[nodeId] || {}),
                [subTopicIndex]: isDone,
              },
            },
          },
        })),

      setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),

      resetProgress: (roadmapId) =>
        set((state) => {
          const newNodeStatuses = { ...state.nodeStatuses };
          delete newNodeStatuses[roadmapId];
          const newSubTopicStatuses = { ...state.subTopicStatuses };
          delete newSubTopicStatuses[roadmapId];
          return { 
            nodeStatuses: newNodeStatuses,
            subTopicStatuses: newSubTopicStatuses
          };
        }),
    }),
    {
      name: 'portfolio-roadmap-progress',
    }
  )
);
