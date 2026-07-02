import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaTruck, FaShoppingCart, FaCreditCard, FaCheckCircle, FaTag, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import qrCodeImage from '../assets/qrcode.jpeg';
import CustomAlert from '../components/CustomAlert';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, calculateTotal, freeItemsCount } = useContext(CartContext);

  // Calculations
  const finalTotal = calculateTotal();
  const originalSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // For the savings summary
  const totalSavings = originalSubtotal - finalTotal;
  const productDiscount = cart.reduce((acc, item) => acc + ((item.price - item.discountPrice) * item.qty), 0);
  const freeItemsSavings = totalSavings - productDiscount; // The savings purely from the "Buy 5 get 1 free" offer

  const eligibleForFree = totalItems % 6 === 5;
  const missingForOffer = 5 - (totalItems % 6);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleNextStep = () => {
    if (step === 1) {
      if (totalItems >= 2) {
        setStep(2);
      } else {
        setAlertMessage('Minimum order quantity is 2 items. Please add more items to your cart.');
      }
    } else if (step === 2) {
      if (formData.name && formData.phone && formData.address) setStep(3);
      else setAlertMessage('Please fill out all delivery details.');
    }
  };

  const handlePlaceOrder = () => {
    let text = `*New Order Details*\n\n`;
    text += `*Customer:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    text += `*Address:* ${formData.address}\n\n`;
    text += `*Items:*\n`;

    cart.forEach(item => {
      text += `- ${item.name} x${item.qty} (₹${item.discountPrice * item.qty})\n`;
    });

    if (freeItemsCount > 0) {
      text += `\n*Offer Applied:* ${freeItemsCount} FREE Plant(s) included!\n`;
    }

    text += `\n*Grand Total: ₹${finalTotal}*\n`;
    text += `*Payment Method:* UPI/QR (Prepaid)\n`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919932176236?text=${encodedText}`;

    window.location.href = whatsappUrl;
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="page-transition" style={{ paddingTop: '90px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', background: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', maxWidth: '500px', width: '90%' }}
        >
          <div style={{ width: '150px', height: '150px', margin: '0 auto 25px', background: 'var(--light-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaShoppingCart size={60} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '28px', color: 'var(--text-dark)', marginBottom: '10px' }}>Your Cart is Empty</h2>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '30px' }}>Looks like you haven't added any plants yet.</p>
          <Link to="/shop" className="btn" style={{ padding: '14px 30px', fontSize: '16px' }}>Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { id: 1, label: 'Review Cart', icon: <FaShoppingCart /> },
    { id: 2, label: 'Delivery', icon: <FaTruck /> },
    { id: 3, label: 'Payment', icon: <FaCreditCard /> }
  ];

  return (
    <div className="page-transition" style={{ paddingTop: '90px', minHeight: '100vh', background: '#fafafa', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        <div className="checkout-layout">

          {/* LEFT: Vertical Progress Indicator */}
          <div className="checkout-sidebar-left">
            {step === 1 ? (
              <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--dark-green)', textDecoration: 'none', marginBottom: '20px', marginTop: '20px', fontSize: '18px' }}>
                <FaArrowLeft />
              </Link>
            ) : (
              <button onClick={() => setStep(step - 1)} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--dark-green)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', marginTop: '20px', fontSize: '18px', padding: 0 }}>
                <FaArrowLeft />
              </button>
            )}
            <div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              {steps.map((s, idx) => {
                const isActive = step === s.id;
                const isCompleted = step > s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => s.id < step ? setStep(s.id) : null}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '15px', padding: '15px',
                      cursor: s.id < step ? 'pointer' : 'default',
                      position: 'relative',
                      opacity: isActive || isCompleted ? 1 : 0.5
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeStep"
                        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--primary)', borderRadius: '4px' }}
                      />
                    )}
                    <div style={{
                      width: '35px', height: '35px', borderRadius: '50%',
                      background: isActive ? 'var(--primary)' : isCompleted ? '#25D366' : '#f0f0f0',
                      color: isActive || isCompleted ? 'white' : '#888',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'
                    }}>
                      {isCompleted ? <FaCheck /> : s.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '14px', color: isActive ? 'var(--primary)' : 'var(--text-dark)', fontWeight: isActive ? 700 : 500 }}>{s.label}</h4>
                      {isActive && <span style={{ fontSize: '11px', color: '#888' }}>In Progress</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER: Main Content Area */}
          <div className="checkout-content">
            <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', minHeight: '400px', marginTop: '58px' }}>
              <AnimatePresence mode="wait">

                {/* STEP 1: REVIEW CART */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                    {/* Free Plant Banner */}
                    <div style={{ marginBottom: '25px', padding: '12px 20px', borderRadius: '12px', background: eligibleForFree ? '#e8f5e9' : '#f8fdf8', border: `1px solid ${eligibleForFree ? '#a5d6a7' : '#e0e0e0'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaTag color={eligibleForFree ? "#2e7d32" : "var(--primary)"} />
                        <span style={{ color: eligibleForFree ? '#2e7d32' : 'var(--text-dark)', fontWeight: 600, fontSize: '13px' }}>
                          {eligibleForFree ? '🎉 Add 1 more plant and get it FREE!' : `Add ${missingForOffer} more plant${missingForOffer > 1 ? 's' : ''} to unlock a FREE plant!`}
                        </span>
                      </div>
                      <Link to="/shop" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Browse</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '15px', padding: '15px', border: '1px solid #f0f0f0', borderRadius: '15px', alignItems: 'center' }}>
                          <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'contain', background: '#f8fdf8', borderRadius: '10px', padding: '5px' }} />
                          <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '15px', color: 'var(--text-dark)', marginBottom: '4px', fontWeight: 700 }}>{item.name}</h3>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '14px' }}>₹{item.discountPrice}</span>
                              <span style={{ color: '#aaa', textDecoration: 'line-through', fontSize: '12px' }}>₹{item.price}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px 8px', borderRadius: '20px', border: '1px solid #ddd' }}>
                            <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontSize: '12px', padding: '4px' }}><FaMinus /></button>
                            <span style={{ fontWeight: 700, fontSize: '14px', width: '16px', textAlign: 'center', color: 'var(--text-dark)' }}>{item.qty}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontSize: '12px', padding: '4px' }}><FaPlus /></button>
                          </div>

                          <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', color: '#e63946', border: 'none', cursor: 'pointer', padding: '10px' }}>
                            <FaTrash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DELIVERY */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                    {/* Free Delivery Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f8fdf8', borderRadius: '12px', border: '1px solid #e0f2eb', marginBottom: '25px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <FaTruck size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark-green)' }}>Delivery Fee: <span style={{ color: '#25D366' }}>FREE</span></div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Estimated Delivery: 2–4 Days</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase' }}>Full Name</label>
                          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Username" style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase' }}>Phone</label>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="9876543210" style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }} />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase' }}>Complete Address</label>
                        <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="House no, Street, Landmark, City, Pincode" style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', minHeight: '120px', outline: 'none', resize: 'vertical' }}></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PAYMENT */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                    {/* Savings Summary */}
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '15px', borderRadius: '12px', marginBottom: '25px' }}>
                      <h4 style={{ fontSize: '13px', color: '#166534', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Savings Today</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#15803d', marginBottom: '4px' }}>
                        <span>Product Discount</span>
                        <span>₹{productDiscount} Saved</span>
                      </div>
                      {freeItemsSavings > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#15803d', marginBottom: '4px' }}>
                          <span>Offer Discount (Free Plants)</span>
                          <span>₹{freeItemsSavings} Saved</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#15803d', marginBottom: '8px' }}>
                        <span>Free Delivery</span>
                        <span>₹99 Saved</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: '#166534', paddingTop: '8px', borderTop: '1px solid #bbf7d0' }}>
                        <span>Total Savings</span>
                        <span>₹{totalSavings + 99}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <h3 style={{ fontSize: '18px', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: 700 }}>Scan & Pay ₹{finalTotal}</h3>
                      <div style={{ display: 'inline-block', padding: '15px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
                        <img src={qrCodeImage} alt="Payment QR" style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: '10px' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#d32f2f', fontSize: '12px', fontWeight: 700, background: '#ffebee', padding: '8px 15px', borderRadius: '20px', width: 'fit-content', margin: '0 auto' }}>
                        <FaCheckCircle /> Cash on Delivery is NOT Available
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Order Summary Sidebar */}
          <div className="checkout-sidebar-right">
            <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', position: 'sticky', top: '100px', marginTop: '58px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-dark)', marginBottom: '20px', fontWeight: 800 }}>Payment Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#666', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{originalSubtotal}</span>
                </div>

                {productDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#25D366' }}>
                    <span>Product Discount</span>
                    <span>- ₹{productDiscount}</span>
                  </div>
                )}

                {freeItemsSavings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#25D366' }}>
                    <span>Offer Discount</span>
                    <span>- ₹{freeItemsSavings}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Fee</span>
                  <span style={{ color: '#25D366', fontWeight: 700 }}>FREE</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes</span>
                  <span>Included</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', marginBottom: '20px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)' }}>Total Amount</span>
                <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--primary)' }}>₹{finalTotal}</span>
              </div>

              {/* Savings Highlight */}
              <div style={{ color: 'var(--primary)', textAlign: 'center', fontSize: '13px', fontWeight: 800, marginBottom: '25px' }}>
                You Saved ₹{totalSavings + 99} Today! 🎉
              </div>

              {/* Action Button (No back button) */}
              {step < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="btn"
                  style={{ width: '100%', padding: '14px', fontSize: '14px', borderRadius: '12px' }}
                >
                  {step === 1 ? 'Proceed to Delivery' : 'Continue to Payment'}
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  className="btn"
                  style={{ width: '100%', padding: '14px', fontSize: '14px', borderRadius: '12px', background: '#25D366', border: 'none', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)' }}
                >
                  Place Order via WhatsApp
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .checkout-layout {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }
        .checkout-sidebar-left {
          flex: 0 0 220px;
        }
        .checkout-content {
          flex: 1 1 auto;
          min-width: 0;
        }
        .checkout-sidebar-right {
          flex: 0 0 320px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .checkout-layout {
            flex-direction: column;
          }
          .checkout-sidebar-left {
            flex: 1 1 auto;
            width: 100%;
          }
          .checkout-sidebar-left > div {
            display: flex;
            justify-content: space-between;
          }
          .checkout-sidebar-left h4, .checkout-sidebar-left span {
            display: none;
          }
          .checkout-sidebar-right {
            flex: 1 1 auto;
            width: 100%;
          }
        }
      `}</style>
      <CustomAlert isOpen={!!alertMessage} message={alertMessage} onClose={() => setAlertMessage('')} />
    </div>
  );
};

export default Cart;
