import React, { useState } from 'react';
import { aiApi } from '../../api/aiApi';
import { Button } from '../ui';
import { FiFileText, FiZap, FiX } from 'react-icons/fi';
import styles from '../../styles/AiSummarizer.module.css';

interface AiSummarizerProps {
    content: string;
    isPremium?: boolean;
    existingSummary?: string;
    onSummaryGenerated?: (summary: string) => void;
}

export const AiSummarizer: React.FC<AiSummarizerProps> = ({ 
    content, 
    isPremium = false,
    existingSummary,
    onSummaryGenerated
}) => {
    const USAGE_KEY = 'portfolio_ai_usage';
    const MAX_USAGE = 3;

    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(existingSummary || null);
    const [error, setError] = useState<string | null>(null);
    const [usageCount, setUsageCount] = useState(() => {
        const saved = localStorage.getItem(USAGE_KEY);
        return saved ? parseInt(saved, 10) : 0;
    });

    // Update local state if props change (e.g. navigation)
    React.useEffect(() => {
        setSummary(existingSummary || null);
    }, [existingSummary]);

    const isLimitReached = usageCount >= MAX_USAGE;
    const isDisabled = isLimitReached || isPremium;

    const handleSummarize = async () => {
        if (isDisabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const res = await aiApi.summarize(content);

            // Increment usage count on success
            const newCount = usageCount + 1;
            setUsageCount(newCount);
            localStorage.setItem(USAGE_KEY, newCount.toString());

            let finalSummary = res.result;
            // Parse result if it's JSON, or use raw if fallback
            try {
                const parsed = JSON.parse(res.result);
                finalSummary = parsed.summary || res.result;
            } catch (e) {
                finalSummary = res.result;
            }

            setSummary(finalSummary);
            if (onSummaryGenerated) {
                onSummaryGenerated(finalSummary);
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
                        disabled={isDisabled}
                    >
                        <FiFileText /> {
                            isPremium 
                                ? 'Summarizer Locked (Premium)' 
                                : isLimitReached 
                                    ? 'Daily Limit Reached' 
                                    : 'Summarize Insight'
                        }
                    </Button>
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
