import { type Blog } from '../types/blog';

export const MOCK_BLOGS: Blog[] = [
    {
        id: '1',
        slug: 'ai-blogging-assistant',
        title: 'Building an AI Blogging Assistant Powered by Gemini',
        excerpt:
            'How I added a Gemini-powered writing assistant to my portfolio blog — title suggestions, content polish, and reader summaries, all in one.',
        content: `# Building an AI Blogging Assistant Powered by Gemini

Writing consistently is hard. Coming up with good titles is even harder. So I decided to stop fighting the blank page and build something to help.

But before I landed on the current Gemini-powered setup, I had a bit of a "negotiation" with OpenAI.

## The "Token Gate" Incident
We actually started development using OpenAI. Everything was going fine until we hit the "First Token" barrier. OpenAI wanted me to pay upfront for credits before I could even test the integration in my local dev environment.

**My reaction?** I refused.

As a self-taught developer building a personal project, I wanted a partner that was free-tier friendly and didn't lock the door before I even stepped inside. That's when we switched to **Google Gemini 1.5 Flash**. It gave me a generous free tier that let me build and break things without checking my wallet every five minutes.

## What It Can Do

### Smart Title Suggestions
The assistant generates five distinct title variations for any draft. Each one is short, punchy, and written in plain language. You can preview them before applying — no guessing, no copy-pasting.

### Content Enhancement
With one click, the assistant scans your Markdown and returns clarity suggestions. It does not rewrite your voice. It just finds the spots where a sentence runs too long or an idea is buried, and offers a cleaner version.

### AI Snapshot for Readers
Not every reader has time for a full article. I added a summary button on each post page that calls Gemini and returns a two-to-three sentence overview. Readers get the big picture fast. If they want more, the full post is right there.

## How the Integration Works

The backend acts as a secure proxy. The frontend never touches the API key directly. When a request comes in, a Java Spring Boot controller formats the prompt, calls the Gemini API, and returns a structured JSON response.

This approach means the UI can render the AI output as selectable options — not a wall of text. It also means rate limiting and key management stay on the server side where they belong.

## Why Gemini 1.5 Flash

I chose Flash over the heavier models for one reason: speed. The context window is large enough for any blog post, and the response time is fast enough to feel instant in the editor. For a writing tool, latency matters more than raw capability.

It is a small feature on the surface, but it changed how I write. Having a title generator and a readability pass available in the same tab removes most of the friction that used to make posting feel like a chore.`,
        isPremium: false,
        createdAt: new Date('2026-04-21').toISOString(),
        updatedAt: new Date('2026-04-21').toISOString(),
        readTime: '4 min read',
    },

    {
        id: '2',
        slug: 'modern-portfolio-architecture',
        title: 'Building a Modern Portfolio: AI, Interview Prep, and Daily Challenges',
        excerpt:
            'A behind-the-scenes look at how I built my portfolio using Spring Boot, React, and Gemini — and why I made it more than just a static resume.',
        content: `# Building a Modern Portfolio: AI, Interview Prep, and Daily Challenges

When I started building this portfolio, I had one rule: it should not be a static resume.

A static resume lists what you have done. I wanted something that shows how you think and what you can build. So I treated the portfolio itself as a real engineering project — with a backend, a database, an AI integration, and a handful of features that actually solve problems I care about.

## The Core Architecture

The project is split into two layers that talk to each other over REST.

The **backend** runs on Java 21 and Spring Boot. PostgreSQL handles data persistence, and Flyway manages every schema change with versioned migration files. Nothing gets applied to the database without a migration script. It keeps the schema clean and auditable from day one.

The **frontend** is a Vite and React setup. I used Framer Motion for page transitions and built a custom CSS module design system rather than pulling in a full component library. Everything you see is hand-crafted, which means it looks like a personal project and not a Bootstrap template.

## The AI Integration

The standout feature is the AI Blogging Assistant, powered by Gemini 1.5 Flash through a secure Java proxy.

On the writing side, it helps me generate title options and polish Markdown content without leaving the editor. On the reading side, there is a Summarizer button that generates a quick snapshot of any article. I rate-limit the free tier to three summaries per session using a \`localStorage\` counter — simple, but effective for protecting API usage without needing an auth system.

## More Than Just Blogs

The portfolio serves a few distinct purposes beyond writing.

The **Interview Prep Hub** is a structured space for technical study. It has categorized question sets, SEO-friendly slugs, and a clean layout built for focused reading — not skimming.

The **Wake-Up Challenge** is a daily check-in tracker with streak logic. I built it because I wanted to understand date arithmetic in Java and React. It turned into something I actually use every morning.

The **Dynamic Roadmap** is an interactive SVG and CSS grid visualization of learning paths. It bridges the gap between a flat list of topics and something you can actually navigate.

## Security Considerations

Even in a personal project, keys do not belong in the codebase.

Every sensitive value — Gemini, database credentials, EmailJS — lives in environment variables. The production build runs in a multi-stage Docker container on Google Cloud Run, where secrets are managed by Cloud Secret Manager and never touch the repository.

It is more setup than a personal project technically needs. But doing it right once means you never have to undo a mistake later.`,
        isPremium: false,
        createdAt: new Date('2026-04-15').toISOString(),
        updatedAt: new Date('2026-04-15').toISOString(),
        readTime: '6 min read',
    },

    {
        id: '3',
        slug: 'self-taught-developer-journey',
        title: 'What Nobody Tells You About Being a Self-Taught Developer',
        excerpt:
            'Self-teaching is not about finding the right course. It is about being willing to break things, fix them, and build again.',
        content: `# What Nobody Tells You About Being a Self-Taught Developer

Nobody taught me to code in a classroom. Everything I know came from reading documentation, breaking things in the terminal, and slowly figuring out why.

That is not a humble-brag. It is just how it went. And honestly, I would not trade the process.

## The Loop That Actually Works

My learning style comes down to a simple cycle: identify a problem you care about, learn the minimum required to start, build something, break it, and fix it.

The "minimum required" part is important. You do not need to finish a course before you start building. I started this portfolio with a blank \`pom.xml\` and a \`package.json\`. I had never configured Hibernate before. I had never set up a Docker multi-stage build. I learned both by needing them, not by preparing for them.

The frustration of staring at a red console is not a sign that you are doing it wrong. It is the whole process. The day you stop finding errors uncomfortable is the day learning gets faster.

## Using AI as a Mentor, Not a Crutch

The self-taught path used to mean hours digging through Stack Overflow threads from 2014. Now it means having a conversation.

I use AI to help me understand patterns I have not seen before — things like Spring Interceptors, DTO mapping, or how to structure a clean service layer. I do not ask it to write the code for me. I ask it to explain the concept, then I write the code myself and see what breaks.

The distinction matters. Using AI to shortcut understanding is a trap. Using it to accelerate understanding is a genuine advantage that did not exist five years ago.

## Building Your Own Tools Teaches You More Than Any Tutorial

The fastest way to understand state management is to build something where state management actually matters.

By building my own blogging platform instead of using WordPress, I had to figure out how to sync \`localStorage\` with React state across multiple pages. By building my own interview prep section instead of using Notion, I had to think about URL structure, SEO slugs, and how data flows from a REST API to a rendered component.

Pre-built tools hide the complexity. Building from scratch forces you to confront it.

## The Philosophy in One Sentence

Do not wait for a certificate to start building.

I built the Wake-Up Challenge because I wanted to understand date logic. I built the DSA Roadmap because I wanted to understand SVG rendering. Every feature on this site exists because I had a question I could only answer by writing the code.

That is the whole thing. Pick a problem. Build toward it. The learning follows.`,
        isPremium: false,
        createdAt: new Date('2026-04-08').toISOString(),
        updatedAt: new Date('2026-04-08').toISOString(),
        readTime: '5 min read',
    },

    {
        id: '4',
        slug: 'spring-boot-vs-node-backend',
        title: 'Why I Chose Spring Boot Over Node for My Portfolio Backend',
        excerpt:
            'A practical look at why a self-taught developer picked Java and Spring Boot — and what I learned about backend architecture along the way.',
        content: `# Why I Chose Spring Boot Over Node for My Portfolio Backend

When most developers build a personal project, they reach for Node.js. It is fast to set up, the ecosystem is huge, and you stay in JavaScript all the way through.

I went a different direction. My portfolio backend runs on Java 21 and Spring Boot. Here is why.

## I Wanted to Learn Something That Would Transfer

Node is great, but I had already used it. I wanted the backend of this project to teach me something I did not already know.

Java and Spring Boot are the standard in enterprise environments. Learning how to structure a Spring application — service layers, repositories, DTOs, dependency injection — gave me patterns that show up in large codebases everywhere. Building a personal project in Spring Boot was the fastest way to get comfortable with those patterns without a job breathing down my neck.

## The Structure Forces Good Habits

Spring Boot nudges you toward a clean architecture whether you want it or not.

Controllers handle HTTP. Services handle business logic. Repositories handle data access. When I first set this up, the structure felt like overhead for a small project. A few weeks in, it saved me every time I needed to add a feature or change a database query without touching the API layer.

## Flyway Changed How I Think About Databases

Before this project, I treated database schema as something you just set up once and forget.

Flyway fixed that. Every schema change — adding a column, creating a table, renaming a field — goes through a versioned migration file. The migrations run automatically on startup. If something breaks, you know exactly which migration caused it and when.

It is a small practice that makes the database feel as version-controlled as the code. I will use it on every project going forward.

## What I Would Tell Someone Considering the Same Choice

If you already know Node and want to grow, building something real in Spring Boot is worth the initial friction.

The first week is rough. The dependency injection model, the annotation-heavy configuration, the verbosity of Java compared to JavaScript — it all feels like too much at once. Push through it. By week two, the structure starts to feel like an asset rather than a burden.

The best way to learn a framework is to build something you actually want to finish. That pressure keeps you going when the documentation gets dense.`,
        isPremium: false,
        createdAt: new Date('2026-03-28').toISOString(),
        updatedAt: new Date('2026-03-28').toISOString(),
        readTime: '5 min read',
    },

    {
        id: '5',
        slug: 'interactive-dsa-roadmap',
        title: 'How I Built a DSA Roadmap You Can Actually Navigate',
        excerpt:
            'Flat lists of topics do not help you see the path. Here is how I built an interactive roadmap using SVG and CSS grid to make learning DSA feel less overwhelming.',
        content: `# How I Built a DSA Roadmap You Can Actually Navigate

Every DSA study guide I found online was a list. A long, flat, alphabetically sorted list of topics with no sense of order or priority.

That format does not help. When you are starting out, you do not know which topics depend on which others, or which ones to tackle first, or where you actually are in the process. You just see a wall of terms and feel behind.

So I built my own.

## The Problem with Flat Lists

A list implies that every item has equal weight and no relationship to anything else. That is not true for DSA.

Arrays come before dynamic programming. Recursion comes before trees. Hash maps unlock a whole class of problems that are otherwise much harder. The sequence matters, and a list does not show it.

What I wanted was a visual that let you see the path — where you are, what you have covered, and what comes next.

## Building the Roadmap with SVG and CSS Grid

The roadmap is built with a combination of SVG lines and CSS grid positioning.

Each topic sits in a grid cell. The SVG layer sits on top and draws connecting lines between cells to show dependencies. When you mark a topic as complete, the cell updates its style and the connecting lines reflect the progress visually.

The trickiest part was keeping the SVG lines aligned with the grid cells across different screen sizes. Grid is responsive by nature, but SVG coordinates are absolute. I ended up calculating connection points dynamically using \`getBoundingClientRect\` and updating them on resize. It is not the most elegant solution, but it works reliably.

## What I Learned Building It

SVG is more capable than I expected. Drawing lines, adding arrowheads with markers, and animating paths on scroll are all well within what plain SVG can handle without a library.

CSS grid is still the right choice for the layout. Trying to position everything in SVG would have been a nightmare to maintain.

The feature also taught me something about React state I had not fully internalized before: when state drives a visual layout, the rendering logic gets complex fast. Keeping the data model separate from the visual model — topics in one structure, positions in another — made the component much easier to reason about.

## Why It Matters

The roadmap is not the most technically impressive feature on this site. But it is one of the most useful.

Every time I sit down to study, I open it first. It tells me where I left off and what to do next. That is the whole goal. A good tool should make the decision for you so you can spend your energy on the actual work.`,
        isPremium: true,
        createdAt: new Date('2026-03-18').toISOString(),
        updatedAt: new Date('2026-03-18').toISOString(),
        readTime: '6 min read',
    },
];