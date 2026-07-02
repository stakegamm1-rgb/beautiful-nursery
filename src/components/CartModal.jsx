import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, calculateTotal, freeItemsCount } = useContext(CartContext);
  const total = calculateTotal();
  const subtotal = cart.reduce((acc, item) => acc + (item.discountPrice * item.qty), 0);
  const freePlantsCount = freeItemsCount;
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1 && cart.length > 0) setStep(2);
    else if (step === 2) {
      if (formData.name && formData.phone && formData.address) setStep(3);
      else alert('Please fill out all address details.');
    }
  };

  const handlePlaceOrder = () => {
    // Generate WhatsApp payload
    let text = `*New Order Details*\n\n`;
    text += `*Customer:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    text += `*Address:* ${formData.address}\n\n`;
    text += `*Items:*\n`;
    
    cart.forEach(item => {
      text += `- ${item.name} x${item.qty} (₹${item.discountPrice * item.qty})\n`;
    });
    
    if (freePlantsCount > 0) {
      text += `\n*Offer Applied:* ${freePlantsCount} FREE Plant(s) included!\n`;
    }
    
    text += `\n*Grand Total: ₹${total}*\n`;
    text += `*Payment Method:* UPI/QR (Prepaid)\n`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919932176236?text=${encodedText}`;
    
    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  };

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          style={{ position: 'absolute', top: 0, right: 0, width: '100%', maxWidth: '450px', height: '100%', background: 'white', display: 'flex', flexDirection: 'column', boxShadow: '-5px 0 30px rgba(0,0,0,0.1)' }}
        >
          {/* Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', color: 'var(--dark-green)' }}>
              {step === 1 ? 'Your Cart' : step === 2 ? 'Delivery Details' : 'Payment'}
            </h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {step === 1 && (
              <>
                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
                    <h2>Your cart is empty</h2>
                    <p>Add some beautiful plants to get started!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '15px', padding: '15px', background: '#f8fdf8', borderRadius: '15px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '10px', background: 'white' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '16px', color: 'var(--dark-green)', marginBottom: '5px' }}>{item.name}</h4>
                          <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{item.discountPrice}</div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '5px 10px', borderRadius: '20px', border: '1px solid #eee' }}>
                              <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><FaMinus size={12}/></button>
                              <span style={{ fontWeight: 'bold' }}>{item.qty}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><FaPlus size={12}/></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#e63946', cursor: 'pointer' }}>
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>Where should we deliver your beautiful plants?</p>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--dark-green)' }}>Full Name</label>
                  <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahul Sharma" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--dark-green)' }}>Phone Number</label>
                  <input type="tel" className="input-field" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="e.g. 9876543210" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--dark-green)' }}>Complete Address</label>
                  <textarea className="input-field" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="House no, Street, Landmark, City, Pincode" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc', minHeight: '100px' }}></textarea>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ background: '#ffebee', color: '#d32f2f', padding: '15px', borderRadius: '10px', marginBottom: '30px', fontWeight: 'bold' }}>
                  ❌ Cash on Delivery is NOT Available
                </div>
                
                <h3 style={{ color: 'var(--dark-green)', marginBottom: '20px' }}>Pay via UPI / QR Code</h3>
                <div style={{ border: '2px dashed var(--primary)', padding: '20px', display: 'inline-block', borderRadius: '20px', marginBottom: '20px' }}>
                  {/* Dummy QR Code Image */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Payment QR" style={{ width: '200px', height: '200px' }} />
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Scan with PhonePe, GPay, or Paytm to pay <strong>₹{total}</strong></p>
                
                <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '10px', fontSize: '14px', color: 'var(--dark-green)' }}>
                  After payment, click "Place Order" to send your details and confirmation via WhatsApp.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div style={{ padding: '20px', borderTop: '1px solid #eee', background: '#fafafa' }}>
              {step === 1 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {freePlantsCount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--primary)', fontWeight: 'bold' }}>
                      <span>Offer (Buy 5 Get 1 Free)</span>
                      <span>- {freePlantsCount} Plant(s)</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '20px', fontWeight: 800, color: 'var(--dark-green)' }}>
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </>
              )}
              
              <div style={{ display: 'flex', gap: '15px' }}>
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="btn btn-secondary" style={{ flex: '0 0 80px', padding: '15px' }}>Back</button>
                )}
                
                {step < 3 ? (
                  <button onClick={handleNextStep} className="btn" style={{ flex: 1, padding: '15px', fontSize: '18px' }}>
                    {step === 1 ? 'Proceed to Checkout' : 'Continue to Payment'}
                  </button>
                ) : (
                  <button onClick={handlePlaceOrder} className="btn" style={{ flex: 1, padding: '15px', fontSize: '18px', background: '#25D366', color: 'white', border: 'none' }}>
                    Place Order via WhatsApp
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartModal;
