/* src/features/challenge/components/CheckInCard.tsx */
import React, { useState, useEffect } from 'react';
import styles from './Challenge.module.css';
import { getISTTimeDisplay, isSubmissionWindowActive } from '../utils/timeUtils';
import { generateQuestion, validateAnswer } from '../utils/verificationUtils';
import type { VerificationQuestion } from '../utils/verificationUtils';
import { processCheckIn } from '../utils/streakUtils';

export const CheckInCard: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [currentTime, setCurrentTime] = useState(getISTTimeDisplay());
    const [windowStatus, setWindowStatus] = useState(isSubmissionWindowActive());
    const [formData, setFormData] = useState({ name: '', email: '', answer: '' });
    const [question, setQuestion] = useState<VerificationQuestion | null>(null);
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getISTTimeDisplay());
            setWindowStatus(isSubmissionWindowActive());
        }, 1000);

        setQuestion(generateQuestion());

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStatusMessage('');

        if (!windowStatus.active) {
            setError(windowStatus.reason || 'Submission window is closed.');
            return;
        }

        if (!question || !validateAnswer(formData.answer, question.correctAnswer)) {
            setError('Verification failed. Please try again.');
            setQuestion(generateQuestion());
            setFormData(prev => ({ ...prev, answer: '' }));
            return;
        }

        const { success, message } = processCheckIn(formData.email, formData.name);

        if (success) {
            setStatusMessage(message);
            setFormData({ name: '', email: '', answer: '' });
            setQuestion(generateQuestion());
            onSuccess();
        } else {
            setError(message);
        }
    };

    return (
        <div className={styles.card} id="check-in-section">
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Daily Wake-Up Check-In</h2>
                <div className={styles.liveClock}>{currentTime}</div>
            </div>

            {!windowStatus.active ? (
                <div className={styles.windowClosedMessage}>
                    {windowStatus.reason}
                </div>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            required
                            className={styles.input}
                            placeholder="Your name"
                            value={formData.name}
                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            required
                            className={styles.input}
                            placeholder="Your email"
                            value={formData.email}
                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </div>

                    <div className={styles.verificationBox}>
                        <p className={styles.verificationQuestion}>
                            {question ? question.question : 'Loading today\'s verification question...'}
                        </p>
                        <input
                            type="text"
                            required
                            className={styles.input}
                            placeholder={question?.placeholder}
                            value={formData.answer}
                            onChange={e => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                        />
                    </div>

                    {error && <p className={styles.errorText}>{error}</p>}
                    {statusMessage && <p style={{ color: 'var(--color-text-primary-green)', textAlign: 'center' }}>{statusMessage}</p>}

                    <button type="submit" className={styles.submitButton}>
                        Check In Now
                    </button>
                </form>
            )}
        </div>
    );
};
