import React, { createContext, useContext, useState, useEffect } from 'react';
import { plants as defaultPlants } from '../data/plants';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load from local storage or fallback to default
    const savedProducts = localStorage.getItem('nursery_products_v2');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([]);
      localStorage.setItem('nursery_products_v2', JSON.stringify([]));
    }
  }, []);

  const addProduct = (newProduct) => {
    // Create new product with a generated ID
    const product = {
      ...newProduct,
      id: Date.now(), // Generate a unique ID
      rating: 5.0, // Default rating
      reviewCount: 0,
      stock: 'In Stock'
    };

    const updatedProducts = [product, ...products]; // Add at the beginning
    setProducts(updatedProducts);
    localStorage.setItem('nursery_products_v2', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('nursery_products_v2', JSON.stringify(updatedProducts));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
