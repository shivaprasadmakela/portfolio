import React, { forwardRef } from 'react';
import type { RoadmapNode as RoadmapNodeType, RoadmapStatus } from '../../types/roadmap';
import styles from '../../styles/Roadmap.module.css';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  status: RoadmapStatus;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export const RoadmapNode = forwardRef<HTMLDivElement, RoadmapNodeProps>(({ 
  node, 
  status: _status, 
  isSelected, 
  onClick 
}, ref) => {
  const nodeClass = `
    ${styles.node} 
    ${node.type === 'core' ? styles.nodeCore : styles.nodeSubTopic}
    ${isSelected ? styles.selected : ''}
    ${node.connectionType === 'vertical' ? styles.connectVertical : ''}
  `.trim();

  // CSS Grid uses 1-based indexing
  const gridStyle: React.CSSProperties = {
    gridRow: node.level + 1,
    gridColumn: node.column,
  };

  return (
    <div 
      ref={ref}
      className={nodeClass}
      style={gridStyle}
      onClick={() => onClick(node.id)}
    >
      <span>{node.title}</span>
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';

export default RoadmapNode;
