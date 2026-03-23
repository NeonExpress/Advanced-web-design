import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import About from './pages/About';
import Contact from './pages/Contact';
import StorePolicy from './pages/StorePolicy';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      {/* Always full width */}
      <Header />
      <Navbar />

      {/* Main content wrapper - full width, no shrinking */}
      <div className="container-fluid px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<StorePolicy />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;