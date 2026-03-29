import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detail from './pages/Detail';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract active category from path
  let path = location.pathname.replace(/^\/+/, '');
  if (path === '') path = 'beranda';
  const activeCategory = path.startsWith('news') ? '' : path;

  const handleCategoryChange = (cat) => {
    if (cat === 'beranda') {
      navigate('/');
    } else {
      navigate(`/${cat}`);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/news/detail" element={<Detail />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full bg-white">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
