export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  title: string;
  slug: string;
  summary: string;
  contentHtml: string;
  solutionMd: string;
  difficulty: Difficulty;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  tags: string[];
  views: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
  type: 'CATEGORY' | 'YOUTUBE_SET';
  questionCount: number;
  questions: Question[];
}

export const interviewData: Category[] = [
  {
    id: 1,
    name: 'JavaScript',
    description: 'Core JS interview questions',
    type: 'CATEGORY',
    questionCount: 3,
    questions: [
      {
        id: 'js-1',
        title: 'What is a Closure?',
        slug: 'what-is-a-closure',
        summary: 'A closure is the combination of a function bundled together with references to its surrounding state.',
        contentHtml: '<p>A <strong>closure</strong> gives you access to an outer function\'s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.</p><pre><code>function init() {\n  var name = "Mozilla"; // name is a local variable created by init\n  function displayName() {\n    // displayName() is the inner function, a closure\n    console.log(name); // use variable declared in the parent function\n  }\n  displayName();\n}\ninit();</code></pre>',
        solutionMd: 'Closures are useful because they let you associate data (the lexical environment) with a function that operates on that data. This has obvious parallels to object-oriented programming, where objects allow you to associate data (the object\'s properties) with one or more methods.\n\n- Data encapsulation\n- Private variables\n- Event handlers and callbacks',
        difficulty: 'Easy',
        status: 'PUBLISHED',
        tags: ['javascript', 'functions', 'scope'],
        views: 1250,
      },
      {
        id: 'js-2',
        title: 'Difference between let, const and var',
        slug: 'difference-between-let-const-and-var',
        summary: 'Variable declaration keywords with different scoping and reassignment rules.',
        contentHtml: '<p>Explain the differences between <code>var</code>, <code>let</code>, and <code>const</code> in terms of scope, hoisting, and reassignment.</p>',
        solutionMd: '- **var:** Function scoped, hoisted, can be redeclared and reassigned.\n- **let:** Block scoped, not hoisted (TDZ), cannot be redeclared, can be reassigned.\n- **const:** Block scoped, not hoisted (TDZ), cannot be redeclared or reassigned.',
        difficulty: 'Easy',
        status: 'PUBLISHED',
        tags: ['javascript', 'basics', 'variables'],
        views: 3400,
      },
      {
        id: 'js-3',
        title: 'Explain Event Delegation',
        slug: 'explain-event-delegation',
        summary: 'A pattern that leverages event bubbling to handle events at a higher level in the DOM.',
        contentHtml: '<p>Event delegation is a technique where you attach a single event listener to a parent element instead of multiple listeners to each child.</p>',
        solutionMd: 'It works because of **event bubbling**. When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.\n\n### Benefits:\n\n- Memory efficiency\n- Simplifies dynamic element handling',
        difficulty: 'Medium',
        status: 'PUBLISHED',
        tags: ['javascript', 'dom', 'events'],
        views: 2100,
      }
    ]
  },
  {
    id: 2,
    name: 'React',
    description: 'React fundamentals & hooks',
    type: 'CATEGORY',
    questionCount: 2,
    questions: [
      {
        id: 'react-1',
        title: 'What are React Hooks?',
        slug: 'what-are-react-hooks',
        summary: 'Hooks allow function components to use state and other React features.',
        contentHtml: '<p>Hooks are functions that let you "hook into" React state and lifecycle features from function components.</p>',
        solutionMd: 'Common hooks include:\n\n- `useState`: For local state\n- `useEffect`: For side effects\n- `useContext`: For consuming context\n- `useRef`: For persistent values and DOM access',
        difficulty: 'Easy',
        status: 'PUBLISHED',
        tags: ['react', 'hooks'],
        views: 5200,
      },
      {
        id: 'react-2',
        title: 'Virtual DOM vs Real DOM',
        slug: 'virtual-dom-vs-real-dom',
        summary: 'How React optimizes updates using a virtual representation of the UI.',
        contentHtml: '<p>Explain how React\'s Virtual DOM improves performance compared to direct DOM manipulation.</p>',
        solutionMd: 'The Virtual DOM is a lightweight copy of the Real DOM. When state changes, React creates a new virtual tree, compares it with the old one (diffing), and calculates the minimal set of changes needed to update the Real DOM (reconciliation).',
        difficulty: 'Medium',
        status: 'PUBLISHED',
        tags: ['react', 'vdom', 'performance'],
        views: 4100,
      }
    ]
  },
  {
    id: 3,
    name: 'DSA',
    description: 'Data Structures & Algorithms',
    type: 'CATEGORY',
    questionCount: 1,
    questions: [
      {
        id: 'dsa-1',
        title: 'Reverse a Linked List',
        slug: 'reverse-a-linked-list',
        summary: 'A classic question involving pointer manipulation.',
        contentHtml: '<p>Given the head of a singly linked list, reverse the list and return its head.</p>',
        solutionMd: '```js\nfunction reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n```',
        difficulty: 'Medium',
        status: 'PUBLISHED',
        tags: ['dsa', 'linked-list', 'pointers'],
        views: 8900,
      }
    ]
  },
  {
    id: 4,
    name: 'System Design',
    description: 'Large-scale system design',
    type: 'CATEGORY',
    questionCount: 1,
    questions: [
      {
        id: 'sd-1',
        title: 'Design a URL Shortener',
        slug: 'design-a-url-shortener',
        summary: 'How to build a scalable TinyURL service.',
        contentHtml: '<p>Outline the components and architecture for a service like bit.ly.</p>',
        solutionMd: '### Key components:\n\n- API Gateway\n- Hashing algorithm (Base62)\n- Database (NoSQL or SQL with indexing)\n- Caching layer (Redis)\n- Redirection logic',
        difficulty: 'Hard',
        status: 'PUBLISHED',
        tags: ['system-design', 'scalability', 'api'],
        views: 12000,
      }
    ]
  }
];
