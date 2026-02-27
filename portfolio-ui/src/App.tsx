import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/admin/ProtectedRoute';
import BackgroundDecoration from './components/BackgroundDecoration';
import PageLoader from './components/PageLoader';

// Lazy-loaded pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const BlogList = lazy(() => import('./pages/BlogList'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const MyYoutube = lazy(() => import('./pages/MyYoutube'));
const WakeUpChallenge = lazy(() => import('./pages/WakeUpChallenge'));
const DSARoadmap = lazy(() => import('./pages/dsa/DSARoadmap'));

// Interview Pages (all API-driven, slug-based)
const InterviewHub = lazy(() => import('./pages/interview/InterviewHub'));
const SetsHub = lazy(() => import('./pages/interview/SetsHub'));
const CollectionDetail = lazy(() => import('./pages/interview/CollectionDetail'));

// Admin Pages (lazy-loaded)
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const AdminQuestionSets = lazy(() => import('./pages/admin/AdminQuestionSets'));
const AdminConfiguration = lazy(() => import('./pages/admin/AdminConfiguration'));

// Error Pages (lazy-loaded)
const NotFound = lazy(() => import('./pages/error/NotFound'));
const Forbidden = lazy(() => import('./pages/error/Forbidden'));

function App() {
  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      cache: 'no-store',
    }).catch(() => { });
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <BackgroundDecoration />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/my-youtube" element={<MyYoutube />} />
          <Route path="/challenge" element={<WakeUpChallenge />} />
          <Route path="/dsa" element={<DSARoadmap />} />

          {/* Interview Routes (slug-based) */}
          <Route path="/interview" element={<InterviewHub />} />
          <Route path="/interview/sets" element={<SetsHub />} />
          <Route path="/interview/collection/:slug" element={<CollectionDetail />} />

          {/* Legacy redirects for old routes */}
          <Route path="/interview-prep" element={<Navigate to="/interview" replace />} />
          <Route path="/interview-prep/:categoryId" element={<Navigate to="/interview" replace />} />
          <Route path="/youtube-sets" element={<Navigate to="/interview/sets" replace />} />
          <Route path="/youtube-sets/:videoId" element={<Navigate to="/interview/sets" replace />} />

          {/* Admin Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="question-sets" element={<AdminQuestionSets />} />
            <Route path="configuration" element={<AdminConfiguration />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Error Routes */}
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
