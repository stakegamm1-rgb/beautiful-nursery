import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaTimes, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const CustomAlert = ({ isOpen, message, onClose, type = 'error', actionText, onAction }) => {
  let Icon = FaExclamationCircle;
  let iconColor = '#e63946';
  let title = 'Notice';

  if (type === 'success') {
    Icon = FaCheckCircle;
    iconColor = '#25D366';
    title = 'Success';
  } else if (type === 'info') {
    Icon = FaInfoCircle;
    iconColor = '#0284c7';
    title = 'Info';
  }

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
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              background: 'white',
              padding: '35px 30px',
              borderRadius: '24px',
              maxWidth: '380px',
              width: '90%',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              position: 'relative',
              textAlign: 'center',
              borderTop: `6px solid ${iconColor}`
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0,0,0,0.05)',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            >
              <FaTimes />
            </button>
            <div style={{ color: iconColor, fontSize: '54px', marginBottom: '15px' }}>
              <Icon />
            </div>
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-dark)', fontSize: '22px', fontWeight: 800 }}>{title}</h3>
            <p style={{ color: '#555', margin: '0 0 30px 0', lineHeight: '1.6', fontSize: '15px', fontWeight: 500 }}>{message}</p>
            <button 
              onClick={() => {
                if (onAction) onAction();
                onClose();
              }}
              style={{
                background: iconColor,
                color: 'white',
                border: 'none',
                padding: '14px 40px',
                borderRadius: '30px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '15px',
                boxShadow: `0 8px 20px ${iconColor}40`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                width: '100%'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {actionText || 'Got it'}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
