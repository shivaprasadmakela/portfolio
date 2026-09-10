import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import ResumeLayout from './layouts/ResumeLayout';

// Lazy-loaded pages
const Home = lazy(() => import('../features/user/pages/Home'));
const AllProjects = lazy(() => import('../features/user/pages/AllProjects'));
const MyYoutube = lazy(() => import('../features/user/pages/MyYoutube'));
const Resume = lazy(() => import('../features/user/pages/Resume'));

const BlogList = lazy(() => import('../features/blog/pages/BlogList'));
const BlogDetail = lazy(() => import('../features/blog/pages/BlogDetail'));

const WakeUpChallenge = lazy(() => import('../features/challenge/pages/WakeUpChallenge'));

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
      // Retired sections — keep old inbound links landing somewhere sensible
      // rather than on a 404.
      { path: 'interview', element: <Navigate to="/" replace /> },
      { path: 'interview/*', element: <Navigate to="/" replace /> },
      { path: 'interview-prep', element: <Navigate to="/" replace /> },
      { path: 'interview-prep/*', element: <Navigate to="/" replace /> },
      { path: 'youtube-sets', element: <Navigate to="/my-youtube" replace /> },
      { path: 'youtube-sets/*', element: <Navigate to="/my-youtube" replace /> },
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
    path: '*',
    element: <NotFound />,
  },
];
export default routes;
