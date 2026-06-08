import { useEffect } from 'react';
import styles from './Resume.module.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaPrint } from 'react-icons/fa';

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
                <h1 className={styles.name}>Shiva Prasad Mekala</h1>
                <div className={styles.title}>Software Engineer | React • TypeScript • Java</div>
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
                </div>
            </header>

            {/* Summary section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Summary</h2>
                <p className={styles.summaryText}>
                    Software Engineer with ~2 years of experience building scalable SaaS platforms and dynamic dashboards using React.js, TypeScript, and Java Spring Boot. Experienced in designing schema-driven UI systems, optimizing frontend performance, and developing data-driven applications handling 200+ daily events and 200K+ records.
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
                        <span className={styles.skillCategory}>Frontend Optimization:</span>
                        <span className={styles.skillList}>Memoization, Lazy Loading, Rendering Optimization</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Backend:</span>
                        <span className={styles.skillList}>Java, Spring Boot, Spring WebFlux, REST APIs, Asynchronous Processing</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Databases:</span>
                        <span className={styles.skillList}>PostgreSQL, MySQL, MongoDB</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Testing:</span>
                        <span className={styles.skillList}>Jest, React Testing Library, JUnit</span>
                    </div>
                    <div className={styles.skillsRow}>
                        <span className={styles.skillCategory}>Tools:</span>
                        <span className={styles.skillList}>Git, VS Code, IntelliJ IDEA, Postman, Maven</span>
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
                        <li>Built and scaled a multi-tenant CRM platform with dynamic dashboards handling <strong>200+ daily leads and 200K+ total records</strong>.</li>
                        <li>Designed a scalable <strong>schema-driven UI architecture</strong> in React + TypeScript to power dynamic dashboards and workflow-driven interfaces.</li>
                        <li>Integrated React frontend with backend APIs to enable <strong>real-time data-driven UI updates</strong> and seamless workflow execution.</li>
                        <li>Optimized frontend performance by improving rendering efficiency and reducing unnecessary re-renders in data-heavy views.</li>
                        <li>Implemented scalable <strong>state management patterns</strong> using React Query and Context API for efficient data handling.</li>
                        <li>Developed reusable and modular UI components to ensure consistency and faster feature development.</li>
                        <li>Led a team of <strong>3 developers</strong>, contributing to frontend architecture decisions and ensuring high-quality feature delivery.</li>
                    </ul>

                    {/* Lead Collector Section */}
                    <div className={styles.subSection}>
                        <h4 className={styles.subSectionTitle}>Lead Collector Service (Backend)</h4>
                        <ul className={styles.bullets}>
                            <li>Built a lead ingestion system using <strong>Java Spring Boot</strong> to process data from ads, forms, and APIs.</li>
                            <li>Implemented pipelines for <strong>data validation, normalization, and routing</strong> across multiple client accounts.</li>
                        </ul>
                    </div>

                    {/* Workflow Engine Section */}
                    <div className={styles.subSection}>
                        <h4 className={styles.subSectionTitle}>Workflow Engine Platform (Low-Code System)</h4>
                        <ul className={styles.bullets}>
                            <li>Developed reusable execution blocks using <strong>TypeScript and Java</strong> for conditional logic and transformations.</li>
                            <li>Improved schema quality and increased test coverage using <strong>Jest and JUnit</strong>.</li>
                        </ul>
                    </div>
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
                        <li>Fixed UI issues and improved stability of internal low-code editor components.</li>
                        <li>Built reusable editor components including dynamic text rendering features.</li>
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
                            <a href="https://www.shivaprasadm.in" target="_blank" rel="noopener noreferrer">Live</a>
                            <span>|</span>
                            <a href="https://github.com/shivaprasadmakela" target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                    <ul className={styles.bullets}>
                        <li>Built a scalable frontend using <strong>React + TypeScript</strong> with optimized API interactions and structured state handling.</li>
                        <li>Integrated <strong>Google Gemini APIs</strong> with structured prompt engineering for AI-generated content.</li>
                        <li>Implemented response cleaning, rate limiting, and secure API proxying.</li>
                        <li>Designed reusable UI components to improve consistency and development speed.</li>
                    </ul>
                </div>

                <div className={styles.projectItem}>
                    <div className={styles.projectHeader}>
                        <span className={styles.projectName}>Portfolio Website</span>
                        <div className={styles.projectLinks}>
                            <a href="https://www.shivaprasadm.in" target="_blank" rel="noopener noreferrer">Live</a>
                            <span>|</span>
                            <a href="https://github.com/shivaprasadmakela" target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                    <ul className={styles.bullets}>
                        <li>Built a responsive portfolio using <strong>React, TypeScript, and Tailwind CSS</strong>.</li>
                    </ul>
                </div>

                <div className={styles.projectItem}>
                    <div className={styles.projectHeader}>
                        <span className={styles.projectName}>TalkNow — Real-time Chat Application</span>
                        <div className={styles.projectLinks}>
                            <a href="https://www.shivaprasadm.in" target="_blank" rel="noopener noreferrer">Live</a>
                            <span>|</span>
                            <a href="https://github.com/shivaprasadmakela" target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                    <ul className={styles.bullets}>
                        <li>Built a real-time chat system using <strong>React.js, Node.js, Express, and Socket.IO</strong>.</li>
                    </ul>
                </div>
            </section>

            {/* Education section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <div className={styles.eduHeader}>
                    <span className={styles.institution}>St. Mary's Engineering College</span>
                    <span className={styles.dates}>Jul 2018 – Sept 2021</span>
                </div>
                <div className={styles.degree}>Bachelor of Technology — Electrical and Electronics Engineering</div>
                <div className={styles.location}>Hyderabad, Telangana</div>
            </section>
        </main>
    );
}
