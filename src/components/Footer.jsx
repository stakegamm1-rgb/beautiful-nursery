import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--dark-green)', color: 'var(--text-light)', padding: '60px 0 20px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <FaLeaf size={32} color="var(--accent)" />
              <span style={{ fontSize: '24px', fontWeight: 800 }}>Beautiful Nursery</span>
            </div>
            <p style={{ color: 'var(--light-green)', lineHeight: 1.6, marginBottom: '20px' }}>
              Bringing greenery and happiness to your doorstep with premium, healthy plants for every space.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <FaFacebook size={24} style={{ cursor: 'pointer', color: 'var(--light-green)' }} />
              <FaInstagram size={24} style={{ cursor: 'pointer', color: 'var(--light-green)' }} />
              <FaTwitter size={24} style={{ cursor: 'pointer', color: 'var(--light-green)' }} />
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'white' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/about" style={{ color: 'var(--light-green)', textDecoration: 'none' }}>About Us</Link>
              <Link to="/shop" style={{ color: 'var(--light-green)', textDecoration: 'none' }}>Shop Plants</Link>
              <Link to="/privacy" style={{ color: 'var(--light-green)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/privacy" style={{ color: 'var(--light-green)', textDecoration: 'none' }}>Return Policy</Link>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'white' }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, lineHeight: '2' }}>
                <li>INDIA. KOLKATA. WEST BENGAL. BARASAT.GUMA. CHAKLA ROAD</li>
                <li>📞 +91 9932176236</li>
                <li>✉️ nursery@beautifulnursery.com</li>
              </ul>
            </div>
          </div>

        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.6 }}>
          <p>© 2026 Beautiful Nursery. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
