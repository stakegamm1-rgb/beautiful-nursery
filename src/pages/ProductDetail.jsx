import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShareAlt, FaStar, FaCheckCircle, FaTruck, FaLeaf, FaSun, FaWater, FaSeedling, FaShieldAlt } from 'react-icons/fa';
import { useProducts } from '../context/ProductContext';
import { customerReviews } from '../data/reviews';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products: plants, loading } = useProducts();
  const { addToCart, wishlist, toggleWishlist, cart } = useContext(CartContext);
  
  const product = plants.find(p => String(p.id) === String(id));
  const productImages = product?.images && product.images.length > 0 ? product.images : [product?.image].filter(Boolean);
  
  // Image Gallery State
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top on route change or product change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(productImages[0]);
  }, [id, product]);

  if (loading) {
    return <div className="container section-padding" style={{ textAlign: 'center', marginTop: '100px' }}><div className="loading-shimmer" style={{height: '400px', borderRadius: '20px'}}></div><h2 style={{marginTop: '20px'}}>Loading product...</h2></div>;
  }

  if (!product) {
    return <div className="container section-padding" style={{ textAlign: 'center', marginTop: '100px' }}><h2>Product not found</h2><Link to="/shop" className="btn">Back to Shop</Link></div>;
  }

  const isWished = wishlist?.some(item => item.id === product.id);
  const isInCart = cart?.some(item => item.id === product.id);

  // Similar Plants (4 max)
  let similarPlants = plants.filter(p => p.category === product.category && p.id !== product.id);
  if (similarPlants.length < 4) {
    similarPlants = plants.filter(p => p.id !== product.id);
  }
  similarPlants = similarPlants.slice(0, 4);

  // Actual thumbnails from product
  const thumbnails = productImages;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this beautiful ${product.name} at SADIA NURSERY!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="page-transition" style={{ paddingTop: '90px', background: 'white' }}>
      
      {/* Breadcrumb */}
      <div className="container" style={{ padding: '20px', fontSize: '14px', color: '#666' }}>
        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link> / <Link to="/shop" style={{ color: '#666', textDecoration: 'none' }}>Shop</Link> / <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.name}</span>
      </div>

      <div className="container" style={{ paddingBottom: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          
          {/* LEFT COLUMN: Image Gallery */}
          <div style={{ flex: '1 1 40%', minWidth: '320px' }}>
            {isMobile && thumbnails.length > 1 ? (
              <div style={{ background: '#f8fdf8', borderRadius: '20px', position: 'relative', height: '450px', padding: '10px' }}>
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  style={{ width: '100%', height: '100%', borderRadius: '15px', paddingBottom: '30px' }}
                >
                  {thumbnails.map((imgSrc, idx) => (
                    <SwiperSlide key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={imgSrc} alt={`${product.name} ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button 
                  onClick={() => toggleWishlist(product)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                >
                  {isWished ? <FaHeart color="#e63946" size={20} /> : <FaRegHeart size={20} color="#888" />}
                </button>
              </div>
            ) : (
              <>
                <div style={{ background: '#f8fdf8', borderRadius: '20px', padding: '20px', position: 'relative', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={activeImage} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </AnimatePresence>
                  
                  <button 
                    onClick={() => toggleWishlist(product)}
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                  >
                    {isWished ? <FaHeart color="#e63946" size={20} /> : <FaRegHeart size={20} color="#888" />}
                  </button>
                </div>

                {/* Desktop Thumbnails */}
                {thumbnails.length > 1 && (
                  <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    {thumbnails.map((thumb, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setActiveImage(thumb)}
                        style={{ 
                          flex: 1, 
                          height: '80px', 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          cursor: 'pointer',
                          border: activeImage === thumb ? '2px solid var(--primary)' : '2px solid transparent',
                          background: '#f8fdf8',
                          padding: '5px'
                        }}
                      >
                        <img src={thumb} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT COLUMN: Product Info */}
          <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
              {product.category} Plant
            </div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: 800, lineHeight: 1.2 }}>{product.name}</h1>
            
            {/* Minimal Rating Block */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ffb703', fontSize: '18px' }}>
                <FaStar/><FaStar/><FaStar/><FaStar/><FaStar color={product.rating < 5 ? "#e0e0e0" : "#ffb703"} />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)' }}>{product.rating}</span>
              <span style={{ color: '#888', fontSize: '14px' }}>({product.reviewCount} Reviews)</span>
              <span style={{ padding: '4px 12px', background: product.stock.includes('Stock') && !product.stock.includes('Out') ? '#e8f5e9' : '#ffebee', color: product.stock.includes('Stock') && !product.stock.includes('Out') ? 'var(--secondary)' : '#e63946', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                {product.stock}
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0, fontWeight: 800, lineHeight: 1 }}>₹{product.discountPrice}</h2>
              <span style={{ fontSize: '1.2rem', color: '#aaa', textDecoration: 'line-through', marginBottom: '4px' }}>₹{product.price}</span>
              <span style={{ background: '#ffeb3b', color: '#333', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </span>
            </div>

            <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.8', marginBottom: '30px' }}>
              The {product.name} is a stunning addition to any space, perfectly curated by SADIA NURSERY. Known for its air-purifying qualities and lush foliage, it thrives with minimal care. Delivered fresh, healthy, and securely potted.
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
              {isInCart ? (
                <button className="btn" onClick={() => navigate('/cart')} style={{ flex: 1, padding: '15px', fontSize: '15px', background: '#25D366', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  <FaCheckCircle /> Added to Cart
                </button>
              ) : (
                <button className="btn" onClick={() => addToCart(product)} style={{ flex: 1, padding: '15px', fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  Add to Cart
                </button>
              )}
              <button onClick={handleShare} className="btn btn-secondary" style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '2px solid #ddd', color: '#666' }}>
                <FaShareAlt />
              </button>
            </div>

            {/* Detailed Plant Care Specs Grid */}
            <div style={{ background: '#f8fdf8', borderRadius: '15px', padding: '25px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <FaSun size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>SUNLIGHT</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Bright, Indirect</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <FaWater size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>WATERING</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Once a week</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <FaLeaf size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>MAINTENANCE</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>Low / Easy Care</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <FaSeedling size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>POT SIZE</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)' }}>6 - 8 Inches</div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '30px', padding: '10px 0 0 0', borderTop: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaTruck color="var(--primary)" size={20} />
                <span style={{ fontSize: '14px', color: '#555', fontWeight: 500 }}>Fast, Secure Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaShieldAlt color="var(--primary)" size={20} />
                <span style={{ fontSize: '14px', color: '#555', fontWeight: 500 }}>Quality Guaranteed</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Reviews & Ratings Section */}
      <section style={{ borderTop: '1px solid #f0f0f0', paddingTop: '60px', paddingBottom: '60px', background: '#fafafa' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', marginBottom: '40px' }}>
            
            {/* Rating Summary */}
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>Customer Reviews</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '4rem', fontWeight: 900, margin: 0, color: 'var(--text-dark)', lineHeight: 1 }}>{product.rating}</h2>
                <div>
                  <div style={{ display: 'flex', color: '#ffb703', fontSize: '20px', marginBottom: '5px' }}>
                    <FaStar/><FaStar/><FaStar/><FaStar/><FaStar color={product.rating < 5 ? "#e0e0e0" : "#ffb703"} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#888' }}>Based on {product.reviewCount} reviews</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[5, 4, 3, 2, 1].map(star => {
                  let percentage = 0;
                  if(star === 5) percentage = 80;
                  if(star === 4) percentage = 15;
                  if(star === 3) percentage = 4;
                  if(star === 2) percentage = 1;
                  if(star === 1) percentage = 0;
                  
                  return (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#666' }}>
                      <span style={{ width: '10px' }}>{star}</span>
                      <FaStar color="#ffb703" size={12} />
                      <div style={{ flex: 1, height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', background: '#ffb703', borderRadius: '4px' }}></div>
                      </div>
                      <span style={{ width: '30px', textAlign: 'right' }}>{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px' }}>We promise 100% Satisfaction</h3>
              <p style={{ color: '#666', lineHeight: 1.6 }}>
                Every plant from SADIA NURSERY is hand-picked, thoroughly inspected, and securely packed. Over {product.reviewCount} customers have trusted us to bring greenery into their lives. Read what they have to say below!
              </p>
            </div>
          </div>
          {/* Individual Reviews */}
          <div style={{ marginTop: '40px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--dark-green)' }}>Recent Reviews</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {React.useMemo(() => {
                const fakeNames = ["Aarav S.", "Priya M.", "Rajesh K.", "Neha D.", "Anjali R.", "Vikram T.", "Sneha P.", "Rohan B.", "Pooja V.", "Amit J."];
                const fakeTexts = [
                  "Absolutely love this plant! It arrived in perfect condition and looks beautiful in my living room.",
                  "Packaging was secure and the plant is very healthy. Will definitely buy again from SADIA NURSERY.",
                  "Customer service was great and the delivery was fast. Highly recommended!",
                  "Beautiful and vibrant leaves! Just as described.",
                  "I was worried about buying plants online, but this exceeded my expectations. So fresh!",
                  "A wonderful addition to my indoor garden. Great quality.",
                  "Riyaz Sir's team does a fantastic job. The plant was lush and green.",
                  "Perfect size and healthy roots. Very satisfied.",
                  "Exceeded expectations! It's thriving well.",
                  "Great price for such a premium plant. Thanks!"
                ];
                
                // Generate random number of reviews between 5 and 10 based on product id
                const charCodeSum = String(product.id).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
                const numReviews = (charCodeSum % 6) + 5; // 5 to 10
                
                const reviews = [];
                for (let i = 0; i < numReviews; i++) {
                  const nameIndex = (charCodeSum + i * 3) % fakeNames.length;
                  const textIndex = (charCodeSum + i * 7) % fakeTexts.length;
                  const rating = (charCodeSum + i) % 10 === 0 ? 4 : 5; // Mostly 5 stars, some 4 stars
                  
                  reviews.push({
                    id: i,
                    name: fakeNames[nameIndex],
                    text: fakeTexts[textIndex],
                    rating: rating,
                    date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000 * 3) - (charCodeSum * 1000000)).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                  });
                }
                return reviews;
              }, [product.id]).map(review => (
                <div key={review.id} style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>{review.name}</h5>
                    <span style={{ fontSize: '12px', color: '#999' }}>{review.date}</span>
                  </div>
                  <div style={{ display: 'flex', color: '#ffb703', fontSize: '12px', marginBottom: '10px' }}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color={i < review.rating ? "#ffb703" : "#e0e0e0"} />
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: 1.5 }}>"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Similar Plants Section */}
      {similarPlants.length > 0 && (
        <section style={{ padding: '60px 0', background: 'white' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', marginBottom: '40px', color: 'var(--dark-green)' }}>You May Also Like</h2>
            <div className="similar-plants-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {similarPlants.map((p, index) => (
                <div key={p.id} style={{ height: '100%' }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Styles for Product Detail Page */}
      <style>{`
        /* Responsive Similar Plants Grid */
        @media (max-width: 1024px) {
          .similar-plants-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .similar-plants-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 15px !important;
          }
        }
        @media (max-width: 480px) {
          .similar-plants-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
