import React, { useState, useMemo } from 'react';
import { aiApi } from '../../api/aiApi';
import { Button } from '../ui';
import { FiZap, FiEdit3, FiFileText, FiCopy, FiCheck, FiX } from 'react-icons/fi';
import styles from '../../styles/AiAssistant.module.css';

interface AiAssistantProps {
    content: string;
    title: string;
    onApply: (type: 'title' | 'content' | 'excerpt', value: string) => void;
}

interface ParsedResult {
    variations?: string[];
    enhancedContent?: string;
    summary?: string;
    explanation?: string;
    rawText?: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ content, title, onApply }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [activeTool, setActiveTool] = useState<'title' | 'content' | 'summary' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const parsedResult = useMemo<ParsedResult>(() => {
        if (!result) return {};
        try {
            return JSON.parse(result);
        } catch (e) {
            return { rawText: result };
        }
    }, [result]);

    const handleAction = async (tool: 'title' | 'content' | 'summary') => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setActiveTool(tool);
        setSelectedIndex(0);

        try {
            let res;
            if (tool === 'title') res = await aiApi.improveTitle(title);
            else if (tool === 'content') res = await aiApi.enhanceContent(content);
            else res = await aiApi.summarize(content);

            setResult(res.result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApply = () => {
        if (!result || !activeTool) return;
        const type = activeTool === 'summary' ? 'excerpt' : activeTool;
        
        let valueToApply = "";
        if (activeTool === 'title' && parsedResult.variations) {
            valueToApply = parsedResult.variations[selectedIndex];
        } else if (activeTool === 'content' && parsedResult.enhancedContent) {
            valueToApply = parsedResult.enhancedContent;
        } else if (activeTool === 'summary' && parsedResult.summary) {
            valueToApply = parsedResult.summary;
        } else {
            valueToApply = parsedResult.rawText || result;
        }

        onApply(type, valueToApply);
        setResult(null);
        setActiveTool(null);
    };

    const copyToClipboard = () => {
        let text = result || "";
        if (activeTool === 'title' && parsedResult.variations) {
            text = parsedResult.variations[selectedIndex];
        } else if (parsedResult.enhancedContent) {
            text = parsedResult.enhancedContent;
        } else if (parsedResult.summary) {
            text = parsedResult.summary;
        }
        navigator.clipboard.writeText(text);
    };

    return (
        <div className={styles.container}>
            <div className={styles.toolHeader}>
                <FiZap className={styles.zapIcon} />
                <span>AI Writing Assistant</span>
            </div>

            <div className={styles.buttonGroup}>
                <Button 
                    variant="secondary" 
                    className={styles.toolBtn} 
                    onClick={() => handleAction('title')}
                    disabled={isLoading || !title}
                >
                    <FiEdit3 /> Improve Title
                </Button>
                <Button 
                    variant="secondary" 
                    className={styles.toolBtn} 
                    onClick={() => handleAction('content')}
                    disabled={isLoading || !content}
                >
                    <FiZap /> Enhance Body
                </Button>
                <Button 
                    variant="secondary" 
                    className={styles.toolBtn} 
                    onClick={() => handleAction('summary')}
                    disabled={isLoading || !content}
                >
                    <FiFileText /> Generate Summary
                </Button>
            </div>

            {isLoading && (
                <div className={styles.loadingArea}>
                    <div className={styles.spinner}></div>
                    <span>Consulting the AI editor...</span>
                </div>
            )}

            {error && <div className={styles.errorArea}>{error}</div>}

            {result && (
                <div className={styles.resultArea}>
                    <div className={styles.resultHeader}>
                        <span>Suggested {activeTool === 'summary' ? 'Excerpt' : activeTool}:</span>
                        <div className={styles.resultActions}>
                            <button 
                                className={styles.iconBtn} 
                                onClick={copyToClipboard}
                                title="Copy to clipboard"
                            >
                                <FiCopy />
                            </button>
                            <button 
                                className={styles.iconBtn} 
                                onClick={() => setResult(null)}
                                title="Dismiss"
                            >
                                <FiX />
                            </button>
                        </div>
                    </div>

                    {activeTool === 'title' && parsedResult.variations ? (
                        <div className={styles.variationList}>
                            {parsedResult.variations.map((v, i) => (
                                <div 
                                    key={i} 
                                    className={`${styles.variationItem} ${selectedIndex === i ? styles.selectedItem : ''}`}
                                    onClick={() => setSelectedIndex(i)}
                                >
                                    <span className={styles.variationNumber}>{i + 1}</span>
                                    <span className={styles.variationText}>{v}</span>
                                </div>
                            ))}
                            {parsedResult.explanation && (
                                <p className={styles.explanationText}>💡 {parsedResult.explanation}</p>
                            )}
                        </div>
                    ) : (
                        <pre className={styles.resultContent}>
                            {parsedResult.enhancedContent || parsedResult.summary || parsedResult.rawText || result}
                        </pre>
                    )}

                    <Button className={styles.applyBtn} onClick={handleApply}>
                        <FiCheck style={{ marginRight: '8px' }} /> Apply Selected Changes
                    </Button>
                </div>
            )}
        </div>
    );
};
