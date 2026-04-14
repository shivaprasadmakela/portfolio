import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reactRoadmap } from '../../data/roadmaps/react-roadmap';
import { frontendRoadmap } from '../../data/roadmaps/frontend-roadmap';
import RoadmapTree from '../../components/roadmaps/RoadmapTree';
import NodeDetailPanel from '../../components/roadmaps/NodeDetailPanel';
import { useRoadmapStore } from '../../store/useRoadmapStore';
import styles from '../../styles/Roadmap.module.css';
import { ArrowLeft, Share2, MoreHorizontal } from 'lucide-react';

const roadmaps = {
  [reactRoadmap.id]: reactRoadmap,
  [frontendRoadmap.id]: frontendRoadmap,
};

export default function RoadmapDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedNodeId = useRoadmapStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useRoadmapStore((state) => state.setSelectedNodeId);

  const roadmap = id ? roadmaps[id] : null;

  useEffect(() => {
    // Reset selection when entering a new roadmap, but only if not already null
    if (selectedNodeId !== null) {
      setSelectedNodeId(null);
    }
  }, [id, setSelectedNodeId, selectedNodeId]);

  const selectedNode = useMemo(() => {
    if (!roadmap || !selectedNodeId) return null;
    return roadmap.nodes.find((n) => n.id === selectedNodeId);
  }, [roadmap, selectedNodeId]);

  if (!roadmap) {
    return (
      <div className={styles.roadmapPage}>
        <div className={styles.container}>
          <h1>Roadmap not found</h1>
          <button className={styles.backButton} onClick={() => navigate('/roadmaps')}>
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <div className={styles.graphContainer}>
        <button className={styles.backButton} onClick={() => navigate('/roadmaps')}>
          <ArrowLeft size={20} /> Dashboard
        </button>
        
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '10px' }}>
             <button className={styles.backButton} style={{ position: 'static' }}>
                <Share2 size={18} />
             </button>
             <button className={styles.backButton} style={{ position: 'static' }}>
                <MoreHorizontal size={18} />
             </button>
        </div>

        <RoadmapTree 
          roadmapId={roadmap.id}
          nodes={roadmap.nodes}
        />
      </div>

      {selectedNode && (
        <NodeDetailPanel 
          roadmapId={roadmap.id}
          node={selectedNode}
        />
      )}
      
      {!selectedNode && (
        <div className={styles.sidePanel} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ padding: '40px', opacity: 0.7 }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--color-text-primary)' }}>Select a topic to start</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  Click on any topic in the roadmap to see detailed explanations, videos, and real-world usage examples.
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
