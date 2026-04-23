# 🚀 Full-Stack Portfolio & AI-Enhanced Blog

A high-performance, modern web application designed to showcase professional work while engaging the community through unique **AI-Assisted tools**, a **Wake-Up Challenge**, and a **Global Leaderboard**.

---

## ✨ Key Features

### 🤖 AI-Enhanced Blogging System
- **Intelligent Creation**: Interactive blog editor with real-time markdown preview.
- **Smart Tools**: AI-powered features to **Improve Titles**, **Enhance Content**, and **Auto-Generate Summaries** using Gemini AI.
- **Persistent Logic**: Advanced synchronization between source-of-truth mock data and `localStorage` to preserve AI summaries and user state.
- **Premium Experience**: Gated content system with blurred previews, custom unlock overlays, and interactive "premium" feedback.

### 📅 Wake-Up Challenge
- **Discipline Building**: Check-in daily between **5:00 AM - 6:00 AM IST** to maintain your streak.
- **Verification System**: Anti-spam verification questions fetched dynamically from the backend.
- **Live Clock**: Real-time IST clock synchronization for precise window tracking.

### 🏆 Global Leaderboard
- **Dynamic Ranking**: Sorted by current streak and most recent check-in.
- **Top 3 Highlights**: Special visual recognition for the leaders.
- **Status Tracking**: Real-time updates with cache-busting logic for accurate data.

### 📱 Premium Mobile UX
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Clean Interface**: Glassmorphic aesthetic with a focus on typography and readability.
- **Dynamic Loading**: Rotating AI loading messages for a responsive feel during generation.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animation**: [Framer Motion](https://motion.dev/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/react-gfm)
- **Styling**: Vanilla CSS Modules (Glassmorphism & High-contrast themes)

### Backend
- **Core**: [Java 21](https://www.oracle.com/java/) + [Spring Boot 3.4](https://spring.io/projects/spring-boot)
- **AI Interface**: Google Gemini AI integration for content processing.
- **Security**: CORS-protected RESTful APIs with Rate Limiting (**Bucket4j**).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- JDK 21
- Maven 3.9+
- PostgreSQL 16+

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Backend Configuration**
   - Create a PostgreSQL database named `portfolio`.
   - Update `portfolio-backend/src/main/resources/application.properties` with your database credentials.
   - Run the backend:
     ```bash
     cd portfolio-backend
     ./mvnw spring-boot:run
     ```

3. **Frontend Configuration**
   - Install dependencies and start the dev server:
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