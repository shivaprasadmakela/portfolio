# 🚀 Full-Stack Portfolio & AI-Enhanced Hub

A high-performance, modern web application designed to showcase professional work while engaging the community through unique **AI-Assisted tools**, a **Wake-Up Challenge**, and a **Global Leaderboard**.

---

## ✨ Key Features

### 🤖 Resilient AI-Enhanced Blogging & Chat System
- **Snappy Response Latency**: Integrated **Gemini 3.1 Flash Lite** (`gemini-flash-lite-latest`) to bypass heavy model reasoning times and provide extremely fast responses (~1.5s).
- **API Token Pool Failover**: Supports comma-separated keys (`GEMINI_API_KEYS` and `OPENROUTER_API_KEYS`) in environment variables.
- **Dynamic Cooldown Block**: Automatically blocks rate-limited keys (HTTP 429) for **1 hour** and fails over sequentially to the next available token.
- **OpenRouter Fallback**: Integrates high-availability fallback to OpenRouter when all primary Gemini keys are blocked or down.
- **Smart Blog Tools**: AI-assisted options to **Improve Titles**, **Enhance Content**, and **Auto-Generate Summaries** directly inside the Markdown editor.
- **Interactive Portfolio Chat**: AI-mascot assistant that securely handles query parsing on the backend proxy and answers questions about the developer's experience, resume, and projects.

### 📅 Wake-Up Challenge & Streaks
- **Discipline Building**: Check-in daily between **5:00 AM - 7:00 AM IST** to maintain your streak.
- **Verification System**: Anti-spam verification questions fetched dynamically from the database.
- **Supabase Integration**: Stores user profiles, streaks, and check-ins in a PostgreSQL database hosted on Supabase.
- **Graceful DB Initialization**: Startup database seeding is isolated and protected, preventing server crashes on Cloud Run if connection/migration issues occur during scaling.

### 🏆 Global Leaderboard
- **Dynamic Ranking**: Real-time caching with cache-busting logic, sorting active users by current streak and most recent check-in.
- **Visual Highlights**: Top 3 early risers highlight display on the dashboard.

### 📱 Premium Mobile UX
- **Responsive Aesthetics**: Fully responsive custom-designed interface utilizing custom CSS Modules.
- **Performance Optimized**: Structured lazy loading and Framer Motion micro-animations for high-fidelity interactive elements.

---

## 🛠️ Codebase Architecture

The project has been refactored into a clean, modular structure. For a detailed breakdown of the changes (comparing previous legacy code to the refactored architecture), see [recent_changes.md](file:///Users/shivaprasad/Documents/Projects/portfolio/recent_changes.md).

### Frontend (`portfolio-ui`)
- **`src/features/`**: Feature-grouped modules (`ai`, `blog`, `challenge`, `interview`, `admin`, `user`) where pages, components, hooks, types, and api endpoints are kept co-located.
- **`src/shared/`**: Common assets, stores (Zustand), UI components, utils (date/time helpers), and the core `apiClient`.
- **`src/app/`**: Application routing, main layout wrappers, and global setup.

### Backend (`portfolio-backend`)
- **Controllers $\rightarrow$ Services $\rightarrow$ Repositories**: Classic Spring Boot architecture separating API endpoints, business logic, and database access.
- **AI Clients**: Abstracted `AiClient` interface implemented by `DirectGeminiClient`, `OpenRouterClient`, and `FallbackAiClient`.

---

## 💻 Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animation**: [Framer Motion](https://motion.dev/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/react-gfm)
- **Styling**: Vanilla CSS Modules (Glassmorphism & High-contrast themes)

### Backend
- **Core**: [Java 21/25](https://www.oracle.com/java/) + [Spring Boot 4.0.1](https://spring.io/projects/spring-boot)
- **Database**: PostgreSQL 16 (hosted on Supabase)
- **Security**: CORS-protected REST APIs with Rate Limiting (**Bucket4j**)
- **Deployment**: Google Cloud Run (Docker multi-stage container)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- JDK 21 or 25
- Maven 3.9+
- PostgreSQL 16+

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Environment Configuration**
   Create a `.env` file in `portfolio-backend/` containing:
   ```env
   GEMINI_API_KEY=your_single_key
   GEMINI_API_KEYS=key1,key2,key3
   OPENROUTER_API_KEY=your_single_key
   OPENROUTER_API_KEYS=key1,key2,key3
   DATABASE_URL=jdbc:postgresql://<host>:<port>/portfolio
   ```

3. **Backend Setup**
   Run the backend locally:
   ```bash
   cd portfolio-backend
   ./mvnw spring-boot:run
   ```

4. **Frontend Setup**
   Install dependencies and start the Vite dev server:
   ```bash
   cd portfolio-ui
   npm install
   npm run dev
   ```

---

## 👨‍💻 Developer
**Shivaprasad M**  
*Full-Stack Developer*  
[shivaprasadm.in](https://www.shivaprasadm.in)