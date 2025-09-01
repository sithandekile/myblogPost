
// --- src/App.jsx ---
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Blog from './pages/blog';
import Contact from './pages/contact';
import Subscribe from './pages/subscribe';
// import Register from './pages/register';
// import ProtectedRoute from './utils/protectedRoute';

const App = () => (
  <div className='mx-10'>
  <Router>
    <Layout>
      <Routes>
        /* <Route path="/" element={<Home />} /> 
        <Route path="/blog" element={<Blog/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
      </Routes>
    </Layout>
  </Router>
  </div>
);

export default App;



