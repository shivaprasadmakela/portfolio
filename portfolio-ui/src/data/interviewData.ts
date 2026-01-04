export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  title: string;
  summary: string;
  content: string;
  solution: string;
  difficulty: Difficulty;
  tags: string[];
  views: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  questionCount: number;
  questions: Question[];
}

export const interviewData: Category[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Core JS interview questions',
    questionCount: 3,
    questions: [
      {
        id: 'js-1',
        title: 'What is a Closure?',
        summary: 'A closure is the combination of a function bundled together with references to its surrounding state.',
        content: '<p>A <strong>closure</strong> gives you access to an outer function\'s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.</p><pre><code>function init() {\n  var name = "Mozilla"; // name is a local variable created by init\n  function displayName() {\n    // displayName() is the inner function, a closure\n    console.log(name); // use variable declared in the parent function\n  }\n  displayName();\n}\ninit();</code></pre>',
        solution: 'Closures are useful because they let you associate data (the lexical environment) with a function that operates on that data. This has obvious parallels to object-oriented programming, where objects allow you to associate data (the object\'s properties) with one or more methods.\n\n- Data encapsulation\n- Private variables\n- Event handlers and callbacks',
        difficulty: 'Easy',
        tags: ['javascript', 'functions', 'scope'],
        views: 1250,
      },
      {
        id: 'js-2',
        title: 'Difference between let, const and var',
        summary: 'Variable declaration keywords with different scoping and reassignment rules.',
        content: '<p>Explain the differences between <code>var</code>, <code>let</code>, and <code>const</code> in terms of scope, hoisting, and reassignment.</p>',
        solution: '- **var:** Function scoped, hoisted, can be redeclared and reassigned.\n- **let:** Block scoped, not hoisted (TDZ), cannot be redeclared, can be reassigned.\n- **const:** Block scoped, not hoisted (TDZ), cannot be redeclared or reassigned.',
        difficulty: 'Easy',
        tags: ['javascript', 'basics', 'variables'],
        views: 3400,
      },
      {
        id: 'js-3',
        title: 'Explain Event Delegation',
        summary: 'A pattern that leverages event bubbling to handle events at a higher level in the DOM.',
        content: '<p>Event delegation is a technique where you attach a single event listener to a parent element instead of multiple listeners to each child.</p>',
        solution: 'It works because of **event bubbling**. When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.\n\n### Benefits:\n\n- Memory efficiency\n- Simplifies dynamic element handling',
        difficulty: 'Medium',
        tags: ['javascript', 'dom', 'events'],
        views: 2100,
      }
    ]
  },
  {
    id: 'react',
    name: 'React',
    description: 'React fundamentals & hooks',
    questionCount: 2,
    questions: [
      {
        id: 'react-1',
        title: 'What are React Hooks?',
        summary: 'Hooks allow function components to use state and other React features.',
        content: '<p>Hooks are functions that let you "hook into" React state and lifecycle features from function components.</p>',
        solution: 'Common hooks include:\n\n- `useState`: For local state\n- `useEffect`: For side effects\n- `useContext`: For consuming context\n- `useRef`: For persistent values and DOM access',
        difficulty: 'Easy',
        tags: ['react', 'hooks'],
        views: 5200,
      },
      {
        id: 'react-2',
        title: 'Virtual DOM vs Real DOM',
        summary: 'How React optimizes updates using a virtual representation of the UI.',
        content: '<p>Explain how React\'s Virtual DOM improves performance compared to direct DOM manipulation.</p>',
        solution: 'The Virtual DOM is a lightweight copy of the Real DOM. When state changes, React creates a new virtual tree, compares it with the old one (diffing), and calculates the minimal set of changes needed to update the Real DOM (reconciliation).',
        difficulty: 'Medium',
        tags: ['react', 'vdom', 'performance'],
        views: 4100,
      }
    ]
  },
  {
    id: 'dsa',
    name: 'DSA',
    description: 'Data Structures & Algorithms',
    questionCount: 1,
    questions: [
      {
        id: 'dsa-1',
        title: 'Reverse a Linked List',
        summary: 'A classic question involving pointer manipulation.',
        content: '<p>Given the head of a singly linked list, reverse the list and return its head.</p>',
        solution: '```js\nfunction reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n```',
        difficulty: 'Medium',
        tags: ['dsa', 'linked-list', 'pointers'],
        views: 8900,
      }
    ]
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Large-scale system design',
    questionCount: 1,
    questions: [
      {
        id: 'sd-1',
        title: 'Design a URL Shortener',
        summary: 'How to build a scalable TinyURL service.',
        content: '<p>Outline the components and architecture for a service like bit.ly.</p>',
        solution: '### Key components:\n\n- API Gateway\n- Hashing algorithm (Base62)\n- Database (NoSQL or SQL with indexing)\n- Caching layer (Redis)\n- Redirection logic',
        difficulty: 'Hard',
        tags: ['system-design', 'scalability', 'api'],
        views: 12000,
      }
    ]
  }
];
