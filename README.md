# 🚀 Full-Stack Portfolio & Discipline Tracker

A high-performance, modern web application designed to showcase professional work while engaging the community through a unique **Wake-Up Challenge**. Built with a focus on visual excellence, real-time synchronization, and robust backend architecture.

---

## ✨ Key Features

### 📅 Wake-Up Challenge
- **Discipline Building**: Check-in daily between **5:00 AM - 6:00 AM IST** to maintain your streak.
- **Verification System**: Anti-spam verification questions fetched dynamically from the backend.
- **Live Clock**: Real-time IST clock synchronization for precise window tracking.

### 🏆 Global Leaderboard
- **Dynamic Ranking**: Sorted by current streak and most recent check-in.
- **Top 3 Highlights**: Special visual recognition for the leaders.
- **Status Tracking**: Real-time updates with cache-busting logic for accurate data.

### 🎨 Premium Portfolio UI
- **3D Integration**: Interactive elements powered by **Three.js** and **React Three Fiber**.
- **Smooth Animations**: High-fidelity transitions using **Framer Motion**.
- **Responsive Design**: Mobile-first approach with fluid layouts and modern aesthetics.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animation**: [Framer Motion](https://motion.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: Vanilla CSS Modules (Glassmorphism & Vibrant palettes)
- **Content**: [React Markdown](https://github.com/remarkjs/react-markdown) for blogs

### Backend
- **Core**: [Java 21](https://www.oracle.com/java/) + [Spring Boot 4.0.1](https://spring.io/projects/spring-boot)
- **Database**: [MySQL](https://www.mysql.com/)
- **Migrations**: [Flyway](https://flywaydb.org/)
- **Security**: CORS-protected RESTful APIs
- **Utility**: Lombok and **Bucket4j** for rate limiting

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- JDK 21
- Maven 3.9+
- MySQL Instance

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Backend Configuration**
   - Create a database named `portfolio`.
   - Update `portfolio-backend/src/main/resources/application.properties` with your database credentials.
   - Run the backend:
     ```bash
     cd portfolio-backend
     mvn spring-boot:run
     ```

3. **Frontend Configuration**
   - Create a `.env` file in `portfolio-ui/`.
   - Add the following:
     ```env
     VITE_API_BASE_URL=http://localhost:8080
     VITE_TEST_MODE=false
     ```
   - Install dependencies and start:
     ```bash
     cd portfolio-ui
     npm install
     npm run dev
     ```

---

## 📡 API Overview (Challenges)
- `GET /api/challenges/question`: Fetch daily verification question.
- `GET /api/challenges/leaderboard`: Get current rankings (Cache-busted).
- `POST /api/challenges/checkin`: Submit daily wake-up proof.

---

## 👨‍💻 Developer
**Shivaprasad M**  
*Full-Stack Developer*  
[shivaprasadm.in](https://www.shivaprasadm.in)