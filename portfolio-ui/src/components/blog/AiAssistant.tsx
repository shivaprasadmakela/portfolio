import React, { useState } from 'react';
import { aiApi } from '../../api/aiApi';
import { Button } from '../ui';
import { FiZap, FiEdit3, FiFileText, FiCopy, FiCheck, FiX } from 'react-icons/fi';
import styles from '../../styles/AiAssistant.module.css';

interface AiAssistantProps {
    content: string;
    title: string;
    onApply: (type: 'title' | 'content' | 'excerpt', value: string) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ content, title, onApply }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [activeTool, setActiveTool] = useState<'title' | 'content' | 'summary' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAction = async (tool: 'title' | 'content' | 'summary') => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        setActiveTool(tool);

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
        onApply(type, result);
        setResult(null);
        setActiveTool(null);
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
                                onClick={() => navigator.clipboard.writeText(result)}
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
                    <pre className={styles.resultContent}>{result}</pre>
                    <Button className={styles.applyBtn} onClick={handleApply}>
                        <FiCheck style={{ marginRight: '8px' }} /> Apply Suggestions
                    </Button>
                </div>
            )}
        </div>
    );
};
