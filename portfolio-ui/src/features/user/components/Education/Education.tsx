import styles from './Education.module.css';

const educationData = [
  {
    degree: 'Secondary Schooling (SSC)',
    institution: 'Planet High School',
    years: '2010 - 2014',
  },
  {
    degree: 'High School Diploma (Electrical & Electronics Engineering)',
    institution: 'St. Mary’s Engineering College',
    years: '2014 - 2018',
  },
  {
    degree: 'Bachelor of Technology (BTech) in EEE',
    institution: 'St. Mary’s Engineering College',
    years: '2018 - 2021',
  },
  {
    degree: 'CCBP 4.0 Intensive (Full Stack Development)',
    institution: 'NxtWave',
    years: '2022 - 2023',
    description: 'Specialized in Full Stack Web Development (JavaScript, Databases, React, Node.js)',
  },
];

export default function Education({ isPopup = false }: { isPopup?: boolean }) {
  const content = (
    <>
      {!isPopup && <h2 className={styles.heading}>All Things Education.</h2>}
      {!isPopup && <div className={styles.journeyLabel}>ACADEMIC JOURNEY</div>}
      <div className={styles.timelineYears}>{educationData[0].years}</div>
      <div className={styles.timeline}>
        {educationData.map((edu, idx) => (
          <div className={styles.timelineItem} key={edu.degree}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.cap}>🎓</span>{' '}
              <h3 className={styles.degree}>{edu.degree}</h3>
              <div className={styles.institution}>{edu.institution}</div>
              {edu.description && <div className={styles.description}>{edu.description}</div>}
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
      {!isPopup && <div className={styles.bgText}>EDUCATION</div>}
    </>
  );

  if (isPopup) {
    return <div className={styles.popupContent}>{content}</div>;
  }

  return (
    <section className={styles.educationSection}>
      {content}
    </section>
  );
}
