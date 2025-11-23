export interface Project {
  title: string;
  image: string;
  description: string;
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    title: 'Chat App! #TalkNow',
    image: '/assets/1758866127791.jpg',
    description: 'It’s a simple web app where you can: Create or join private chat rooms instantly Chat in real-time with others (no sign-up needed) Share room links with friends See messages with timestamps',
    tags: ['React', 'Node.js + Express', 'Socket.io'],
    link: 'https://talknow-link.vercel.app/',
  }
  // {
  //   title: 'creative@home',
  //   image: '/images/creativehome.png',
  //   description: 'A website that provides roadmap for various fields in Programming and help people learn to code for free.',
  //   tags: ['Javascript', 'Sass'],
  //   link: 'https://creativehome.example.com',
  // },
  // {
  //   title: 'Prayer Time API',
  //   image: '/images/prayertime.png',
  //   description: "It's an easy to use API to get today's (and tomorrow!) prayer time in any city in the world, based on Muslim Pro.",
  //   tags: ['Python', 'Flask', 'Beautiful Soup'],
  //   link: 'https://prayertimeapi.example.com',
  // },
];
