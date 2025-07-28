import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;