import styles from '../../styles/home/Projects.module.css';

const projects = [
  // {
  //   title: 'Opiniometer',
  //   image: '/images/opiniometer.png',
  //   description: 'A web app to analyze whether an opinion on specific topic is positive or negative based on recent tweets using Natural Language Processing concept called Sentiment Analysis.',
  //   tags: ['React', 'Python', 'Chart.js'],
  //   link: 'https://opiniometer.example.com',
  // },
  // {
  //   title: 'creative@home',
  //   image: '/images/creativehome.png',
  //   description: 'A website that provides roadmap for various fields in Programming and help people learn to code for free.',
  //   tags: ['Javascript', 'Sass'],
  //   link: 'https://creativehome.example.com',
  // },
  // {
  //   title: 'Prayer Time API',
  //   image: '/images/prayertime.png',
  //   description: "It's an easy to use API to get today's (and tomorrow!) prayer time in any city in the world, based on Muslim Pro.",
  //   tags: ['Python', 'Flask', 'Beautiful Soup'],
  //   link: 'https://prayertimeapi.example.com',
  // },
];

export default function Projects() {
  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.heading}>All Creative Works.</h2>
      <p className={styles.subheading}>
        Here's some of my projects that I have worked on.<br />
        <a href="/projects" className={styles.exploreMore}>Explore more →</a>
      </p>
      {/* <div className={styles.grid}>
        {projects.map((project) => (
          <div className={styles.card} key={project.title}>
            <div className={styles.imageWrapper}>
              <img src={project.image} alt={project.title} className={styles.image} />
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
      </div> */}
    </section>
  );
}