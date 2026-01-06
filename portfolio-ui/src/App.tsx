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

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
