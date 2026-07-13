import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaSpinner } from 'react-icons/fa';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/nandverma830@gmail.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      
      if (response.ok) {
        alert("Message sent successfully!");
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition" style={{ paddingTop: '100px' }}>
      <div className="container section-padding">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 className="title">Contact <span>Us</span></h1>
          <p style={{ color: 'var(--dark-green)' }}>We'd love to hear from you. Reach out for orders or plant care advice!</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="glass" 
            style={{ padding: '40px', borderRadius: '20px' }}
          >
            <h3 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '30px' }}>Get In Touch</h3>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'center' }}>
              <div style={{ background: 'var(--light-green)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--dark-green)' }}>
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <h4 style={{ color: 'var(--dark-green)' }}>Phone Number</h4>
                <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--primary)' }}>+91 8371996637</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'center' }}>
              <div style={{ background: 'var(--light-green)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--dark-green)' }}>
                <FaEnvelope size={20} />
              </div>
              <div>
                <h4 style={{ color: 'var(--dark-green)' }}>Email</h4>
                <p>nursery@sadianursery.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'center' }}>
              <div style={{ background: 'var(--light-green)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--dark-green)' }}>
                <FaClock size={20} />
              </div>
              <div>
                <h4 style={{ color: 'var(--dark-green)' }}>Working Hours</h4>
                <p>Mon - Sun<br/>9:00 AM - 7:00 PM</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ background: 'var(--light-green)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--dark-green)' }}>
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h4 style={{ color: 'var(--dark-green)' }}>Address</h4>
                <p>INDIA. KOLKATA. WEST BENGAL. BARASAT.GUMA. CHAKLA ROAD</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="glass" 
            style={{ padding: '40px', borderRadius: '20px' }}
          >
            <h3 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '30px' }}>Send us a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <input type="text" name="_honey" style={{ display: 'none' }} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <input type="text" name="name" placeholder="Your Name" className="input-field" required />
              <input type="email" name="email" placeholder="Your Email" className="input-field" required />
              <input type="text" name="_subject" placeholder="Subject" className="input-field" required />
              <textarea name="message" placeholder="Your Message" className="input-field" style={{ minHeight: '150px', resize: 'vertical' }} required></textarea>
              <button type="submit" className="btn" style={{ width: '100%', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }} disabled={loading}>
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <FaSpinner size={18} />
                    </motion.div>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
