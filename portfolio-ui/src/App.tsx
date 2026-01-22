import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import MyYoutube from './pages/MyYoutube';
import CategoryGrid from './pages/interview/CategoryGrid';
import QuestionListView from './pages/interview/QuestionListView';
import YoutubeSetsHub from './pages/interview/YoutubeSetsHub';
import VideoQuestionList from './pages/interview/VideoQuestionList';
import WakeUpChallenge from './pages/WakeUpChallenge';
import ScrollToTop from './components/ScrollToTop';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminQuestionSets from './pages/admin/AdminQuestionSets';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Error Pages
import NotFound from './pages/error/NotFound';
import Forbidden from './pages/error/Forbidden';

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/myYoutube" element={<MyYoutube />} />
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
          <Route path="configuration" element={<AdminQuestionSets />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Error Routes */}
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
