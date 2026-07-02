import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition" style={{ paddingTop: '100px', paddingBottom: '100px', background: 'linear-gradient(135deg, #f8fdf8, #e0f2eb)' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <div style={{ display: 'inline-block', padding: '15px 30px', background: 'white', borderRadius: '30px', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
            Your Data is Safe
          </div>
          <h1 className="title">Privacy <span>Policy</span></h1>
          <p style={{ color: 'var(--dark-green)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>We respect your privacy and are committed to protecting your personal data.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}
          >
            <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '15px' }}>1. Information We Collect</h2>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
              When you place an order or contact us, we collect necessary information such as your name, phone number, and delivery address to fulfill your request efficiently.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}
          >
            <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '15px' }}>2. How We Use Your Data</h2>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
              Your data is strictly used for order processing, delivery, and customer support. We do not sell or share your personal information with third-party advertisers.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}
          >
            <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '15px' }}>3. Secure Payments</h2>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
              We facilitate payments directly via UPI/QR code through WhatsApp. We do not store your banking or credit card details on our servers at any time.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
