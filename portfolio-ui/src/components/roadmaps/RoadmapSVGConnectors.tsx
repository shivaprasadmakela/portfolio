import React from 'react';
import type { RoadmapNode, ConnectionType } from '../../types/roadmap';
import { NODE_WIDTH, NODE_HEIGHT, H_GAP, V_GAP, COLORS } from '../../constants/roadmapConstants';
import styles from '../../styles/Roadmap.module.css';

interface RoadmapSVGConnectorsProps {
  nodes: RoadmapNode[];
}

export const RoadmapSVGConnectors: React.FC<RoadmapSVGConnectorsProps> = ({ nodes }) => {
  const renderConnector = (node: RoadmapNode) => {
    if (!node.parentId) return null;

    const parent = nodes.find((n) => n.id === node.parentId);
    if (!parent) return null;

    // Convert level/column to pixel coordinates
    const getPos = (n: RoadmapNode) => ({
      x: n.column * (NODE_WIDTH + H_GAP),
      y: n.level * (NODE_HEIGHT + V_GAP),
    });

    const pPos = getPos(parent);
    const cPos = getPos(node);

    // Connection points
    const x1 = pPos.x + NODE_WIDTH / 2;
    const y1 = pPos.y + NODE_HEIGHT;
    const x2 = cPos.x + NODE_WIDTH / 2;
    const y2 = cPos.y;

    const type = node.connectionType || 'solid';
    const pathProps = {
      stroke: type === 'solid' || type === 'fork' ? COLORS.BRANCH_SOLID : COLORS.BRANCH_DASHED,
      strokeWidth: "2",
      fill: "none",
      strokeDasharray: type === 'dashed' ? '8,8' : '0',
      className: styles.svgPath,
      style: { filter: 'url(#glow)' }
    };

    if (type === 'solid' || (type === 'dashed' && x1 === x2)) {
      return (
        <path
          key={`path-${node.id}`}
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          {...pathProps}
        />
      );
    }

    if (type === 'dashed') {
      const midY = (y1 + y2) / 2;
      return (
        <path
          key={`path-${node.id}`}
          d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
          {...pathProps}
        />
      );
    }

    if (type === 'fork') {
      const forkY = y1 + V_GAP / 2;
      return (
        <path
          key={`path-${node.id}`}
          d={`M ${x1} ${y1} L ${x1} ${forkY} L ${x2} ${forkY} L ${x2} ${y2}`}
          {...pathProps}
        />
      );
    }

    return null;
  };

  return (
    <svg className={styles.svgLayer}>
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {nodes.map(renderConnector)}
    </svg>
  );
};

export default RoadmapSVGConnectors;
