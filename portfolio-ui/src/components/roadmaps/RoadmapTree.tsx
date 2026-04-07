import type { RoadmapNode } from '../../types/roadmap';
import { useRoadmapStore } from '../../store/useRoadmapStore';
import styles from '../../styles/Roadmap.module.css';
import { Check, Circle } from 'lucide-react';

interface RoadmapTreeProps {
  roadmapId: string;
  nodes: RoadmapNode[];
}

export default function RoadmapTree({ roadmapId, nodes }: RoadmapTreeProps) {
  const selectedNodeId = useRoadmapStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useRoadmapStore((state) => state.setSelectedNodeId);
  const nodeStatuses = useRoadmapStore((state) => state.nodeStatuses[roadmapId] || {});

  // Group nodes by their role in the tree
  const mainNodes = nodes.filter(n => n.type === 'core' || n.type === 'advanced');
  
  // Sort main nodes by their Y position to maintain the vertical order from data
  // or we can sort them based on our own logic.
  const sortedMainNodes = [...mainNodes].sort((a, b) => a.position.y - b.position.y);

  return (
    <div className={styles.treeContainer}>
      {/* Central Backbone Line */}
      <div className={styles.backboneLine} />

      <div className={styles.treeRows}>
        {sortedMainNodes.map((node) => {
          const status = nodeStatuses[node.id] || 'NOT_STARTED';
          const isSelected = selectedNodeId === node.id;

          // Find branches (sub-topics) for this main node
          const branches = nodes.filter(n => n.parentId === node.id);
          
          return (
            <div key={node.id} className={styles.treeRow}>
              {/* Main Checkpoint */}
              <div className={styles.checkpointWrapper}>
                <div 
                  className={`
                    ${styles.treeNode} 
                    ${isSelected ? styles.nodeSelected : ''} 
                    ${status === 'COMPLETED' ? styles.nodeCompleted : ''}
                    ${status === 'IN_PROGRESS' ? styles.nodeInProgress : ''}
                  `}
                  onClick={() => setSelectedNodeId(node.id)}
                >
                  <div className={styles.checkpointIcon}>
                    {status === 'COMPLETED' ? (
                      <Check size={14} strokeWidth={4} />
                    ) : (
                      <Circle size={10} fill="currentColor" opacity={0.3} />
                    )}
                  </div>
                  <div className={styles.nodeLabels}>
                    <span className={styles.nodeTitle}>{node.title}</span>
                    <span className={styles.nodeTypeBadge}>{node.type}</span>
                  </div>
                </div>

                {/* Branches for this node */}
                {branches.length > 0 && (
                  <div className={styles.branchesContainer}>
                    {branches.map((branch) => {
                      const bStatus = nodeStatuses[branch.id] || 'NOT_STARTED';
                      const bIsSelected = selectedNodeId === branch.id;
                      
                      return (
                        <div key={branch.id} className={styles.branchWrapper}>
                          <div className={styles.branchConnector} />
                          <div 
                            className={`
                              ${styles.treeNode} 
                              ${styles.branchBox}
                              ${bIsSelected ? styles.nodeSelected : ''} 
                              ${bStatus === 'COMPLETED' ? styles.nodeCompleted : ''}
                              ${bStatus === 'IN_PROGRESS' ? styles.nodeInProgress : ''}
                            `}
                            onClick={() => setSelectedNodeId(branch.id)}
                          >
                            <span>{branch.title}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
