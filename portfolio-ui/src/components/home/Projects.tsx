import styles from '../../styles/home/Projects.module.css';
import { projects } from '../../data/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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
              <div className={styles.imagePlaceholder}>
                <img src={project.image} alt={project.title} className={styles.image} />
              </div>

              <div className={styles.linksOverlay}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="View Source">
                    <FaGithub />
                  </a>
                )}
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="Live Demo">
                  <FaExternalLinkAlt />
                </a>
              </div>
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