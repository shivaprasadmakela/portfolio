import { useEffect } from 'react';
import styles from './Resume.module.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaPrint, FaGlobe } from 'react-icons/fa';

export default function Resume() {
    useEffect(() => {
        document.title = 'Resume | Shiva Prasad Mekala';
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <main className={styles.resumePage}>
            {/* Action button to Print */}
            <div className={styles.actions}>
                <button className={styles.printBtn} onClick={handlePrint}>
                    <FaPrint /> Print / Download PDF
                </button>
            </div>

            {/* Header section of resume */}
            <header className={styles.headerSection}>
                <h1 className={styles.name}>SHIVA PRASAD MEKALA</h1>
                <div className={styles.title}>Software Development Engineer | React.js • TypeScript • Java Spring Boot</div>
                <div className={styles.links}>

                    <a href="mailto:shivamekala001@gmail.com">
                        <FaEnvelope /> shivamekala001@gmail.com
                    </a>
                    <a href="https://linkedin.com/in/shiva-prasad-m" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin /> LinkedIn
                    </a>
                    <a href="https://github.com/shivaprasadmakela" target="_blank" rel="noopener noreferrer">
                        <FaGithub /> GitHub
                    </a>
                    <a href="https://shivaprasadm.in" target="_blank" rel="noopener noreferrer">
                        <FaGlobe /> shivaprasadm.in
                    </a>
                </div>
            </header>

            {/* Summary section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Summary</h2>
                <p className={styles.summaryText}>
                    Software Development Engineer with 2+ years of experience building and owning end-to-end SaaS product features across frontend and backend. Skilled in React.js, TypeScript, Java Spring Boot, REST APIs, and multi-tenant architectures, with experience delivering production-ready CRM solutions.
                </p>
            </section>

            {/* Technical Skills section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Technical Skills</h2>
                <div className={styles.skillsGrid}>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Frontend:</span>
                        <span className={styles.skillList}>React.js (Hooks, Context API), TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS, Tailwind CSS, Redux Toolkit, React Query</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Backend:</span>
                        <span className={styles.skillList}>Java, Spring Boot, Spring WebFlux, REST APIs, Asynchronous Processing, Microservices</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Databases:</span>
                        <span className={styles.skillList}>MySQL, PostgreSQL, MongoDB</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Architecture & Concepts:</span>
                        <span className={styles.skillList}>Multi-Tenant SaaS Architecture, Authentication & Authorization, RBAC, Real-Time Systems, Server-Sent Events (SSE), Event-Driven Workflows, State Management, API Design, Workflow Automation</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Testing:</span>
                        <span className={styles.skillList}>Jest, React Testing Library, JUnit, Manual Testing, Edge-Case Handling</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Tools:</span>
                        <span className={styles.skillList}>Git, Maven, Postman, Jira</span>
                    </div>
                </div>
            </section>

            {/* Experience section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Experience</h2>

                {/* SDE I */}
                <div className={styles.experienceItem}>
                    <div className={styles.jobHeader}>
                        <span className={styles.companyRole}>
                            Modlix — <span className={styles.company}>Software Development Engineer I</span>
                        </span>
                        <span className={styles.dates}>Aug 2024 – Present</span>
                    </div>
                    <div className={styles.location}>Bengaluru, India</div>
                    <ul className={styles.bullets}>
                        <li>Owned end-to-end development and delivery of 10+ production-ready features across 5+ major CRM modules for <strong>Leadzump</strong>, a multi-tenant CRM platform built using React.js, TypeScript, Java Spring Boot, and REST APIs.</li>
                        <li>Built a complete <strong>User Management and Access Control Platform</strong> covering onboarding, invitations, lifecycle management, RBAC, user activation/deactivation, hierarchy handling, and multi-role access across Admin and Channel Partner ecosystems.</li>
                        <li>Built and delivered an end-to-end <strong>In-App Notification System</strong> including backend integration, notification workflows, and a reusable Server-Sent Events (SSE) listener component for real-time notification delivery across the platform.</li>
                        <li>Implemented <strong>WhatsApp Integrations</strong> and notification workflows across multiple CRM processes, improving communication automation and user engagement in production.</li>
                        <li>Developed authentication and access management workflows including login, signup, user invitations, session handling, and secure role-based access across multiple product modules.</li>
                        <li>Delivered end-to-end <strong>CP Mobile Application Flow</strong> including login, onboarding, configuration-driven experiences, and access control, supporting 1000+ production users across mobile and web platforms.</li>
                        <li>Developed backend services for <strong>LeadCollector</strong> using Java Spring Boot, building lead ingestion, validation, normalization, entity processing, and multi-source routing workflows for scalable lead management.</li>
                        <li>Coordinated and mentored 2–3 developers across multiple releases, ensuring smooth feature delivery, production stability, and avoidance of breaking changes.</li>
                        <li>Collaborated closely with Product, Design, and Backend teams to finalize requirements, improve features, and resolve 50+ production issues impacting user experience and platform stability.</li>
                    </ul>
                </div>

                {/* Intern */}
                <div className={styles.experienceItem}>
                    <div className={styles.jobHeader}>
                        <span className={styles.companyRole}>
                            Modlix — <span className={styles.company}>Software Developer Intern</span>
                        </span>
                        <span className={styles.dates}>Feb 2024 – Jul 2024</span>
                    </div>
                    <div className={styles.location}>Bengaluru, India</div>
                    <ul className={styles.bullets}>
                        <li>Contributed to CRM and workflow automation products using React.js and TypeScript.</li>
                        <li>Built reusable UI components, integrated REST APIs, and improved onboarding and workflow management experiences.</li>
                        <li>Resolved production issues, fixed UI defects, and improved stability of internal low-code editor components.</li>
                        <li>Collaborated with senior engineers in an Agile environment on feature development, testing, debugging, and deployment.</li>
                        <li>Converted to a full-time SDE role based on performance and contributions.</li>
                    </ul>
                </div>
            </section>

            {/* Projects section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Projects</h2>

                <div className={styles.projectItem}>
                    <div className={styles.projectHeader}>
                        <span className={styles.projectName}>AI-Powered Blogging Platform</span>
                        <div className={styles.projectLinks}>
                            <a href="https://shivaprasadm.in/blogs" target="_blank" rel="noopener noreferrer">Live</a>
                            <span>|</span>
                            <a href="https://github.com/shivaprasadmakela/portfolio/tree/main/portfolio-backend/src/main/java/com/portfolio_backend/controller/ai" target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                    <ul className={styles.bullets}>
                        <li>Built a full-stack AI-powered blogging platform using React.js, TypeScript, Spring Boot, and Google Gemini APIs.</li>
                        <li>Implemented Prompt Engineering, AI response cleaning, secure API proxying, and request rate limiting for reliable content generation.</li>
                    </ul>
                </div>

                <div className={styles.projectItem}>
                    <div className={styles.projectHeader}>
                        <span className={styles.projectName}>TalkNow — Real-time Chat Application</span>
                        <div className={styles.projectLinks}>
                            <a href="https://talknow.shivaprasadm.in/" target="_blank" rel="noopener noreferrer">Live</a>
                            <span>|</span>
                            <a href="https://github.com/shivaprasadmakela/chat-app.git" target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                    <ul className={styles.bullets}>
                        <li>Built a real-time chat application using React.js, Node.js, Express, and Socket.IO, supporting instant messaging, user presence, and bidirectional communication.</li>
                    </ul>
                </div>

                <div className={styles.projectItem}>
                    <div className={styles.projectHeader}>
                        <span className={styles.projectName}>Portfolio AI Chat Assistant</span>
                        <div className={styles.projectLinks}>
                            <a href="https://www.shivaprasadm.in/?chat=true" target="_blank" rel="noopener noreferrer">Live</a>
                            <span>|</span>
                            <a href="https://github.com/shivaprasadmakela/portfolio" target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                    <ul className={styles.bullets}>
                        <li>Built an AI-powered portfolio assistant using React.js, TypeScript, Spring Boot, Gemini, and OpenRouter, featuring dynamic profile-context injection, prompt engineering, multi-provider failover, circuit breaker protection, and API key rotation for reliable AI responses.</li>
                    </ul>
                </div>
            </section>

            {/* Education section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <div className={styles.eduHeader}>
                    <span className={styles.institution}>St. Mary’s Engineering College</span>
                    <span className={styles.dates}>Jul 2018 – Sept 2021</span>
                </div>
                <div className={styles.degree}>Bachelor of Technology — Electrical and Electronics Engineering</div>
                <div className={styles.location}>Hyderabad, Telangana</div>
            </section>
        </main>
    );
}
