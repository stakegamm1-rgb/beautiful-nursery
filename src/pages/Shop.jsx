import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { FaSearch } from 'react-icons/fa';

const Shop = () => {
  const { products: plants } = useProducts();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [minRating, setMinRating] = useState(0);
  const [stockFilter, setStockFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sync state if URL changes (e.g. clicking navbar links while already on shop page)
  useEffect(() => {
    const queryCategory = new URLSearchParams(location.search).get('category');
    if (queryCategory) {
      setCategory(queryCategory);
    } else {
      setCategory('All');
    }
  }, [location.search]);

  const categories = ['All', 'Indoor', 'Outdoor', 'Flower', 'Fruit', 'Succulent', 'Medicinal'];

  // 1. Filter
  let filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || plant.category === category;
    const matchesRating = plant.rating >= minRating;
    const matchesStock = stockFilter === 'All' || 
                        (stockFilter === 'In Stock' && plant.stock === 'In Stock') ||
                        (stockFilter === 'Out of Stock' && plant.stock !== 'In Stock');
    return matchesSearch && matchesCategory && matchesRating && matchesStock;
  });

  // 2. Sort
  filteredPlants.sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.discountPrice - b.discountPrice;
    if (sortBy === 'Price: High to Low') return b.discountPrice - a.discountPrice;
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    if (sortBy === 'Newest') return b.id - a.id;
    // Popularity logic (dummy)
    return b.rating * 10 - a.rating * 10;
  });

  // 3. Pagination
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const paginatedPlants = filteredPlants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, minRating, stockFilter, sortBy]);

  return (
    <div className="page-transition" style={{ paddingTop: '70px' }}>
      <div className="container section-padding">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="title">
            {category === 'All' ? 'Our ' : `${category} `}
            <span>{category === 'All' ? 'Shop' : 'Plants'}</span>
          </h1>
          <p style={{ color: 'var(--dark-green)' }}>Browse our collection of premium, healthy plants.</p>
        </div>

        {/* Search & Filters Bar */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Search Bar - Left Aligned & Compact */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <input 
                type="text" 
                placeholder="Search premium plants..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '45px', paddingRight: '20px', height: '50px', fontSize: '16px', borderRadius: '25px', width: '100%' }}
              />
              <FaSearch size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} />
            </div>
            
            {/* Filter & Sort Controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-start' }}>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="input-field" 
                style={{ 
                  width: 'auto',
                  appearance: 'none', WebkitAppearance: 'none',
                  padding: '8px 25px 8px 15px', fontSize: '13px', height: '38px', borderRadius: '20px',
                  background: 'white url("data:image/svg+xml;utf8,<svg fill=\'%23333\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 10px center',
                  backgroundSize: '16px', border: '1px solid #ddd'
                }}
              >
                <option value="All">Categories</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Flower">Flower</option>
                <option value="Fruit">Fruit</option>
                <option value="Succulent">Succulent</option>
              </select>

              <select 
                value={minRating} 
                onChange={(e) => setMinRating(Number(e.target.value))} 
                className="input-field" 
                style={{ 
                  width: 'auto',
                  appearance: 'none', WebkitAppearance: 'none',
                  padding: '8px 25px 8px 15px', fontSize: '13px', height: '38px', borderRadius: '20px',
                  background: 'white url("data:image/svg+xml;utf8,<svg fill=\'%23333\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 10px center',
                  backgroundSize: '16px', border: '1px solid #ddd'
                }}
              >
                <option value={0}>Ratings</option>
                <option value={4.5}>4.5★+</option>
                <option value={4.8}>4.8★+</option>
              </select>

              <select 
                value={stockFilter} 
                onChange={(e) => setStockFilter(e.target.value)} 
                className="input-field" 
                style={{ 
                  width: 'auto',
                  appearance: 'none', WebkitAppearance: 'none',
                  padding: '8px 25px 8px 15px', fontSize: '13px', height: '38px', borderRadius: '20px',
                  background: 'white url("data:image/svg+xml;utf8,<svg fill=\'%23333\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 10px center',
                  backgroundSize: '16px', border: '1px solid #ddd'
                }}
              >
                <option value="All">Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="input-field" 
                style={{ 
                  width: 'auto',
                  appearance: 'none', WebkitAppearance: 'none',
                  padding: '8px 25px 8px 15px', fontSize: '13px', height: '38px', borderRadius: '20px',
                  background: 'var(--light-green) url("data:image/svg+xml;utf8,<svg fill=\'%23333\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>") no-repeat right 10px center',
                  backgroundSize: '16px', border: '1px solid var(--primary)'
                }}
              >
                <option value="Popularity">Sort: Popular</option>
                <option value="Newest">Sort: Newest</option>
                <option value="Highest Rated">Sort: Rating</option>
                <option value="Price: Low to High">Sort: Price ↑</option>
                <option value="Price: High to Low">Sort: Price ↓</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {paginatedPlants.length > 0 ? (
          <>
            <motion.div 
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px', marginBottom: '40px' }}
            >
              {paginatedPlants.map((plant, index) => (
                <motion.div 
                  key={plant.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={plant} />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{ padding: '8px 15px', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  Previous
                </button>
                <span style={{ fontWeight: 'bold', color: 'var(--dark-green)' }}>Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn"
                  style={{ padding: '8px 15px', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--dark-green)' }}>
            <img 
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp" 
              alt="No Data Found" 
              style={{ maxWidth: '300px', margin: '0 auto', opacity: 0.8 }}
            />
            <h3 style={{ fontSize: '24px', marginBottom: '10px', marginTop: '20px' }}>Oops! No plants found. 🌿</h3>
            <p>Try adjusting your filters or search for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
