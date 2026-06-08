import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ResumeLayout from './layouts/ResumeLayout';
import ProtectedRoute from '../features/admin/components/ProtectedRoute';

// Lazy-loaded pages
const Home = lazy(() => import('../features/user/pages/Home'));
const AllProjects = lazy(() => import('../features/user/pages/AllProjects'));
const MyYoutube = lazy(() => import('../features/user/pages/MyYoutube'));
const Resume = lazy(() => import('../features/user/pages/Resume'));

const BlogList = lazy(() => import('../features/blog/pages/BlogList'));
const BlogDetail = lazy(() => import('../features/blog/pages/BlogDetail'));

const WakeUpChallenge = lazy(() => import('../features/challenge/pages/WakeUpChallenge'));

const InterviewHub = lazy(() => import('../features/interview/pages/InterviewHub'));
const SetsHub = lazy(() => import('../features/interview/pages/SetsHub'));
const CollectionDetail = lazy(() => import('../features/interview/pages/CollectionDetail'));

const LoginPage = lazy(() => import('../features/admin/pages/LoginPage'));
const AdminDashboard = lazy(() => import('../features/admin/pages/AdminDashboard'));
const AdminQuestionSets = lazy(() => import('../features/admin/pages/AdminQuestionSets'));
const AdminConfiguration = lazy(() => import('../features/admin/pages/AdminConfiguration'));
const AdminProfile = lazy(() => import('../features/admin/pages/AdminProfile'));

const Forbidden = lazy(() => import('../features/user/pages/error/Forbidden'));
const NotFound = lazy(() => import('../features/user/pages/error/NotFound'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <AllProjects /> },
      { path: 'my-youtube', element: <MyYoutube /> },
      { path: 'blogs', element: <BlogList /> },
      { path: 'blog/:slug', element: <BlogDetail /> },
      { path: 'challenge', element: <WakeUpChallenge /> },
      { path: 'interview', element: <InterviewHub /> },
      { path: 'interview/sets', element: <SetsHub /> },
      { path: 'interview/collection/:slug', element: <CollectionDetail /> },
      // Legacy redirects
      { path: 'interview-prep', element: <Navigate to="/interview" replace /> },
      { path: 'interview-prep/:categoryId', element: <Navigate to="/interview" replace /> },
      { path: 'youtube-sets', element: <Navigate to="/interview/sets" replace /> },
      { path: 'youtube-sets/:videoId', element: <Navigate to="/interview/sets" replace /> },
    ],
  },
  {
    path: '/resume',
    element: <ResumeLayout />,
    children: [
      { index: true, element: <Resume /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'question-sets', element: <AdminQuestionSets /> },
      { path: 'configuration', element: <AdminConfiguration /> },
      { path: 'profile', element: <AdminProfile /> },
    ],
  },
  {
    path: '/forbidden',
    element: <Forbidden />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
export default routes;
