import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import FadeInSection from '../../components/FadeInSection';
import { reactRoadmap } from '../../data/roadmaps/react-roadmap';
import styles from '../../styles/Roadmap.module.css';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

const roadmaps = [reactRoadmap];

export default function RoadmapDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.roadmapPage}>
      <Header />
      
      <main className={styles.container}>
        <FadeInSection>
          <header className={styles.hero}>
            <h1 className={styles.heroTitle}>
              Skill <span style={{ color: 'var(--color-text-primary-green)' }}>Roadmaps</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Interactive paths to master modern engineering. Track your progress, learn through videos, and understand where concepts are used in the real world.
            </p>
          </header>
        </FadeInSection>

        <section className={styles.roadmapGrid}>
          {roadmaps.map((roadmap, idx) => (
            <FadeInSection key={roadmap.id} delay={idx * 0.1}>
              <div 
                className={styles.roadmapCard}
                onClick={() => navigate(`/roadmaps/${roadmap.id}`)}
              >
                <div>
                  <div style={{ color: 'var(--color-text-primary-green)', marginBottom: '16px' }}>
                    <BookOpen size={32} />
                  </div>
                  <h2 className={styles.cardTitle}>{roadmap.title}</h2>
                  <p className={styles.cardDescription}>{roadmap.description}</p>
                </div>
                
                <div className={styles.cardFooter}>
                  <span className={styles.difficultyTag}>{roadmap.difficulty}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary-green)', fontWeight: '600' }}>
                    View Path <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
          
          <FadeInSection delay={0.2}>
            <div className={styles.roadmapCard} style={{ opacity: 0.6, cursor: 'not-allowed', borderStyle: 'dashed' }}>
              <div>
                <div style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                  <GraduationCap size={32} />
                </div>
                <h2 className={styles.cardTitle}>JavaScript Mastery</h2>
                <p className={styles.cardDescription}>Coming soon: Deep dive into ES6+, Async programming, and Engine internals.</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.difficultyTag} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)' }}>Advanced</span>
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>

      <Footer />
    </div>
  );
}
