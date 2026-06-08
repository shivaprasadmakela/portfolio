import React, { useState, useEffect } from 'react';
import styles from '../Challenge.module.css';
import { getISTTimeDisplay, isSubmissionWindowActive, getCountdown } from '../../../shared/utils/timeUtils';
import { useChallengeQuestion } from '../hooks/useChallengeQuestion';
import { useCheckIn } from '../hooks/useCheckIn';
import { Input, Button } from '../../../shared/components';

export const CheckInCard: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [currentTime, setCurrentTime] = useState(getISTTimeDisplay());
    const [countdown, setCountdown] = useState(getCountdown());
    const [windowStatus, setWindowStatus] = useState(isSubmissionWindowActive());
    const [formData, setFormData] = useState({ name: '', email: '', answer: '' });
    
    const { data: question, isLoading: isQuestionLoading, error: questionError } = useChallengeQuestion();
    const checkInMutation = useCheckIn();

    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getISTTimeDisplay());
            setCountdown(getCountdown());
            setWindowStatus(isSubmissionWindowActive());
        }, 1000);

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

        checkInMutation.mutate({
            name: formData.name,
            email: formData.email,
            answer: formData.answer,
            questionId: question.id
        }, {
            onSuccess: (response) => {
                if (response.success) {
                    setStatusMessage(response.message);
                    setFormData({ name: '', email: '', answer: '' });
                    onSuccess();
                } else {
                    setError(response.message);
                }
            },
            onError: (err: any) => {
                setError(err.message || 'An error occurred during check-in.');
            }
        });
    };

    return (
        <div className={styles.card} id="check-in-section">
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Daily Wake-Up Check-In</h2>
                <div className={styles.timeInfo}>
                    <div className={styles.countdown}>
                        <span className={styles.countdownLabel}>{countdown.label}:</span>
                        <span className={styles.countdownValue}>{countdown.time}</span>
                    </div>
                    <div className={styles.liveClock}>{currentTime}</div>
                </div>
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
                        error={error && error.includes('Name') ? error : undefined}
                    />

                    <Input
                        label="Email"
                        type="email"
                        required
                        placeholder="Your email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        error={error && error.includes('Email') ? error : undefined}
                    />

                    <div className={styles.verificationBox}>
                        <p className={styles.verificationQuestion}>
                            {isQuestionLoading ? 'Loading today\'s verification question...' : 
                             questionError ? 'Failed to load verification question.' :
                             question ? question.question : ''}
                        </p>
                        <Input
                            type="text"
                            required
                            placeholder={question?.placeholder || 'Answer'}
                            value={formData.answer}
                            onChange={e => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                            error={error && error.includes('Answer') ? error : undefined}
                            disabled={isQuestionLoading || !!questionError}
                        />
                    </div>

                    {error && <p className={styles.errorText}>{error}</p>}
                    {statusMessage && <p style={{ color: 'var(--color-text-primary-green)', textAlign: 'center' }}>{statusMessage}</p>}

                    <Button type="submit" disabled={checkInMutation.isPending || isQuestionLoading}>
                        {checkInMutation.isPending ? 'Checking In...' : 'Check In Now'}
                    </Button>
                </form>
            )}
        </div>
    );
};
