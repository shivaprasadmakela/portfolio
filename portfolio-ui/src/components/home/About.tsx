import { useState } from 'react';
import styles from '../../styles/home/About.module.css';
import profileImage from '../../assets/profile.png';
import pattern from '../../assets/dot-pattern.svg';
import { Modal } from '../ui';
import Experience from './Experience';
import Education from './Education';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

export default function About() {
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  return (
    <section className={styles.about}>
      <div className={styles.text}>
        <h2 className={styles.aboutText}>⚡ <span>About Me</span></h2>
        <p>
          Hey! I'm <span className={styles.highlight}>Shiva Prasad</span> — my passion for computers began during my engineering days,
          and it's only grown stronger since then.
        </p>
        <div className={styles.selfDescription}>
          <p>
            I loved building things from scratch and solving creative problems through code. That curiosity led me to explore
            programming on my own, and today I work across various languages and technologies to build scalable and impactful systems.
          </p>
          <p>
            I'm deeply interested in creating impactful products, automating workflows, and writing clean, efficient code. Currently, my focus is on
            <span className={styles.green}> Web & Backend Development</span>,
            <span className={styles.green}> Open Source Contributions</span>, and
            <span className={styles.green}> Competitive Programming</span>.
          </p>
          <p>
            Outside of coding, I run a <span className={styles.highlight}>YouTube channel with 10K+ subscribers</span> where I share content
            on tech, development tips, and creative topics I enjoy.
          </p>
        </div>
        <p>
          When I'm not in front of a screen, you might find me brainstorming new content ideas, gaming with friends, or enjoying some time outdoors. 😊
        </p>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.profileWrapper}>
          <img src={profileImage} alt="Profile" className={styles.profile} loading="lazy" />
          <img src={pattern} className={styles.pattern} alt="" loading="lazy" />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.infoButton} onClick={() => setIsExperienceOpen(true)}>
            <FaBriefcase className={styles.btnIcon} />
            Experience
          </button>
          <button className={styles.infoButton} onClick={() => setIsEducationOpen(true)}>
            <FaGraduationCap className={styles.btnIcon} />
            Education
          </button>
        </div>
      </div>

      <Modal
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
        title="Experience"
      >
        <Experience />
      </Modal>

      <Modal
        isOpen={isEducationOpen}
        onClose={() => setIsEducationOpen(false)}
        title="Academic Journey"
      >
        <Education isPopup />
      </Modal>
    </section>
  );
}
