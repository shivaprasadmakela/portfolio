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
    image: '/assets/chatApp.png',
    description: 'It’s a simple web app where you can: Create or join private chat rooms instantly Chat in real-time with others (no sign-up needed) Share room links with friends See messages with timestamps',
    tags: ['React', 'Node.js + Express', 'Socket.io'],
    link: 'https://talknow-link.vercel.app/',
  },
  {
    title: 'FLAMES Fun',
    image: '/assets/flamesFun.png',
    description: 'FLAMES Fun is a modern, interactive web application that predicts the relationship compatibility between two people using the classic "FLAMES" algorithm.',
    tags: ['Javascript', 'React'],
    link: 'https://flames-fun.vercel.app/',
  },
  {
    title: 'Integrated Door Landing Page',
    image: '/assets/integratedDoor.png',
    description: "A modern, responsive landing page for Integrated Door, a company that provides door solutions for various industries.",
    tags: ['React', 'CSS', 'HTML'],
    link: 'https://integrated-door.vercel.app',
  },
];
