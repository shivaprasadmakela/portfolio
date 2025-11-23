import { projects } from '../data/projects';
import Header from '../components/home/Header';
import styles from '../styles/AllProjects.module.css';

export default function Projects() {
  return (
    <>
      <Header />
      <section className={styles.projects}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          I love building projects and practicing my engineering skills, here's an archive of things that I've worked on.
        </p>

        <input
          type="text"
          className={styles.search}
          placeholder="Search projects"
        />

        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.title} className={styles.card}>
              <img src={project.image} alt={project.title} className={styles.image} />

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h2>{project.title}</h2>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <span aria-label="Open in new tab" role="img">🔗</span>
                  </a>
                </div>

                <div className={styles.techStack}>
                  {project.tags.map((tech) => (
                    <span key={tech} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <p className={styles.description}>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
