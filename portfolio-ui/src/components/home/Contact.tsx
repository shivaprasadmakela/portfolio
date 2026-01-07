import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../../styles/home/Contact.module.css';
import success from '../../assets/SentMail.gif';
import { FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { Input, Button } from '../ui';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success');
          form.current?.reset();
        },
        (error) => {
          console.error(error);
          setStatus('error');
        }
      );
  };

  return (
    <section className={styles.contactSection}>
      <div>
        <h1 className={styles.title}>Keep In Touch.</h1>
        <p className={styles.subtitle}>
          I'm currently specializing in <span className={styles.highlight}>SDE -1</span>
          <br />
          Feel free to get in touch and talk more about your projects.
        </p>

        <div className={styles.buttonGroup}>
          <a href="https://linkedin.com/in/shiva-prasad-m" target="_blank" className={styles.button} rel="noreferrer">
            <FaLinkedin className={styles.icon} />
            LinkedIn
          </a>
          <a href="mailto:shivaprasadmekala@gmail.com" className={styles.button}>
            <FaEnvelope className={styles.icon} />
            Email
          </a>
          <a href="/resume.pdf" className={styles.button} download>
            <FaFileAlt className={styles.icon} />
            Resume
          </a>
        </div>
      </div>


      {status === 'success' ? (
        <img src={success} alt="Success" className={styles.successImage} />
      ) : (
        <div>
          <form className={styles.form} ref={form} onSubmit={sendEmail}>
            <Input type="text" name="name" placeholder="Your Name" required />
            <Input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" className={styles.textarea} required />
            <Button type="submit" className={styles.cbutton}>Send Message</Button>
          </form>
          {status === 'error' && <h4 style={{ color: 'red' }}>Something went wrong. Please try again!</h4>}
        </div>
      )}
    </section>
  );
}
