import React, { useState } from 'react';
import { aiApi } from '../../api/aiApi';
import { Button } from '../ui';
import { FiFileText, FiZap } from 'react-icons/fi';
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


    React.useEffect(() => {
        setSummary(existingSummary || null);
    }, [existingSummary]);

    const loadingMessages = [
        "Diving into the content...",
        "Analyzing key insights...",
        "Extracting technical gems...",
        "Gemini is thinking...",
        "Crafting your snapshot...",
        "Summarizing the journey..."
    ];

    const [messageIndex, setMessageIndex] = useState(0);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLoading) {
            setMessageIndex(0);
            interval = setInterval(() => {
                setMessageIndex((prev) => {
                    if (prev < loadingMessages.length - 1) {
                        return prev + 1;
                    }
                    return prev;
                });
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isLoading, loadingMessages.length]);

    const isLimitReached = usageCount >= MAX_USAGE;
    const isDisabled = isLimitReached || isPremium;

    const handleSummarize = async () => {
        if (isDisabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const res = await aiApi.summarize(content);

            const newCount = usageCount + 1;
            setUsageCount(newCount);
            localStorage.setItem(USAGE_KEY, newCount.toString());

            let finalSummary = res.result;
            try {
                const parsed = JSON.parse(res.result);
                // Check if the response body itself contains an error object
                if (parsed.error) {
                    throw new Error(parsed.error.message || 'AI processing error');
                }
                finalSummary = parsed.summary || res.result;
            } catch (e: any) {
                if (e.message && (e.message.includes('AI processing') || e.message.includes('error'))) {
                    throw e;
                }
                finalSummary = res.result;
            }

            if (finalSummary.includes('"error"') || finalSummary.includes('503 Service Unavailable')) {
                throw new Error("Received malformed response from AI");
            }

            setSummary(finalSummary);
            if (onSummaryGenerated) {
                onSummaryGenerated(finalSummary);
            }
        } catch (err: any) {
            const errorMsg = err.message || '';
            if (errorMsg.includes('503') || errorMsg.includes('high demand')) {
                setError("Gemini is currently experiencing high demand and is taking a short break. Please try again in a few moments!");
            } else {
                setError("Something went wrong while generating the summary. Please try again later.");
            }
            console.error('AI Summary Error:', err);
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
                    <span>{loadingMessages[messageIndex]}</span>
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
