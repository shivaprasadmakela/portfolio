import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../../components/home/Header';
import styles from '../../styles/interview/Interview.module.css';
import { youtubeQuestionData } from '../../data/youtubeQuestionData';
import { FiSearch, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { Input } from '../../components/ui';

export default function YoutubeSetsHub() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVideos = useMemo(() => {
        return youtubeQuestionData.filter(v =>
            v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery]);

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <motion.main
                className={styles.container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className={styles.title}>YouTube Question Sets</h1>
                <p className={styles.subtitle}>Structured interview questions explained in each of my YouTube videos</p>

                <div className={styles.controls} style={{ marginBottom: '40px' }}>
                    <Input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Search videos or topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={<FiSearch />}
                        style={{ marginBottom: 0 }}
                    />
                </div>

                <div className={styles.categoryGrid}>
                    {filteredVideos.map((video) => (
                        <Link to={`/youtube-sets/${video.id}`} key={video.id} className={styles.categoryCard} style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ height: '160px', overflow: 'hidden', background: '#000' }}>
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                    loading="lazy"
                                />
                            </div>
                            <div style={{ padding: '24px' }}>
                                <h3 className={styles.categoryName} style={{ fontSize: '1.2rem', marginBottom: '12px', minHeight: '2.8rem' }}>{video.title}</h3>
                                <p className={styles.categoryDesc} style={{ fontSize: '0.9rem', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {video.description}
                                </p>

                                <div className={styles.meta} style={{ marginTop: 'auto', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FiCalendar size={14} />
                                        <span>{video.publishDate}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <FiBookOpen size={14} />
                                        <span>{video.questionCount} Questions</span>
                                    </div>
                                </div>

                                <div className={styles.tags} style={{ marginTop: '16px' }}>
                                    {video.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className={styles.tag} style={{ fontSize: '0.75rem' }}>#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.main>
        </div>
    );
}
