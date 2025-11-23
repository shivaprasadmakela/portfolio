import styles from '../../styles/home/Projects.module.css';
import { projects } from '../../data/projects';

export default function Projects() {
  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.heading}>All Creative Works.</h2>
      <p className={styles.subheading}>
        Here's some of my projects that I have worked on.<br />
        <a href="/projects" className={styles.exploreMore}>Explore more →</a>
      </p>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div className={styles.card} key={project.title}>
            <div className={styles.imageWrapper}>
              {/* Placeholder image if actual image is missing, or use the real one */}
              <div className={styles.imagePlaceholder}>
                <img src={project.image} alt={project.title} className={styles.image} />
              </div>

              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                <span aria-label="Open in new tab" role="img">🔗</span>
              </a>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>{tag}</span>
                ))}
              </div>
              <p className={styles.description}>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}