import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to realtime updates from Firestore
    const unsubscribe = onSnapshot(collection(db, 'products'), (querySnapshot) => {
      const fetchedProducts = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort locally to ensure newest products show first 
      // (safely handles manually added products without createdAt field)
      fetchedProducts.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      
      setProducts(fetchedProducts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products from Firebase:", error);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const productData = {
        ...newProduct,
        rating: 5.0, // Default rating
        reviewCount: 0,
        stock: 'In Stock',
        createdAt: serverTimestamp() // Add a timestamp for ordering
      };
      
      // Add a new document with a generated id to "products" collection
      await addDoc(collection(db, 'products'), productData);
    } catch (error) {
      console.error("Error adding product to Firebase:", error);
      alert("Failed to add product. Make sure Firestore is initialized and rules allow writing.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      // Delete the document by id
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product from Firebase:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
