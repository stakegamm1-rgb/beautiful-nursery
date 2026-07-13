import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf, FaShoppingCart, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const showSolidNav = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Indoor', path: '/shop?category=Indoor' },
    { name: 'Outdoor', path: '/shop?category=Outdoor' },
    { name: 'Fruits', path: '/shop?category=Fruit' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000, transition: 'all 0.3s ease',
      background: showSolidNav ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      boxShadow: showSolidNav ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
      padding: '20px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <FaLeaf size={32} color={showSolidNav ? "var(--primary)" : "white"} />
          <span style={{ fontSize: '24px', fontWeight: 800, color: showSolidNav ? 'var(--dark-green)' : 'white' }}>Sadia Nursery</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'none' }} className="desktop-nav">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {navLinks.map((link) => {
              const isActive = (link.path.includes('?') && location.pathname + location.search === link.path) ||
                (!link.path.includes('?') && location.pathname === link.path && location.search === '');
              return (
                <Link key={link.name} to={link.path} style={{
                  textDecoration: 'none',
                  color: isActive ? 'white' : (showSolidNav ? 'var(--text-dark)' : 'white'),
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '15px',
                  background: isActive ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'transparent',
                  padding: isActive ? '8px 18px' : '8px 10px',
                  borderRadius: isActive ? '20px' : '0',
                  boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.3s'
                }}>
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/cart" style={{ position: 'relative', cursor: 'pointer', color: showSolidNav ? 'var(--dark-green)' : 'white', textDecoration: 'none' }}>
            <FaShoppingCart size={24} />
            {totalItems > 0 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
                position: 'absolute', top: '-8px', right: '-12px', background: '#e63946',
                color: 'white', borderRadius: '50%', width: '22px', height: '22px',
                display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold'
              }}>
                {totalItems}
              </motion.div>
            )}
          </Link>
          <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: showSolidNav ? 'var(--dark-green)' : 'white' }} className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ background: 'white', padding: '20px', borderBottom: '1px solid #eee' }}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} style={{ display: 'block', padding: '10px 0', textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500 }} onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}

      {/* Inject custom CSS for responsive nav visibility */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
