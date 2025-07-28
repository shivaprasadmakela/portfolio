import Header from '../components/home/Header';
import styles from '../styles/BlogList.module.css';

const posts = [
  {
    title: '2024 Retrospective',
    date: 'Jan 21 2025',
    read: '6 min read',
    excerpt: 'A late retrospective on 2024. Moving to Bali, stepping outside my comfort zone, and embracing a year of growth and new experiences.',
    link: '#',
  },
  {
    title: 'Unleash Your Dev Blog: Write More with GitHub Issues as Your CMS',
    date: 'Apr 2 2024',
    read: '3 min read',
    excerpt: 'Turn your GitHub Issues into a powerful Next.js blog to write more and publish faster!',
    link: '#',
  },
  {
    title: 'Code Faster with Vim Shortcuts!',
    date: 'Jul 18 2022',
    read: '2 min read',
    excerpt: 'Never leave your hands on your keyboard again.',
    link: '#',
  },
  {
    title: 'Easily Boost Your Productivity With Code Snippets',
    date: 'Sep 22 2021',
    read: '3 min read',
    excerpt: 'No more typing the same thing over and over again with Code Snippets!',
    link: '#',
  },
  {
    title: 'How I Make My First (real) Open Source Contribution',
    date: 'Jun 20 2021',
    read: '5 min read',
    excerpt: 'How I contributed to open-source and my thought process behind it.',
    link: '#',
  },
  {
    title: 'Why I Learned to Code',
    date: 'Nov 24 2019',
    read: '6 min read',
    excerpt: 'The story about how I started learning programming.',
    link: '#',
  },
];

export default function BlogList() {
  return (
    <>
    <Header />
    <main className={styles.blogMain}>
      <h1 className={styles.heading}>Blog</h1>
      <p className={styles.desc}>
        This is where I share my writings on programming, tutorials, and my experiences.
      </p>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search articles" />
        <span className={styles.searchIcon}>
          {/* Search SVG */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#bdbdbd" strokeWidth="2"/><path stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" d="M20 20l-3.5-3.5"/></svg>
        </span>
      </div>
        <h1>Coming Soon</h1>

      {/* <ul className={styles.list}>
        {posts.map((post) => (
          <li className={styles.item} key={post.title}>
            <div className={styles.meta}>
              <span>{post.date}</span>
              <span>{post.read}</span>
            </div>
            <div className={styles.content}>
              <a href={post.link} className={styles.title}>{post.title}</a>
              <div className={styles.excerpt}>{post.excerpt}</div>
              <a href={post.link} className={styles.learnMore}>Learn more →</a>
            </div>
          </li>
        ))}
      </ul> */}
    </main>
    </>
  );
}