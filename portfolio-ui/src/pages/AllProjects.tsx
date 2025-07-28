import Header from '../components/home/Header';
import styles from '../styles/AllProjects.module.css';
// import { FaExternalLinkAlt } from 'react-icons/fa';

// type Project = {
//   title: string;
//   description: string;
//   image: string;
//   tech: string[];
//   link: string;
// };

// const projects: Project[] = [
//   {
//     title: 'Spherix Marketing Website',
//     description:
//       'A marketing website made for Spherix, built while I was working with Apex Technologies.',
//     image: '/images/spherix.png', // Update this path
//     tech: ['Astro', 'Spline'],
//     link: '#',
//   },
//   {
//     title: 'GGL Fitness App',
//     description:
//       'Fitness app packed with features like calorie counter, workouts, and measurement journal to help users achieve their fitness goals.',
//     image: '/images/ggl.png', // Update this path
//     tech: ['Next.js', 'Chakra UI'],
//     link: '#',
//   },
// ];

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

      {/* <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.title} className={styles.card}>
            <img src={project.image} alt={project.title} className={styles.image} />

            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h2>{project.title}</h2>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className={styles.icon} />
                </a>
              </div>

              <div className={styles.techStack}>
                {project.tech.map((tech) => (
                  <span key={tech} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>

              <p className={styles.description}>{project.description}</p>
            </div>
          </div>
        ))}
      </div> */}

      <h1>Coming Soon</h1>
    </section>
    </>
  );
}
