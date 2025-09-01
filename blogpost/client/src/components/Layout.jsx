import Navbar from './navBar';
import Footer from './footer'
const Layout = ({ children }) => (
  <div>
    <Navbar />
    <main className="p-4">{children}</main>
    <Footer/>
  </div>

);

export default Layout;



