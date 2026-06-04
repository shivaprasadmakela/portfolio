
import styles from '../../styles/home/Experience.module.css';

interface Role {
    title: string;
    type: string;
    duration: string;
    deliverables: string[];
}

interface ExperienceData {
    company: string;
    totalDuration: string;
    location: string;
    roles: Role[];
}

const experienceData: ExperienceData = {
    company: 'Modlix',
    totalDuration: '2 yrs 5 mos',
    location: 'Bengaluru, Karnataka, India',
    roles: [
        {
            title: 'Software Development Engineer (SDE)',
            type: 'Full-time',
            duration: 'Aug 2024 - Present · 1 yr 11 mos',
            deliverables: [
                "Led end-to-end development for user management features across Admin and Channel Partner (CP) flows, enabling smooth user onboarding, access handling, and workflows in production.",
                "Built complete CP mobile application flow (login, onboarding, configuration-based flows, and access management) that is live in production.",
                "Worked end-to-end on WhatsApp integrations and notification flows across the platform, improving communication workflows.",
                "Developed authentication-related flows including signup, login, and user invite handling.",
                "Contributed heavily to Java Spring Boot backend services (LeadCollector / Entity Processor) for capturing leads from multiple sources.",
                "Led and coordinated a team of 2–3 developers to ensure feature delivery and maintain platform stability.",
                "Worked on Meta JSON tagging, CP workflows hierarchy fixes, multi-manager support, and resolved production/UI bugs."
            ]
        },
        {
            title: 'Software Engineer Intern',
            type: 'Internship',
            duration: 'Feb 2024 - Jul 2024 · 6 mos',
            deliverables: [
                "Developed and enhanced frontend UI features using React and CSS.",
                "Assisted in debugging and fixing production-level issues across platforms.",
                "Gained hands-on experience in Java Spring Boot and API-driven development flows."
            ]
        }
    ]
};

export default function Experience() {

    return (
        <section className={styles.experienceSection}>
            <div className={styles.card}>

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
                                        <ul className={styles.deliverablesList}>
                                            {role.deliverables.map((bullet, idx) => (
                                                <li key={idx} className={styles.deliverableItem}>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
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

