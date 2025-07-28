import styles from '../../styles/home/Articles.module.css';

const articles = [
  {
    title: '2024 Retrospective',
    date: 'January 21 2025',
    read: '6 min read',
    link: '#',
  },
  {
    title: 'Unleash Your Dev Blog: Write More with GitHub Issues as Your CMS',
    date: 'April 2 2024',
    read: '3 min read',
    link: '#',
  },
  {
    title: 'Code Faster with Vim Shortcuts!',
    date: 'July 18 2022',
    read: '2 min read',
    link: '#',
  },
  {
    title: 'Easily Boost Your Productivity With Code Snippets',
    date: 'September 22 2021',
    read: '3 min read',
    link: '#',
  },
];

export default function Articles() {
  return (
    <section className={styles.articlesSection}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>
          <span className={styles.icon}>
            {/* Article SVG */}
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#bdb6f3"/><rect x="6" y="7" width="12" height="2" rx="1" fill="#fff"/><rect x="6" y="11" width="12" height="2" rx="1" fill="#fff"/><rect x="6" y="15" width="8" height="2" rx="1" fill="#fff"/></svg>
          </span>
          Latest Article.
        </h2>
        <a href="#" className={styles.viewAll}>View all articles →</a>
      </div>
      <div className={styles.grid}>
        {articles.map((a) => (
          <a href={a.link} className={styles.card} key={a.title}>
            <h3 className={styles.title}>{a.title}</h3>
            <div className={styles.meta}>{a.date} • {a.read}</div>
          </a>
        ))}
      </div>
    </section>
  );
}