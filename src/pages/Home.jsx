import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import { customerReviews } from '../data/reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import heroVideo from '../assets/video.mp4';
import meImage from '../assets/me.jpeg';

const Home = () => {
  const { products: plants, loading } = useProducts();
  const leafVariants = {
    animate: {
      y: ["-20px", "20px"],
      x: ["-15px", "15px"],
      rotate: [0, 20, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section style={{
        height: '90vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2,
            filter: 'brightness(0.85)'
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(29, 92, 59, 0.4), rgba(46, 125, 50, 0.6))',
          zIndex: -1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              fontSize: '5rem',
              fontWeight: 900,
              marginBottom: '10px',
              letterSpacing: '2px',
              background: 'linear-gradient(to right, #a8ff78, #78ffd6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            SADIA NURSERY
          </motion.h1>
          <motion.h3
            className="hero-h3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: '2rem', color: 'var(--light-green)', marginBottom: '20px', fontWeight: 600, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
          >
            Bringing Nature Home
          </motion.h3>
          <motion.p
            className="hero-p"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ fontSize: '1.2rem', color: 'white', marginBottom: '40px', fontWeight: 400, letterSpacing: '1px' }}
          >
            Healthy Plants • Fast Delivery • Premium Quality
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <Link to="/shop" className="btn" style={{ padding: '16px 45px', fontSize: '18px', background: 'var(--accent)', color: 'white', border: 'none' }}>
              🌿 Shop Now
            </Link>
            <Link to="/about" className="btn btn-secondary" style={{ padding: '16px 45px', fontSize: '18px', background: 'white', color: 'black', border: 'none' }}>
              🌱 Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Offer Banner (Massive Premium Section) */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--dark-green), var(--primary))', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass offer-card"
            style={{ padding: '60px', borderRadius: '40px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
          >
            <motion.h2
              className="offer-h2"
              animate={{ textShadow: ["0 0 10px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.8)", "0 0 10px rgba(255,255,255,0.5)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 800 }}
            >
              🌿 BUY 5 PLANTS & GET 1 PLANT FREE 🌿
            </motion.h2>
            <p className="offer-p" style={{ fontSize: '1.5rem', marginBottom: '40px', opacity: 0.9, maxWidth: '800px', margin: '0 auto 40px' }}>
              Mix and match your favorite plants. The 6th plant is automatically free at checkout!
            </p>
            <Link to="/shop" className="btn" style={{ padding: '18px 50px', fontSize: '20px', background: 'var(--accent)', color: 'white', border: 'none' }}>Claim Offer Now</Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Swiper */}
      <section style={{ padding: '60px 0', background: 'var(--background)' }}>
        <div className="container">
          <h2 className="title" style={{ marginBottom: '40px' }}>Shop By <span>Categories</span></h2>
          <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {['Indoor Plants', 'Outdoor Plants', 'Fruits', 'Succulents'].map((cat, i) => (
              <Link to={`/shop?category=${cat === 'Fruits' ? 'Fruit' : cat.split(' ')[0]}`} key={i} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                  style={{
                    height: '200px',
                    borderRadius: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}></div>
                  <h3 style={{ color: 'var(--dark-green)', fontSize: '20px', fontWeight: 700 }}>{cat}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'center' }}>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ position: 'relative', width: '250px', height: '250px' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '-15px', right: '-15px', bottom: '-15px', background: 'linear-gradient(45deg, var(--primary), var(--accent))', borderRadius: '50%', zIndex: 0, animation: 'spin 10s linear infinite' }}></div>
                <img
                  src={meImage}
                  alt="Riyaz Sir - Sadia Nursery"
                  style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%', position: 'relative', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '2.3px solid white' }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ flex: '1 1 500px' }}
            >
              <h2 className="mission-h2" style={{ fontSize: '3rem', color: 'var(--dark-green)', marginBottom: '20px', lineHeight: 1.2 }}>Our Mission at <br /><span style={{ color: 'var(--primary)' }}>Sadia Nursery</span></h2>
              <p style={{ color: 'var(--text-dark)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '30px' }}>
                "We believe that every home deserves a touch of nature. Our mission is to provide the highest quality, most beautiful plants to bring life, joy, and fresh air into your personal spaces."
              </p>

              <div className="mission-card" style={{
                padding: '35px',
                background: 'linear-gradient(135deg, #ffffff, #f0fff4)',
                borderRadius: '25px',
                borderLeft: '6px solid var(--primary)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '100px', opacity: 0.05, color: 'var(--primary)' }}>🌿</div>

                <h3 style={{ fontSize: '1.8rem', color: 'var(--dark-green)', marginBottom: '5px', position: 'relative', zIndex: 1 }}>Riyaz Sir</h3>
                <p style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '20px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>Founder & Head Botanist</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-dark)', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>📍</span>
                    <p style={{ margin: 0, lineHeight: 1.5 }}>INDIA. KOLKATA. WEST BENGAL. BARASAT.GUMA. CHAKLA ROAD</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '5px' }}>
                    <span style={{ fontSize: '1.2rem' }}>📞</span>
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--dark-green)' }}>9932176236</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-padding" style={{ background: 'var(--background)' }}>
        <div className="container">
          <h2 className="title">Featured <span>Collections</span></h2>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="loading-shimmer" style={{ height: '350px', borderRadius: '20px' }}></div>
              ))}
            </div>
          ) : plants.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp" 
                alt="No Data Found" 
                style={{ maxWidth: '300px', margin: '0 auto', opacity: 0.8 }}
              />
              <h3 style={{ marginTop: '20px', color: 'var(--text-dark)', opacity: 0.7 }}>No Products Available</h3>
            </div>
          ) : (
            <motion.div
              className="products-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}
            >
              {plants.map((plant, index) => (
                <motion.div key={plant.id} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} style={{ height: '100%' }}>
                  <ProductCard product={plant} />
                </motion.div>
              ))}
            </motion.div>
          )}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/shop" className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '18px' }}>View All Collections</Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Infinite Marquee */}
      <section style={{ padding: '80px 0', background: 'var(--light-green)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '40px' }}>
          <h2 className="title" style={{ margin: 0 }}>Customer <span>Reviews</span></h2>
        </div>

        {/* We use a CSS animation for a true infinite marquee */}
        <div className="marquee-container" style={{ display: 'flex', gap: '30px', padding: '10px 0' }}>
          <div className="marquee-track" style={{ display: 'flex', gap: '30px', animation: 'scroll 80s linear infinite' }}>
            {/* Render Reviews Twice to create the infinite loop effect */}
            {[...customerReviews, ...customerReviews].map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                style={{
                  flexShrink: 0,
                  width: '320px',
                  background: 'white',
                  padding: '25px',
                  borderRadius: '20px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <FaUserCircle size={40} color="#ccc" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--dark-green)' }}>{review.name}</h4>
                      <span style={{ fontSize: '12px', color: '#888' }}>{review.location}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', color: '#ffb703', fontSize: '12px' }}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-dark)', lineHeight: '1.6', fontStyle: 'italic' }}>
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inject Marquee CSS */}
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-320px * 40 - 30px * 40)); }
          }
          .marquee-container:hover .marquee-track {
            animation-play-state: paused !important;
          }
        `}</style>
      </section>
    </div>
  );
};

export default Home;
