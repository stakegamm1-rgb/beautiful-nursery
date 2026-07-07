import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import aboutImage from '../assets/about.png';

const About = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '9581') {
      setShowOtpModal(false);
      navigate('/admin');
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="page-transition">
      <section style={{ 
        padding: '120px 0 100px 0', 
        background: 'linear-gradient(135deg, #f0fff4 0%, #d4edda 50%, #c3e6cb 100%)', 
        position: 'relative', 
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Floating Background Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '15%', left: '5%', fontSize: '120px', opacity: 0.1, zIndex: 0 }}
        >🌿</motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '15%', right: '5%', fontSize: '150px', opacity: 0.1, zIndex: 0 }}
        >🌱</motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
            
            {/* Left Column - Image & Stats */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              style={{ flex: '1 1 450px' }}
            >
              {/* Premium Image Container */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ 
                  position: 'relative', 
                  borderRadius: '30px', 
                  padding: '20px', 
                  background: 'rgba(255, 255, 255, 0.4)', 
                  backdropFilter: 'blur(15px)', 
                  boxShadow: '0 30px 60px rgba(46, 125, 50, 0.15)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  marginBottom: '40px'
                }}
              >
                <div style={{ position: 'absolute', inset: '-10px', background: 'radial-gradient(circle, rgba(46,125,50,0.15) 0%, transparent 70%)', zIndex: -1, borderRadius: '40px' }}></div>
                <img 
                  src={aboutImage} 
                  alt="Beautiful Nursery" 
                  style={{ display: 'block', width: '100%', maxHeight: '550px', objectFit: 'contain', borderRadius: '15px' }} 
                />
              </motion.div>
              
              {/* Floating Badge (Moved outside so it doesn't block image) */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: 'white', padding: '15px 25px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(46,125,50,0.1)', width: 'max-content', margin: '-10px auto 25px auto', position: 'relative', zIndex: 10 }}
              >
                <span style={{ fontSize: '30px', color: 'var(--primary)' }}>🏆</span>
                <div>
                  <h4 style={{ margin: 0, color: 'var(--dark-green)', fontSize: '18px', fontWeight: 'bold' }}>10+ Years</h4>
                  <p style={{ margin: 0, color: 'var(--text-dark)', fontSize: '14px' }}>Trusted Experience</p>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {[
                  { icon: '🌿', title: '20,000+', desc: 'Happy Customers' },
                  { icon: '🌱', title: '500+', desc: 'Plant Varieties' },
                  { icon: '🚚', title: 'Fast', desc: 'Delivery Across India' },
                  { icon: '⭐', title: '4.9/5', desc: 'Average Rating' }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(46,125,50,0.15)', background: '#f8fff9' }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ background: 'white', padding: '20px', borderRadius: '15px', display: 'flex', gap: '15px', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(46,125,50,0.05)', cursor: 'default' }}
                  >
                    <div style={{ fontSize: '32px' }}>{stat.icon}</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '22px', color: 'var(--dark-green)', fontWeight: '800' }}>{stat.title}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500' }}>{stat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              style={{ flex: '1 1 500px' }}
            >
              <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontSize: '14px' }}>About Beautiful Nursery</h4>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--dark-green)', marginBottom: '20px', lineHeight: 1.2, fontWeight: 800 }}>
                Rooted in <span style={{ background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Passion</span>,<br/>Growing with You.
              </h2>
              
              <p style={{ fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '20px' }}>
                At <strong>Beautiful Nursery</strong>, our passion for nature drives everything we do. For over a decade, we have been dedicated to cultivating <span style={{ color: 'var(--dark-green)', fontWeight: 'bold' }}>high-quality, healthy plants</span> that bring life, joy, and fresh air into your personal spaces.
              </p>
              
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '35px' }}>
                We believe in <strong>sustainable gardening practices</strong> and eco-friendly growing. Whether you're a seasoned botanist or a curious beginner, our expert team is here to provide unparalleled plant care guidance, ensuring your green companions thrive. With our secure packaging and fast delivery, customer satisfaction is guaranteed.
              </p>

              {/* Feature Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {[
                  { icon: '🪴', title: 'Premium Quality Plants' },
                  { icon: '🌍', title: 'Eco-Friendly Growing' },
                  { icon: '👨‍🌾', title: 'Expert Gardening Support' },
                  { icon: '📦', title: 'Secure Packaging' }
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '45px', height: '45px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                      {feat.icon}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--dark-green)', fontSize: '15px' }}>{feat.title}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/shop" style={{ textDecoration: 'none' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(46, 125, 50, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                      color: 'white',
                      border: 'none',
                      padding: '18px 40px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    Explore Our Collection <span style={{ fontSize: '20px' }}>→</span>
                  </motion.button>
                </Link>

                <motion.button 
                  onClick={() => setShowOtpModal(true)}
                  whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    background: 'white',
                    color: 'var(--dark-green)',
                    border: '2px solid var(--primary)',
                    padding: '18px 40px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  Add Products <span style={{ fontSize: '20px' }}>+</span>
                </motion.button>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                background: 'white',
                padding: '40px',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => { setShowOtpModal(false); setOtp(''); setOtpError(''); }}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                &times;
              </button>
              
              <h3 style={{ fontSize: '24px', color: 'var(--dark-green)', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold' }}>Admin Access</h3>
              <p style={{ color: '#666', marginBottom: '25px', textAlign: 'center', fontSize: '15px' }}>Enter OTP to access product management</p>
              
              <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <input
                    type="password"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      fontSize: '18px',
                      outline: 'none',
                      textAlign: 'center',
                      letterSpacing: '5px'
                    }}
                  />
                  {otpError && <p style={{ color: '#e53e3e', fontSize: '14px', marginTop: '8px', textAlign: 'center' }}>{otpError}</p>}
                </div>
                
                <button 
                  type="submit"
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '15px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Verify & Continue
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default About;
