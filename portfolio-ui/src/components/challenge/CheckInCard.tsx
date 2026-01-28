import React, { useState, useEffect } from 'react';
import styles from '../../styles/Challenge.module.css';
import { getISTTimeDisplay, isSubmissionWindowActive } from '../../utils/timeUtils';
import { challengeApi } from '../../api/challengeApi';
import type { VerificationQuestion, LeaderboardEntry } from '../../api/challengeApi';
import { Input, Button } from '../ui';

export const CheckInCard: React.FC<{ onSuccess: (newData?: LeaderboardEntry[]) => void }> = ({ onSuccess }) => {
    const [currentTime, setCurrentTime] = useState(getISTTimeDisplay());
    const [windowStatus, setWindowStatus] = useState(isSubmissionWindowActive());
    const [formData, setFormData] = useState({ name: '', email: '', answer: '' });
    const [question, setQuestion] = useState<VerificationQuestion | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const fetchQuestion = async () => {
        setIsLoading(true);
        try {
            const data = await challengeApi.getQuestion();
            setQuestion(data);
        } catch (err: any) {
            setError('Failed to load verification question.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getISTTimeDisplay());
            setWindowStatus(isSubmissionWindowActive());
        }, 1000);

        fetchQuestion();

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStatusMessage('');

        if (!windowStatus.active) {
            setError(windowStatus.reason || 'Submission window is closed.');
            return;
        }

        if (!question) {
            setError('Verification question not loaded. Please refresh.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await challengeApi.checkIn({
                name: formData.name,
                email: formData.email,
                answer: formData.answer,
                questionId: question.id
            });

            if (response.success) {
                setStatusMessage(response.message);
                setFormData({ name: '', email: '', answer: '' });
                const updatedLeaderboard = await challengeApi.getLeaderboard();
                onSuccess(updatedLeaderboard);

            } else {
                setError(response.message);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during check-in.');

        } finally {
            setIsSubmitting(false);
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
                    <Input
                        label="Name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />

                    <Input
                        label="Email"
                        type="email"
                        required
                        placeholder="Your email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />

                    <div className={styles.verificationBox}>
                        <p className={styles.verificationQuestion}>
                            {question ? question.question : 'Loading today\'s verification question...'}
                        </p>
                        <Input
                            type="text"
                            required
                            placeholder={question?.placeholder}
                            value={formData.answer}
                            onChange={e => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                        />
                    </div>

                    {error && <p className={styles.errorText}>{error}</p>}
                    {statusMessage && <p style={{ color: 'var(--color-text-primary-green)', textAlign: 'center' }}>{statusMessage}</p>}

                    <Button type="submit" disabled={isSubmitting || isLoading}>
                        {isSubmitting ? 'Checking In...' : 'Check In Now'}
                    </Button>
                </form>
            )
            }
        </div >
    );
};
