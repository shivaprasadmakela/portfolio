import React, { useRef } from 'react';
import type { RoadmapNode as RoadmapNodeType } from '../../types/roadmap';
import { useRoadmapStore } from '../../store/useRoadmapStore';
import { useShallow } from 'zustand/react/shallow';
import RoadmapNode from './RoadmapNode';
import RoadmapConnectors from './RoadmapConnectors';
import styles from '../../styles/Roadmap.module.css';

interface RoadmapTreeProps {
  roadmapId: string;
  nodes: RoadmapNodeType[];
}

const EMPTY_STATUSES = {};

export default function RoadmapTree({ roadmapId, nodes }: RoadmapTreeProps) {
  const selectedNodeId = useRoadmapStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useRoadmapStore((state) => state.setSelectedNodeId);
  const nodeStatuses = useRoadmapStore(
    useShallow((state) => state.nodeStatuses[roadmapId] || EMPTY_STATUSES)
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  return (
    <div className={styles.roadmapGrid} ref={gridRef}>
      {/* Background SVG Connectors Layer */}
      <RoadmapConnectors 
        nodes={nodes} 
        nodeRefs={nodeRefs} 
        containerRef={gridRef} 
      />

      {/* Nodes Layer - placed via CSS Grid */}
      {nodes.map((node) => (
        <RoadmapNode
          key={node.id}
          ref={(el) => {
            if (el) nodeRefs.current.set(node.id, el);
            else nodeRefs.current.delete(node.id);
          }}
          node={node}
          status={nodeStatuses[node.id] || 'NOT_STARTED'}
          isSelected={selectedNodeId === node.id}
          onClick={setSelectedNodeId}
        />
      ))}
    </div>
  );
}
