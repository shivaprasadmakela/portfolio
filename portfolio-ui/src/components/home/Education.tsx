import styles from '../../styles/home/Education.module.css';

const educationData = [
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Sabarmathi High School',
    years: '2014',
  },
  {
    degree: 'Diploma in Electrical and Electronics Engineering',
    institution: 'St. Mary’s Engineering College',
    years: '2014 - 2018',
  },
  {
    degree: 'Bachelor in Electrical and Electronics Engineering',
    institution: 'St. Mary’s Engineering College',
    years: '2018 - 2021',
  },
];

export default function Education() {
  return (
    <section className={styles.educationSection}>
      <h2 className={styles.heading}>All Things Education.</h2>
      <div className={styles.journeyLabel}>ACADEMIC JOURNEY</div>
      <div className={styles.timelineYears}>{educationData[0].years}</div>
      <div className={styles.timeline}>
        {educationData.map((edu, idx) => (
          <div className={styles.timelineItem} key={edu.degree}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.cap}>🎓</span>{' '}
              <h3 className={styles.degree}>{edu.degree}</h3>
              <div className={styles.institution}>{edu.institution}</div>
            </div>
            {idx < educationData.length - 1 && (
              <div className={styles.timelineConnector}>
                <div className={styles.connectorYears}>{educationData[idx + 1].years}</div>
                <div className={styles.connectorLine} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.bgText}>EDUCATION</div>
    </section>
  );
}
