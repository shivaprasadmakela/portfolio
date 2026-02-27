import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import { useDSAProgress } from '../../hooks/useDSAProgress';
import { dsaRoadmap } from '../../data/dsaRoadmap';
import DSALevelSection from './DSALevelSection';
import styles from '../../styles/dsa/DSARoadmap.module.css';

export default function DSARoadmap() {
    const { getNote, updateNotes } = useDSAProgress();

    return (
        <div className={styles.page}>
            <Header />

            <section className={styles.hero}>

                <h1 className={styles.heroTitle}>
                    DSA <span style={{ color: 'var(--color-text-primary-green)' }}>Roadmap</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Master the patterns. Crack the interviews. Build the career you deserve.
                </p>
            </section>

            <main className={styles.container}>
                {dsaRoadmap.map(level => (
                    <DSALevelSection
                        key={level.id}
                        level={level}
                        getNote={getNote}
                        onNoteChange={updateNotes}
                    />
                ))}
            </main>

            <Footer />
        </div>
    );
}
