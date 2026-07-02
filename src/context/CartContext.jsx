import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bn_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('bn_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bn_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Calculate totals and free items
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const calculateTotal = () => {
    if (totalItems === 0) return 0;
    const flatCart = [];
    cart.forEach(item => {
      for (let i = 0; i < item.qty; i++) {
        flatCart.push(item);
      }
    });
    flatCart.sort((a, b) => b.discountPrice - a.discountPrice);
    let total = 0;
    for (let i = 0; i < flatCart.length; i++) {
      if ((i + 1) % 6 !== 0) {
        total += flatCart[i].discountPrice;
      }
    }
    return total;
  };

  const freeItemsCount = Math.floor(totalItems / 6);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: item.qty + amount };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalItems,
      calculateTotal,
      freeItemsCount,
      wishlist,
      toggleWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};
