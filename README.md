# 🚀 Full-Stack Portfolio & AI-Enhanced Blog

A high-performance, modern web application designed to showcase professional work while engaging the community through unique **AI-Assisted tools** and a **Wake-Up Challenge**. Built with a focus on visual excellence, clean architecture, and advanced AI integration.

---

## ✨ Key Features

### 🤖 AI-Assisted Blogging System
- **Intelligent Creation**: Interactive blog editor with real-time markdown preview.
- **Smart Tools**: AI-powered features to **Improve Titles**, **Enhance Content** (clarity/grammar), and **Auto-Generate Summaries**.
- **Human-in-the-loop**: Full control over AI suggestions with "Preview before Apply" mechanics.

### 📅 Wake-Up Challenge
- **Discipline Building**: Check-in daily between **5:00 AM - 6:00 AM IST** to maintain your streak.
- **Verification System**: Anti-spam verification questions fetched dynamically from the backend.
- **Live Clock**: Real-time IST clock synchronization for precise window tracking.

### 🏆 Global Leaderboard
- **Dynamic Ranking**: Sorted by current streak and most recent check-in.
- **Top 3 Highlights**: Special visual recognition for the leaders.
- **Status Tracking**: Real-time updates with cache-busting logic for accurate data.


---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animation**: [Framer Motion](https://motion.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: Vanilla CSS Modules (Glassmorphism & High-contrast themes)

### Backend
- **Core**: [Java 21](https://www.oracle.com/java/) + [Spring Boot 4.0.1](https://spring.io/projects/spring-boot)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **HTTP Client**: Spring `RestTemplate` for AI communication
- **External APIs**: OpenAI API / Google Gemini API integration
- **Security**: CORS-protected RESTful APIs with Rate Limiting (**Bucket4j**)

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
   - Add your **OpenAI** or **Gemini** API key to the properties file.
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