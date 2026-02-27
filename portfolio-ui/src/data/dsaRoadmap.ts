import type { DSARoadmapLevel } from '../types/dsa';

export const dsaRoadmap: DSARoadmapLevel[] = [
  // ─── Level 1: Foundation ───────────────────────────────────────────────────
  {
    id: 'level-1',
    level: 'Foundation',
    levelNumber: 1,
    topics: [
      {
        id: 'foundation',
        name: 'Foundation',
        problems: [
          {
            id: 'two-sum',
            name: 'Two Sum',
            difficulty: 'Easy',
            tags: ['Array', 'Hash Map'],
            leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
          },
          {
            id: 'running-sum',
            name: 'Running Sum of 1D Array',
            difficulty: 'Easy',
            tags: ['Array', 'Prefix Sum'],
            leetcodeUrl: 'https://leetcode.com/problems/running-sum-of-1d-array/',
          },
          {
            id: 'third-max',
            name: 'Third Maximum Number',
            difficulty: 'Easy',
            tags: ['Array', 'Sorting'],
            leetcodeUrl: 'https://leetcode.com/problems/third-maximum-number/',
          },
          {
            id: 'even-digits',
            name: 'Find Numbers with Even Number of Digits',
            difficulty: 'Easy',
            tags: ['Array', 'Math'],
            leetcodeUrl: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/',
          },
          {
            id: 'largest-twice',
            name: 'Largest Number At Least Twice of Others',
            difficulty: 'Easy',
            tags: ['Array', 'Sorting'],
            leetcodeUrl: 'https://leetcode.com/problems/largest-number-at-least-twice-of-others/',
          },
          {
            id: 'reverse-integer',
            name: 'Reverse Integer',
            difficulty: 'Medium',
            tags: ['Math', 'Overflow'],
            leetcodeUrl: 'https://leetcode.com/problems/reverse-integer/',
          },
          {
            id: 'palindrome-number',
            name: 'Palindrome Number',
            difficulty: 'Easy',
            tags: ['Math', 'Modulo'],
            leetcodeUrl: 'https://leetcode.com/problems/palindrome-number/',
          },
          {
            id: 'sqrt',
            name: 'Sqrt(x)',
            difficulty: 'Easy',
            tags: ['Math', 'Binary Search'],
            leetcodeUrl: 'https://leetcode.com/problems/sqrtx/',
          },
          {
            id: 'binary-search',
            name: 'Binary Search',
            difficulty: 'Easy',
            tags: ['Binary Search', 'Array'],
            leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
          },
          {
            id: 'find-min-rotated',
            name: 'Find Minimum in Rotated Sorted Array',
            difficulty: 'Medium',
            tags: ['Binary Search', 'Array'],
            leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
          },
        ],
      },
    ],
  },

  // ─── Level 2: Arrays ──────────────────────────────────────────────────────
  {
    id: 'level-2',
    level: 'Arrays',
    levelNumber: 2,
    topics: [{ id: 'arrays', name: 'Arrays', problems: [] }],
  },

  // ─── Level 3: Linked List ─────────────────────────────────────────────────
  {
    id: 'level-3',
    level: 'Linked List',
    levelNumber: 3,
    topics: [{ id: 'linked-list', name: 'Linked List', problems: [] }],
  },

  // ─── Level 4: Strings ─────────────────────────────────────────────────────
  {
    id: 'level-4',
    level: 'Strings',
    levelNumber: 4,
    topics: [{ id: 'strings', name: 'Strings', problems: [] }],
  },

  // ─── Level 5: Stack and Queues ────────────────────────────────────────────
  {
    id: 'level-5',
    level: 'Stack and Queues',
    levelNumber: 5,
    topics: [{ id: 'stack-queues', name: 'Stack and Queues', problems: [] }],
  },

  // ─── Level 6: Binary Search Algorithm ────────────────────────────────────
  {
    id: 'level-6',
    level: 'Binary Search Algorithm',
    levelNumber: 6,
    topics: [{ id: 'binary-search-algo', name: 'Binary Search Algorithm', problems: [] }],
  },

  // ─── Level 7: Two Pointers & Sliding Window ───────────────────────────────
  {
    id: 'level-7',
    level: 'Two Pointers & Sliding Window',
    levelNumber: 7,
    topics: [{ id: 'two-pointers-sliding', name: 'Two Pointers & Sliding Window', problems: [] }],
  },

  // ─── Level 8: Binary Tree ─────────────────────────────────────────────────
  {
    id: 'level-8',
    level: 'Binary Tree',
    levelNumber: 8,
    topics: [{ id: 'binary-tree', name: 'Binary Tree', problems: [] }],
  },

  // ─── Level 9: Binary Search Tree ──────────────────────────────────────────
  {
    id: 'level-9',
    level: 'Binary Search Tree',
    levelNumber: 9,
    topics: [{ id: 'bst', name: 'Binary Search Tree', problems: [] }],
  },

  // ─── Level 10: Heap ───────────────────────────────────────────────────────
  {
    id: 'level-10',
    level: 'Heap',
    levelNumber: 10,
    topics: [{ id: 'heap', name: 'Heap', problems: [] }],
  },
];
