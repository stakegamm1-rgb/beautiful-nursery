import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';

const CustomAlert = ({ isOpen, message, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#f5f5f5',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <FaTimes />
            </button>
            <div style={{ color: '#e63946', fontSize: '48px', marginBottom: '15px' }}>
              <FaExclamationCircle />
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-dark)', fontSize: '20px', fontWeight: 700 }}>Notice</h3>
            <p style={{ color: '#666', margin: '0 0 25px 0', lineHeight: '1.5', fontSize: '15px' }}>{message}</p>
            <button 
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                color: 'white',
                border: 'none',
                padding: '12px 35px',
                borderRadius: '25px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '15px',
                boxShadow: '0 4px 15px rgba(46, 125, 50, 0.2)'
              }}
            >
              Okay
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
