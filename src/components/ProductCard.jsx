import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar, FaShoppingCart, FaEye, FaCheck, FaBolt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, wishlist, toggleWishlist, cart } = useCart();
  const navigate = useNavigate();
  
  const isWished = wishlist?.some(item => item.id === product.id);
  const isInCart = cart?.some(item => item.id === product.id);

  return (
    <motion.div 
      className="glass"
      style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', transition: 'all 0.3s', height: '100%', display: 'flex', flexDirection: 'column' }}
      whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(46,125,50,0.15)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Badges */}
        {product.badge && (
          <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--accent)', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', zIndex: 10 }}>
            {product.badge}
          </div>
        )}
      
        {/* Image container */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <motion.img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f8fdf8' }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Quick actions overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px' }}
              >
                {isInCart ? (
                  <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', fontSize: '13px', background: '#25D366', border: 'none' }}>
                    <FaCheck /> Added
                  </button>
                ) : (
                  <button onClick={(e) => { e.preventDefault(); addToCart(product); }} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', fontSize: '13px' }}>
                    <FaShoppingCart /> Add
                  </button>
                )}
                <button 
                  onClick={(e) => { e.preventDefault(); addToCart(product); navigate('/cart'); }} 
                  className="btn" 
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', fontSize: '13px', background: '#ff9800', border: 'none' }}
                >
                  <FaBolt /> Buy Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--secondary)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb703', fontSize: '11px' }}>
              <FaStar /> 
              <span style={{ fontWeight: 'bold', color: 'var(--dark-green)' }}>{product.rating}</span> 
              <span style={{ color: '#888', marginLeft: '2px' }}>({product.reviewCount || Math.floor(Math.random() * 150) + 50})</span>
            </div>
          </div>
          
          <h3 style={{ fontSize: '16px', color: 'var(--dark-green)', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flex: 1 }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>₹{product.discountPrice}</span>
            {product.price > product.discountPrice && (
              <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '13px' }}>₹{product.price}</span>
            )}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
            <p style={{ fontSize: '11px', margin: 0, color: product.stock.includes('Stock') ? 'var(--secondary)' : '#e63946', fontWeight: 'bold' }}>
              {product.stock}
            </p>
            {product.price > product.discountPrice && (
              <span style={{ background: '#e8f5e9', color: 'var(--secondary)', padding: '3px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist */}
      <button 
        onClick={() => toggleWishlist(product)}
        style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
      >
        <FaHeart color={isWished ? '#e63946' : '#ccc'} />
      </button>
    </motion.div>
  );
};


export default ProductCard;
