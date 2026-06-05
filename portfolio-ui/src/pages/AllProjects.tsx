import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import Header from '../components/home/Header';
import styles from '../styles/AllProjects.module.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Input } from '../components/ui';
import { FiSearch } from 'react-icons/fi';
import Footer from '../components/home/Footer';
import FadeInSection from '../components/FadeInSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const
    }
  }
};

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <Header />
      <section className={styles.projects}>
        <FadeInSection>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            I love building projects and practicing my engineering skills, here's an archive of things that I've worked on.
          </p>
        </FadeInSection>

        <Input
          type="text"
          className={styles.search}
          placeholder="Search projects"
          icon={<FiSearch />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className={styles.card}
            >
              <img src={project.image} alt={project.title} className={styles.image} loading="lazy" />

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h2>{project.title}</h2>
                  <div className={styles.headerLinks}>
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

                <div className={styles.techStack}>
                  {project.tags.map((tech) => (
                    <span key={tech} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <p className={styles.description}>{project.description}</p>
              </div>
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>
              No projects found matching "{searchQuery}"
            </p>
          )}
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
