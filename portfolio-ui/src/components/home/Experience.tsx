
import styles from '../../styles/home/Experience.module.css';

const experienceData = {
    company: 'Modlix',
    totalDuration: '2 yrs',
    location: 'Bengaluru, Karnataka, India',
    roles: [
        {
            title: 'SDE',
            type: 'Full-time',
            duration: 'Aug 2024 - Present · 1 yr 6 mos',
        },
        {
            title: 'Intern',
            type: 'Internship',
            duration: 'Feb 2024 - Jul 2024 · 6 mos',
        }
    ]
};

export default function Experience() {

    return (
        <section className={styles.experienceSection}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Experience</h2>

                </div>

                <div className={styles.experienceList}>
                    <div className={styles.experienceItem}>
                        <div className={styles.companyLogo}>
                            <svg className={styles.logoImage} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div className={styles.itemContent}>
                            <h3 className={styles.companyName}>{experienceData.company}</h3>
                            <div className={styles.totalDuration}>{experienceData.totalDuration}</div>
                            <div className={styles.location}>{experienceData.location}</div>

                            <div className={styles.roles}>
                                {experienceData.roles.map((role, index) => (
                                    <div key={index} className={styles.roleItem}>
                                        <div className={styles.roleDot} />
                                        <h4 className={styles.roleTitle}>{role.title}</h4>
                                        <div className={styles.employmentType}>{role.type}</div>
                                        <div className={styles.roleDuration}>{role.duration}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
