import type { RoadmapNode, RoadmapStatus } from '../../types/roadmap';
import { useRoadmapStore } from '../../store/useRoadmapStore';
import styles from '../../styles/Roadmap.module.css';
import { CheckCircle2, Play, ExternalLink, X, ListTodo, Circle } from 'lucide-react';

interface NodeDetailPanelProps {
  roadmapId: string;
  node: RoadmapNode;
}

export default function NodeDetailPanel({ roadmapId, node }: NodeDetailPanelProps) {
  const setSelectedNodeId = useRoadmapStore((state) => state.setSelectedNodeId);
  const { nodeStatuses, setNodeStatus, subTopicStatuses, setSubTopicStatus } = useRoadmapStore();
  
  const status = nodeStatuses[roadmapId]?.[node.id] || 'NOT_STARTED';
  const nodeSubTopicStatus = subTopicStatuses[roadmapId]?.[node.id] || {};

  const onSetStatus = (newStatus: RoadmapStatus) => {
    setNodeStatus(roadmapId, node.id, status === newStatus ? 'NOT_STARTED' : newStatus);
  };

  const toggleSubTopic = (index: number) => {
    setSubTopicStatus(roadmapId, node.id, index, !nodeSubTopicStatus[index]);
  };

  // Calculate Sub-topic completion percentage
  const subTopicsCount = node.content?.subTopics?.length || 0;
  const completedSubTopicsCount = Object.values(nodeSubTopicStatus).filter(Boolean).length;
  const completionPercentage = subTopicsCount > 0 ? Math.round((completedSubTopicsCount / subTopicsCount) * 100) : 0;

  return (
    <div className={styles.sidePanel}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className={styles.difficultyTag} style={{ fontSize: '10px' }}>{node.type}</span>
                {node.parentId && <span className={styles.difficultyTag} style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)' }}>Child Node</span>}
           </div>
           <h2 className={styles.panelTitle}>{node.title}</h2>
        </div>
        <button onClick={() => setSelectedNodeId(null)} className={styles.backButton} style={{ position: 'static', padding: '8px' }}>
          <X size={20} />
        </button>
      </div>

      {node.content?.videoUrl && (
        <div className={styles.videoWrapper}>
          <iframe
            src={node.content.videoUrl}
            title={`${node.title} Learning Video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div>
        <span className={styles.sectionTitle}>Explanation</span>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          {node.content?.explanation}
        </p>
      </div>

      {/* Sub-Topics Checklist */}
      {subTopicsCount > 0 && (
        <div className={styles.subTopicsSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className={styles.sectionTitle} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ListTodo size={16} /> Sub-topics Mastery
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-text-primary-green)', fontWeight: '600' }}>
                    {completionPercentage}% Done
                </span>
            </div>
            
            <div className={styles.checklist}>
                {node.content?.subTopics?.map((topic, index) => (
                    <div 
                        key={index} 
                        className={`${styles.checklistItem} ${nodeSubTopicStatus[index] ? styles.checklistItemDone : ''}`}
                        onClick={() => toggleSubTopic(index)}
                    >
                        {nodeSubTopicStatus[index] ? (
                            <CheckCircle2 size={16} color="var(--color-text-primary-green)" />
                        ) : (
                            <Circle size={16} color="rgba(255,255,255,0.2)" />
                        )}
                        <span>{topic}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {node.content?.realWorldUsage && (
        <div>
          <span className={styles.sectionTitle}>Real World Usage</span>
          <div style={{ background: 'rgba(60, 207, 145, 0.05)', border: '1px solid rgba(60, 207, 145, 0.2)', padding: '15px', borderRadius: '12px' }}>
            <p style={{ margin: 0, color: 'var(--color-text-primary-green)' }}>
              {node.content.realWorldUsage}
            </p>
          </div>
        </div>
      )}

      {node.content?.resources && node.content.resources.length > 0 && (
        <div>
          <span className={styles.sectionTitle}>Further Reading</span>
          {node.content.resources.map((res, i) => (
            <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{res.label}</span>
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <span className={styles.sectionTitle}>Overall Progress</span>
        <div className={styles.statusControls}>
          <button 
            className={`${styles.statusBtn} ${status === 'IN_PROGRESS' ? styles.statusBtnActive : ''}`}
            onClick={() => onSetStatus('IN_PROGRESS')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Play size={16} fill={status === 'IN_PROGRESS' ? '#000' : 'none'} />
              Learning
            </div>
          </button>
          <button 
            className={`${styles.statusBtn} ${status === 'COMPLETED' ? styles.statusBtnActive : ''}`}
            onClick={() => onSetStatus('COMPLETED')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} fill={status === 'COMPLETED' ? '#000' : 'none'} />
              Completed
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
