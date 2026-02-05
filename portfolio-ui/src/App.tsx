import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/admin/ProtectedRoute';
import BackgroundDecoration from './components/BackgroundDecoration';
import PageLoader from './components/PageLoader';

// Lazy-loaded pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const BlogList = lazy(() => import('./pages/BlogList'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const MyYoutube = lazy(() => import('./pages/MyYoutube'));
const CategoryGrid = lazy(() => import('./pages/interview/CategoryGrid'));
const QuestionListView = lazy(() => import('./pages/interview/QuestionListView'));
const YoutubeSetsHub = lazy(() => import('./pages/interview/YoutubeSetsHub'));
const VideoQuestionList = lazy(() => import('./pages/interview/VideoQuestionList'));
const WakeUpChallenge = lazy(() => import('./pages/WakeUpChallenge'));

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
          <Route path="/interview-prep" element={<CategoryGrid />} />
          <Route path="/interview-prep/:categoryId" element={<QuestionListView />} />
          <Route path="/youtube-sets" element={<YoutubeSetsHub />} />
          <Route path="/youtube-sets/:videoId" element={<VideoQuestionList />} />
          <Route path="/challenge" element={<WakeUpChallenge />} />

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
