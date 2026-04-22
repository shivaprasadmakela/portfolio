import { type Blog } from '../types/blog';

export const MOCK_BLOGS: Blog[] = [
    {
        id: '1',
        slug: 'ai-blogging-assistant',
        title: 'Building an AI Blogging Assistant: Why I Refused OpenAI and Picked Gemini',
        excerpt:
            'The true story of building a Gemini-powered writing assistant for my portfolio — including the funny moment I ditched OpenAI over upfront token costs.',
        content: `# Building an AI Blogging Assistant: Why I Refused OpenAI and Picked Gemini

Writing consistently is hard. Coming up with good titles is even harder. So I decided to build a co-writer directly into this portfolio. But before I landed on the current Gemini-powered setup, I had a bit of a "negotiation" with OpenAI.

## The "Token Gate" Incident
We actually started development using OpenAI. Everything was going fine until we hit the "First Token" barrier. OpenAI wanted me to pay upfront for credits before I could even test the integration in my local dev environment. 

**My reaction?** I refused. 

As a self-taught developer building a personal project, I wanted a partner that was free-tier friendly and didn't lock the door before I even stepped inside. That's when we switched to **Google Gemini 1.5 Flash**. It gave me the massive context window I needed and, more importantly, a generous free tier that let me build and break things without checking my wallet every five minutes.

## What the Assistant Actually Does
I integrated Gemini directly into my blog editor through a secure **Spring Boot backend proxy**. This keeps my API keys safe while giving the UI superpowers:

- **Smart Title Suggestions**: It generates five distinct title variations for any draft. Each one is short, punchy, and previewable with one click.
- **Content Polish**: It scans Markdown for clarity without scrubbing my original "voice." It’s like having an editor who knows when to shut up.
- **AI Snapshot**: For readers, I added a summary button that generates a quick 2-3 sentence overview.

## Behind the Scenes: The Rate Limiter
To keep my Gemini usage under control, I built a custom **localStorage-based rate limiter**. If a user hits the "Summarize" button more than 3 times, the UI gracefully disables the feature with a "Daily Limit Reached" message. It’s a simple, elegant solution for a portfolio that doesn't need a full authentication system just to protect an API key.

## Technical Choice: Latency over Raw Power
I chose the **1.5 Flash** model over the heavier models for speed. In an editor, you want suggestions to feel instant. Flash provides that "real-time" feeling which makes the tool actually fun to use, rather than a chore you have to wait for.`,
        isPremium: false,
        createdAt: new Date('2026-04-21').toISOString(),
        updatedAt: new Date('2026-04-21').toISOString(),
        readTime: '4 min read',
    },

    {
        id: '2',
        slug: 'modern-portfolio-architecture',
        title: 'Building a Modern Portfolio: Why I Chose a 7-Column CSS Grid over Absolute Positioning',
        excerpt:
            'A deep dive into the architecture of this portfolio, from Flyway database migrations to the technical overhaul of my interactive roadmap.',
        content: `# Building a Modern Portfolio: Why I Chose a 7-Column CSS Grid over Absolute Positioning

When I started building the "Roadmap" section of this portfolio, I initially took the easy route: absolute positioning with fixed XYZ coordinates. It worked for ten minutes—until I resized the window. Everything turned into a jumbled mess of overlapping SVG lines and misaligned boxes.

## The Architectural Pivot: The 7-Column Grid
We decided to scrap the absolute positioning and move to a structured **7-Column CSS Grid architecture**. This was a game changer. By placing the "Core Spine" of the roadmap in Column 4 and pushing sub-topics to Columns 2 and 6, the layout became naturally responsive. 

I used a hybrid approach for the connectors:
- **Solid vertical lines** for the primary learning path.
- **Dashed, curved SVG paths** for side-branches and secondary skills.

It was more mathematically intensive to set up, but it resulted in a "Glassmorphic" aesthetic that stays perfectly aligned on any screen size.

## The Backend: Spring Boot & Flyway
On the backend, I didn't want to just "auto-generate" my database tables. I wanted total control over the schema. That's why we used **Flyway** for database migrations.

Every change to the PostgreSQL database—from adding the initial blog tables to implementing the slug-based navigation we have now—is tracked in a versioned SQL file. This "Migration-First" approach means I can spin up a new local environment or push to **Google Cloud Run** with total confidence that the database schema will match the code.

## Performance & UX
I used **Vite** for the frontend because, frankly, life is too short for slow build times. By leveraging **React Lazy Loading** for the different modules (Blogging, Interview Hub, YouTube showcase), the initial bundle stay tiny, and the user only downloads the code they actually need to see.`,
        isPremium: false,
        createdAt: new Date('2026-04-15').toISOString(),
        updatedAt: new Date('2026-04-15').toISOString(),
        readTime: '6 min read',
    },

    {
        id: '3',
        slug: 'self-taught-developer-journey',
        title: 'The Self-Taught Struggle: Docker Errors, Hibernate Annotations, and Small Wins',
        excerpt:
            'Self-teaching is not a straight line. It is a series of broken builds and technical debt that eventually becomes a finished product.',
        content: `# The Self-Taught Struggle: Docker Errors, Hibernate Annotations, and Small Wins

Nobody taught me to code in a classroom. Everything I know came from reading documentation, breaking things in the terminal, and slowly figuring out why the red text was screaming at me.

## The Day Docker Won (Almost)
If you think being a developer is just writing code, try building a multi-stage **Docker** image for a Java application for the first time. I remember a session where I spent two hours fighting a "COPY failed" error because I hadn't quite grasped how the container's internal filesystem worked compared to my Mac. 

The frustration was real, but that struggle taught me more about the relationship between source code and runtime environments than any tutorial ever could.

## Wrangling the Spring Boot Beast
As a self-taught dev, **Spring Boot**'s annotation model (\`@RestController\`, \`@Service\`, \`@Value\`) felt like magic at first. But when my dependency injections started failing, I had to dig into the Spring IoC container and actually understand what was happening under the hood. 

I didn't just learn how to make it work; I learned **why** it works.

## Using AI as a Force Multiplier
The modern self-taught path has one major advantage: AI. I use **Gemini** to help me bridge my knowledge gaps. Instead of just copy-pasting code, I use it to explain complex concepts—like how a Spring Interceptor differs from a Servlet Filter. 

The goal isn't to let the AI write the code for me. The goal is to use the AI to accelerate my understanding so that I can write the code myself and actually know how to fix it when it inevitably breaks.

## The Best Way to Learn
Do not wait for a certificate. Pick a problem, build a solution, and embrace the frustration of it not working. Every feature on this portfolio exists because I had a question that only code could answer.`,
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
        isPremium: false,
        createdAt: new Date('2026-03-18').toISOString(),
        updatedAt: new Date('2026-03-18').toISOString(),
        readTime: '6 min read',
    },
];