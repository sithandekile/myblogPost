
// --- src/App.jsx ---
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Blog from './pages/blog';
import Contact from './pages/contact';
import Subscribe from './pages/subscribe';
 import {Register} from './pages/register';
import SinglePost from './pages/singlePost';
 import {Login} from './pages/login';
import CreatePost from './pages/createPost';
import EditPost from './pages/editPost';
import ProtectedRoute from './components/protectedRoutes';
import About from './pages/home';

const App = () => (
  <div className=''>
  <Router>
    <Layout>
      <Routes>
        <Route path="/blog" element={<Blog title='Blog'/>} />
        <Route path="/contact" element={<Contact title='Contact'/>} />
        <Route index element={<About title='About'/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
        <Route path="/register" element={<Register title='Register'/>} />
        <Route path='/login' element={<Login/>} />
        <Route path ='/blog/:id' element={<SinglePost/>}/>
        <Route path ='/create-post' element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/>
        <Route path ='/edit-post/:id' element={<ProtectedRoute><EditPost/></ProtectedRoute>}/>
  
     {/* <ProtectedRoute path="/profile" element={<Profile />} /> */}
      </Routes>
    </Layout>
  </Router>
  </div>
);

export default App;



