import type { Roadmap } from '../../types/roadmap';

export const frontendRoadmap: Roadmap = {
  id: 'frontend-2024',
  title: 'Frontend Developer Roadmap',
  description: 'Step by step guide to becoming a modern frontend developer in 2024. From basic HTML to expert patterns.',
  difficulty: 'Beginner',
  nodes: [
    {
      id: 'f1',
      title: 'Frontend Developer',
      type: 'core',
      level: 0,
      column: 4,
      content: {
        explanation: 'A frontend developer builds the visual and interactive parts of websites and web applications.',
        subTopics: ['HTML/CSS/JS', 'User Experience', 'Web Accessibility'],
      }
    },
    {
      id: 'f2',
      parentId: 'f1',
      title: 'Internet',
      type: 'core',
      level: 1,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'The foundation of the web. Understanding how browsers, servers, and networks communicate.',
      }
    },
    {
      id: 'f2-1',
      parentId: 'f2',
      title: 'DNS & Domains',
      type: 'sub-topic',
      level: 1,
      column: 2,
      connectionType: 'curve-left',
      content: {
        explanation: 'Domain Name System (DNS) is like the phonebook of the internet.',
      }
    },
    {
      id: 'f2-2',
      parentId: 'f2',
      title: 'HTTP/HTTPS',
      type: 'sub-topic',
      level: 1,
      column: 6,
      connectionType: 'curve-right',
      content: {
        explanation: 'The protocols used for transferring data across the web.',
      }
    },
    {
      id: 'f3',
      parentId: 'f2',
      title: 'HTML',
      type: 'core',
      level: 2,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'HyperText Markup Language defines the structure of web pages.',
      }
    },
    {
      id: 'f3-1',
      parentId: 'f3',
      title: 'Semantic HTML',
      type: 'sub-topic',
      level: 2,
      column: 2,
      connectionType: 'curve-left',
      content: {
        explanation: 'Using HTML elements that convey meaning about the content (e.g., <article>, <nav>).',
      }
    },
    {
      id: 'f3-2',
      parentId: 'f3',
      title: 'Forms & SEO',
      type: 'sub-topic',
      level: 2,
      column: 6,
      connectionType: 'curve-right',
      content: {
        explanation: 'Handling user input and making your site discoverable by search engines.',
      }
    },
    {
      id: 'f4',
      parentId: 'f3',
      title: 'CSS',
      type: 'core',
      level: 3,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Cascading Style Sheets are used to style and layout web pages.',
      }
    },
    {
      id: 'f4-1',
      parentId: 'f4',
      title: 'Flexbox & Grid',
      type: 'sub-topic',
      level: 3,
      column: 2,
      connectionType: 'fork-2',
      content: {
        explanation: 'Modern layout techniques for creating flexible and responsive designs.',
      }
    },
    {
      id: 'f4-2',
      parentId: 'f4',
      title: 'Responsive Design',
      type: 'sub-topic',
      level: 3,
      column: 6,
      connectionType: 'fork-2',
      content: {
        explanation: 'Ensuring your site looks great on mobile, tablet, and desktop.',
      }
    },
    {
      id: 'f5',
      parentId: 'f4',
      title: 'JavaScript',
      type: 'core',
      level: 4,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'The programming language of the web. Adds interactivity to pages.',
      }
    },
    {
      id: 'f5-1',
      parentId: 'f5',
      title: 'DOM Manipulation',
      type: 'sub-topic',
      level: 4,
      column: 2,
      connectionType: 'curve-left',
      content: {
        explanation: 'Interacting with HTML elements using JavaScript.',
      }
    },
    {
      id: 'f5-2',
      parentId: 'f5',
      title: 'Fetch / API',
      type: 'sub-topic',
      level: 4,
      column: 6,
      connectionType: 'curve-right',
      content: {
        explanation: 'Loading data from external services into your application.',
      }
    },
    {
      id: 'f6',
      parentId: 'f5',
      title: 'VCS (Git)',
      type: 'core',
      level: 5,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Version Control Systems allow you to track and manage changes to your code.',
      }
    },
    {
      id: 'f7',
      parentId: 'f6',
      title: 'GitHub / GitLab',
      type: 'core',
      level: 6,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Platforms for hosting and collaborating on Git repositories.',
      }
    },
    {
      id: 'f8',
      parentId: 'f7',
      title: 'Package Managers',
      type: 'core',
      level: 7,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'npm, yarn, and pnpm used for managing external libraries.',
      }
    },
    {
      id: 'f9',
      parentId: 'f8',
      title: 'Frameworks',
      type: 'core',
      level: 8,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Large libraries that provide a structured way to build web apps.',
      }
    },
    {
      id: 'f9-1',
      parentId: 'f9',
      title: 'React',
      type: 'sub-topic',
      level: 8,
      column: 2,
      connectionType: 'fork-2',
      content: {
        explanation: 'The most popular frontend library, focusing on components.',
      }
    },
    {
      id: 'f9-2',
      parentId: 'f9',
      title: 'Vue / Angular',
      type: 'sub-topic',
      level: 8,
      column: 6,
      connectionType: 'fork-2',
      content: {
        explanation: 'Strong alternatives with different mental models.',
      }
    },
    {
      id: 'f10',
      parentId: 'f9',
      title: 'Testing',
      type: 'core',
      level: 9,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Ensuring your code works as expected through automated scripts.',
      }
    },
    {
      id: 'f11',
      parentId: 'f10',
      title: 'Build Tools',
      type: 'core',
      level: 10,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Linters, formatters, and bundlers like Vite and Webpack.',
      }
    }
  ]
};
