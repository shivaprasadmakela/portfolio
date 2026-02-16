
import { youtubeVideos } from '../../data/videos';
import styles from '../../styles/home/YoutubeHome.module.css';
import { useState } from 'react';


export default function YouTubeHome() {

    const previewVideos = youtubeVideos.slice(0, 3);

    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    const handleClose = () => setSelectedVideoId(null);


    return (
        <>
            <div className={styles.videoSection}>
                <h2 className={styles.heading}>All My YouTube Videos.</h2>
                <p className={styles.subheading}>
                    Here's a collection of videos I've created on tech, learning, and career growth.<br />
                    <a href="/my-youtube" className={styles.exploreMore}>Explore more →</a>
                </p>
                <div className={styles.allVideos}>
                    {previewVideos.map((video) => (
                        <div key={video.id} className={styles.videoCard} onClick={() => setSelectedVideoId(video.id)}>

                            <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />

                            <div className={styles.videoInfo}>
                                <h4 className={styles.videoTitle}>{video.title}</h4>
                            </div>
                        </div>

                    ))}
                </div>
            </div>


            {selectedVideoId && (
                <div className={styles.modalOverlay} onClick={handleClose}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={handleClose}>×</button>
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}
