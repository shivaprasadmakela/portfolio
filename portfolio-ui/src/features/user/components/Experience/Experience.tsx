import styles from './Experience.module.css';

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
            title: 'Software Development Engineer I (SDE I)',
            type: 'Full-time',
            duration: 'Aug 2024 - Present · 1 yr 11 mos',
            deliverables: [
                "Owned end-to-end development and delivery of 10+ production-ready features across 5+ major CRM modules for Leadzump, a multi-tenant CRM platform built using React.js, TypeScript, Java Spring Boot, and REST APIs.",
                "Built a complete User Management and Access Control Platform covering onboarding, invitations, lifecycle management, RBAC, user activation/deactivation, hierarchy handling, and multi-role access across Admin and Channel Partner ecosystems.",
                "Built and delivered an end-to-end In-App Notification System including backend integration, notification workflows, and a reusable Server-Sent Events (SSE) listener component for real-time notification delivery across the platform.",
                "Implemented WhatsApp Integrations and notification workflows across multiple CRM processes, improving communication automation and user engagement in production.",
                "Developed authentication and access management workflows including login, signup, user invitations, session handling, and secure role-based access across multiple product modules.",
                "Delivered end-to-end CP Mobile Application Flow including login, onboarding, configuration-driven experiences, and access control, supporting 1000+ production users across mobile and web platforms.",
                "Developed backend services for LeadCollector using Java Spring Boot, building lead ingestion, validation, normalization, entity processing, and multi-source routing workflows for scalable lead management.",
                "Coordinated and mentored 2–3 developers across multiple releases, ensuring smooth feature delivery, production stability, and avoidance of breaking changes.",
                "Collaborated closely with Product, Design, and Backend teams to finalize requirements, improve features, and resolve 50+ production issues impacting user experience and platform stability."
            ]
        },
        {
            title: 'Software Developer Intern',
            type: 'Internship',
            duration: 'Feb 2024 - Jul 2024 · 6 mos',
            deliverables: [
                "Contributed to CRM and workflow automation products using React.js and TypeScript.",
                "Built reusable UI components, integrated REST APIs, and improved onboarding and workflow management experiences.",
                "Resolved production issues, fixed UI defects, and improved stability of internal low-code editor components.",
                "Collaborated with senior engineers in an Agile environment on feature development, testing, debugging, and deployment.",
                "Converted to a full-time SDE role based on performance and contributions."
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
