import { useState } from 'react';
import { youtubeVideos } from '../data/videos';
import styles from '../styles/home/YoutubeHome.module.css';
import Header from '../components/home/Header';
import profileImage from '../assets/profile.png';


export default function MyYoutube() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust as needed

    // Calculate total pages
    const totalPages = Math.ceil(youtubeVideos.length / itemsPerPage);

    // Get current videos
    const indexOfLastVideo = currentPage * itemsPerPage;
    const indexOfFirstVideo = indexOfLastVideo - itemsPerPage;
    const currentVideos = youtubeVideos.slice(indexOfFirstVideo, indexOfLastVideo);

    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    const handleClose = () => setSelectedVideoId(null);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.videoSectionAll}>
                <div className={styles.channelContainer}>
                    <img
                        src={profileImage}
                        alt="Channel profile"
                        className={styles.profilePic}
                    />

                    <div className={styles.channelDetails}>
                        <h1 className={styles.name}>shiva prasad m</h1>
                        <p className={styles.meta}>
                            <span className={styles.handle}>@shivaprasad.m</span> ·
                            <span className={styles.stats}> 11.5K subscribers</span> ·
                            <span className={styles.stats}> 199 videos</span>
                        </p>

                        <p className={styles.description}>
                            #BeYourself{" "}
                            <a
                                href="https://www.youtube.com/@shivaprasad.m"
                                className={styles.more}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                …more
                            </a>
                        </p>

                    </div>
                </div>
                <div>
                    <h2 className={styles.heading}>All My YouTube Videos.</h2>
                    <p className={styles.subheading}>
                        Here's a collection of videos I've created on tech, learning, and career growth.<br />
                    </p>
                </div>
                <div className={styles.allVideos}>
                    {currentVideos.map((video) => (
                        <div key={video.id} className={styles.videoCards} onClick={() => setSelectedVideoId(video.id)}>
                            <img src={video.thumbnailUrl} alt={video.title} />
                            <div className={styles.videoInfo}>
                                <h4 className={styles.videoTitle}>{video.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className={styles.pagination}>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        Previous
                    </button>
                    <span className={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={styles.pageButton}
                    >
                        Next
                    </button>
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
