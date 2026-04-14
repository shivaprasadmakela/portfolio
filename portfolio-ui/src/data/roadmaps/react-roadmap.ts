import type { Roadmap } from '../../types/roadmap';

export const reactRoadmap: Roadmap = {
  id: 'react-2024',
  title: 'React.js Developer Roadmap',
  description: 'Master the art of building scalable, performant React applications. From hooks to design patterns.',
  difficulty: 'Intermediate',
  nodes: [
    {
      id: 'r1',
      title: 'React Fundamentals',
      type: 'core',
      level: 0,
      column: 4, // Center
      content: {
        explanation: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        subTopics: [
          'Virtual DOM & Reconciliation',
          'Component Architecture',
          'JSX Essentials'
        ],
      }
    },
    {
      id: 'r1-1',
      parentId: 'r1',
      title: 'Virtual DOM',
      type: 'sub-topic',
      level: 0,
      column: 3, // Left of R1
      connectionType: 'curve-left',
      content: {
        explanation: 'The Virtual DOM is a programming concept where a representation of a UI is kept in memory.',
      }
    },
    {
      id: 'r1-2',
      parentId: 'r1',
      title: 'JSX Deep Dive',
      type: 'sub-topic',
      level: 0,
      column: 5, // Right of R1
      connectionType: 'curve-right',
      content: {
        explanation: 'JSX allows us to write HTML in React.',
      }
    },
    {
      id: 'r2',
      parentId: 'r1',
      title: 'JSX & Props',
      type: 'core',
      level: 1,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Props are how you pass data from parent components to child components.',
      }
    },
    {
      id: 'r3',
      parentId: 'r2',
      title: 'React Hooks',
      type: 'core',
      level: 2,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Hooks let you use state and other React features without writing a class.',
      }
    },
    {
      id: 'r3-1',
      parentId: 'r3',
      title: 'useState',
      type: 'sub-topic',
      level: 3,
      column: 3,
      connectionType: 'fork-2',
      content: {
        explanation: 'useState is a Hook that lets you add React state to function components.',
      }
    },
    {
      id: 'r3-2',
      parentId: 'r3',
      title: 'useEffect',
      type: 'sub-topic',
      level: 3,
      column: 5,
      connectionType: 'fork-2',
      content: {
        explanation: 'useEffect Hook lets you perform side effects in function components.',
      }
    },
    {
      id: 'r4',
      parentId: 'r3',
      title: 'React Router',
      type: 'core',
      level: 3,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'React Router is the standard library for routing in React.',
      }
    },
    {
      id: 'r5',
      parentId: 'r4',
      title: 'Custom Hooks',
      type: 'advanced',
      level: 4,
      column: 4,
      connectionType: 'vertical',
      content: {
        explanation: 'Custom Hooks are a mechanism to reuse stateful logic.',
      }
    }
  ]
};
