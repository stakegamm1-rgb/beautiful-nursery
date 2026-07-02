import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ReturnPolicy = () => {
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
            Customer First Approach
          </div>
          <h1 className="title">Return <span>Policy</span></h1>
          <p style={{ color: 'var(--dark-green)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>We want you to love your plants. If something isn't right, we're here to help.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}
          >
            <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '15px' }}>1. 7-Day Plant Guarantee</h2>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
              We take pride in shipping healthy, beautiful plants. If your plant arrives damaged or dies within the first 7 days of delivery, we will replace it for free. Please send us a clear photo of the plant within this timeframe.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}
          >
            <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '15px' }}>2. Non-Plant Items</h2>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
              Pots, tools, and accessories can be returned within 14 days of delivery. Items must be unused, in their original packaging, and in the same condition that you received them.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}
          >
            <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '15px' }}>3. How to Request a Return</h2>
            <p style={{ color: 'var(--text-dark)', lineHeight: '1.8' }}>
              To initiate a return or replacement, please email us at <strong>nursery@beautifulnursery.com</strong> or send us a WhatsApp message at <strong>+91 9932176236</strong> with your order number and photos of the item.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
