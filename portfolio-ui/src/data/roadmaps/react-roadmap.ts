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
      position: { x: 0, y: 0 },
      content: {
        explanation: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called Components.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        realWorldUsage: 'Used in almost every modern Spotify, Netflix, and Facebook feature to manage dynamic UI updates.',
        subTopics: [
          'Virtual DOM & Reconciliation',
          'Component Architecture',
          'JSX Essentials',
          'React Elements vs Components'
        ],
        resources: [
          { label: 'Official React Docs', url: 'https://react.dev' },
          { label: 'MDN Web Docs - React', url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started' }
        ]
      }
    },
    // Sub-topics for React Fundamentals (Branching right)
    {
        id: 'r1-1',
        parentId: 'r1',
        title: 'Virtual DOM',
        type: 'sub-topic',
        position: { x: 260, y: -40 },
        content: {
          explanation: 'The Virtual DOM is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM.',
          realWorldUsage: 'This is the magic behind React\'s high performance during frequent updates.',
        }
    },
    {
        id: 'r1-2',
        parentId: 'r1',
        title: 'JSX Deep Dive',
        type: 'sub-topic',
        position: { x: 260, y: 40 },
        content: {
          explanation: 'JSX allows us to write HTML in React. JSX makes it easier to write and add HTML in React.',
          realWorldUsage: 'Writing expressive UI logic directly alongside markup.',
        }
    },
    {
      id: 'r2',
      title: 'JSX & Props',
      type: 'core',
      position: { x: 0, y: 200 },
      content: {
        explanation: 'JSX is a syntax extension for JavaScript. It looks like HTML but works inside JavaScript. Props are how you pass data from parent components to child components.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        realWorldUsage: 'Props are used to build reusable UI components like Buttons, Inputs, and Cards throughout an app.',
        resources: [
          { label: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' }
        ]
      }
    },
    {
      id: 'r3',
      title: 'Hooks: useState',
      type: 'core',
      position: { x: -220, y: 350 },
      content: {
        explanation: 'State allows React components to change their output over time in response to user actions, network responses, and anything else.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        realWorldUsage: 'Used for form inputs, toggles, counters, and any UI element that changes state.',
        resources: [
          { label: 'React State', url: 'https://react.dev/learn/state-a-components-memory' }
        ]
      }
    },
    {
      id: 'r4',
      title: 'Hooks: useEffect',
      type: 'core',
      position: { x: 220, y: 350 },
      content: {
        explanation: 'The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM are all examples of side effects.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        realWorldUsage: 'Debouncing → Used in search API optimization to reduce server load by waiting for the user to stop typing.',
        resources: [
          { label: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' }
        ]
      }
    },
    {
      id: 'r6',
      title: 'React Router',
      type: 'core',
      position: { x: 0, y: 500 },
      content: {
        explanation: 'React Router is the standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.',
        realWorldUsage: 'Essential for building Single Page Applications (SPAs) with multiple pages and clean URLs.',
      }
    },
    {
      id: 'r5',
      title: 'Custom Hooks',
      type: 'advanced',
      position: { x: 0, y: 700 },
      content: {
        explanation: 'Custom Hooks are a mechanism to reuse stateful logic (such as setting up a subscription and remembering the current value), but every time you use a custom Hook, all state and effects inside of it are fully isolated.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        realWorldUsage: 'useAuth, useLocalStorage, useApi – these are common patterns to keep your components clean and dry.',
        resources: [
          { label: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' }
        ]
      }
    }
  ]
};
