import type { Question } from './interviewData';

export interface YoutubeVideoSet {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  publishDate: string;
  questionCount: number;
  tags: string[];
  questions: Question[];
}

export const youtubeQuestionData: YoutubeVideoSet[] = [
  {
    id: 'lKLdDy9v-_w',
    title: 'My Interview Experience Full Stack Developer: Insights & Tips',
    thumbnailUrl: 'https://i.ytimg.com/vi/eWaEQ39XHNI/hqdefault.jpg',
    description: 'My Interview Experience Full Stack Developer: Insights & Tips',
    publishDate: 'Oct 15, 2025',
    questionCount: 1,
    tags: ['interview', 'communication'],
    
    questions: [

      {
        id: 'yt1-q1',
        title: 'Self Introduction',
        slug: 'self-introduction',
        summary: 'Introduce yourself clearly in an interview.',
        contentHtml: '<p>Give a structured self-introduction suitable for any candidate.</p>',
        solutionMd: `### 👋 How to Give a Strong Self-Introduction

A **good intro is short, structured and real.**

#### 📌 Structure

1️⃣ **Who you are**
2️⃣ **Your experience / learning**
3️⃣ **Your projects / skills**
4️⃣ **What you are looking for**

---

### ✅ Example (Beginner Friendly)

Hi, my name is **Shiva**. I am a self-taught Frontend / Full-Stack developer.  
I have worked on projects like a **To-Do App and a Job Portal**, where I built features like authentication, CRUD operations, responsive UI, and API integrations.

I mainly work with **HTML, CSS, JavaScript and React**, and I am currently improving my backend skills with **Node.js & SQL**.  

I enjoy solving real-world problems and learning new tools.  
I’m looking for a role where I can contribute, learn from a strong team, and grow as a developer.

---

### 🎯 Interviewer Wants To See

✔ Clear communication  
✔ Logical career story  
✔ Confidence without ego  
✔ REAL projects (not buzzwords)  

---

### ⚠ Avoid

❌ Life story  
❌ Reading like a script  
❌ Only theory — mention projects`,
        difficulty: 'Easy',
        status: 'PUBLISHED',
        tags: ['interview', 'communication'],
        views: 1200
      }
    ]
  }
];
