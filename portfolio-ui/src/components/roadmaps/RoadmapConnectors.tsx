import React, { useLayoutEffect, useState, useCallback } from 'react';
import type { RoadmapNode, ConnectionType } from '../../types/roadmap';
import styles from '../../styles/Roadmap.module.css';

interface RoadmapConnectorsProps {
  nodes: RoadmapNode[];
  nodeRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Point {
  x: number;
  y: number;
}

export const RoadmapConnectors: React.FC<RoadmapConnectorsProps> = ({ 
  nodes, 
  nodeRefs, 
  containerRef 
}) => {
  const [coords, setCoords] = useState<Record<string, Point>>({});

  const updateCoords = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCoords: Record<string, Point> = {};
    let hasChanged = false;

    nodes.forEach((node) => {
      const el = nodeRefs.current.get(node.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const nextPoint = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
        
        const prevPoint = coords[node.id];
        if (!prevPoint || prevPoint.x !== nextPoint.x || prevPoint.y !== nextPoint.y) {
          hasChanged = true;
        }
        newCoords[node.id] = nextPoint;
      }
    });

    if (hasChanged) {
      setCoords(newCoords);
    }
  }, [nodes, containerRef, nodeRefs, coords]);

  useLayoutEffect(() => {
    // Initial measurement
    updateCoords();
    
    // Double-pass: measure again after a frame to catch layout shifts
    const rafId = requestAnimationFrame(() => updateCoords());

    // Re-measure on resize or window change
    const resizeObserver = new ResizeObserver(() => {
      updateCoords();
      requestAnimationFrame(() => updateCoords());
    });
    
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    
    window.addEventListener('resize', updateCoords);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCoords);
    };
  }, [updateCoords, containerRef]);

  const renderPath = (node: RoadmapNode) => {
    if (!node.parentId || !node.connectionType) return null;
    if (node.connectionType === 'vertical') return null; // Handled by CSS

    const start = coords[node.parentId];
    const end = coords[node.id];
    if (!start || !end) return null;

    const parentEl = nodeRefs.current.get(node.parentId);
    const nodeEl = nodeRefs.current.get(node.id);
    if (!parentEl || !nodeEl) return null;

    // Start at bottom center of parent
    const x1 = start.x;
    const y1 = start.y + parentEl.offsetHeight / 2;
    // End at top center of child
    const x2 = end.x;
    const y2 = end.y - nodeEl.offsetHeight / 2;

    if (node.connectionType === 'curve-left' || node.connectionType === 'curve-right') {
      const midY = (y1 + y2) / 2;
      return (
        <path
          key={`path-${node.id}`}
          d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
          stroke="var(--color-text-primary-green)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6,6"
          className={styles.svgPath}
        />
      );
    }

    if (node.connectionType === 'fork-2') {
      const forkY = y1 + 30; // 30px down from parent before split
      return (
        <path
          key={`path-${node.id}`}
          d={`M ${x1} ${y1} L ${x1} ${forkY} L ${x2} ${forkY} L ${x2} ${y2}`}
          stroke="var(--color-text-primary-green)"
          strokeWidth="2"
          fill="none"
          className={styles.svgPath}
        />
      );
    }

    return null;
  };

  return (
    <svg className={styles.svgLayer}>
      {nodes.map(renderPath)}
    </svg>
  );
};

export default RoadmapConnectors;
