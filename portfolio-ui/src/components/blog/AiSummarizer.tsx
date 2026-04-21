import React, { useState } from 'react';
import { aiApi } from '../../api/aiApi';
import { Button } from '../ui';
import { FiFileText, FiZap, FiX } from 'react-icons/fi';
import styles from '../../styles/AiSummarizer.module.css';

interface AiSummarizerProps {
    content: string;
}

export const AiSummarizer: React.FC<AiSummarizerProps> = ({ content }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = async () => {
        setIsLoading(true);
        setError(null);
        setSummary(null);

        try {
            const res = await aiApi.summarize(content);
            // Parse result if it's JSON, or use raw if fallback
            try {
                const parsed = JSON.parse(res.result);
                setSummary(parsed.summary || res.result);
            } catch (e) {
                setSummary(res.result);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to generate summary');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <FiZap />
                    <span>AI Content Snapshot</span>
                </div>
                {!summary && !isLoading && (
                    <Button 
                        className={styles.summarizeBtn}
                        onClick={handleSummarize}
                    >
                        <FiFileText /> Summarize Insight
                    </Button>
                )}
                {summary && (
                    <button 
                        className={styles.closeBtn} 
                        onClick={() => setSummary(null)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                    >
                        <FiX />
                    </button>
                )}
            </div>

            {isLoading && (
                <div className={styles.loadingArea}>
                    <div className={styles.spinner}></div>
                    <span>Diving into the content...</span>
                </div>
            )}

            {error && <div className={styles.errorArea}>{error}</div>}

            {summary && (
                <div className={styles.summaryContent}>
                    {summary}
                </div>
            )}
        </div>
    );
};
