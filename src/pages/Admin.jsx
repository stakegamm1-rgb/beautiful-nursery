import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Upload, Plus, Check, Trash2 } from 'lucide-react';

const Admin = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountPrice: '',
    category: 'Indoor',
    badge: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Compress image before saving to fit within Firestore's 1MB limit
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress to WebP at 70% quality (very small file size)
          const dataUrl = canvas.toDataURL('image/webp', 0.7);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const compressedBase64 = await compressImage(file);
        setFormData((prev) => ({ ...prev, image: compressedBase64 }));
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Failed to process image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    let imageUrl = formData.image || "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    
    await addProduct({
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      image: imageUrl,
    });

    setSuccess(true);
    setIsUploading(false);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({
      name: '',
      price: '',
      discountPrice: '',
      category: 'Indoor',
      badge: '',
      image: ''
    });
  };

  return (
    <div className="page-transition" style={{ paddingTop: '100px', paddingBottom: '60px', background: 'var(--background)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="title" style={{ textAlign: 'center', marginBottom: '40px' }}>Admin <span>Panel</span></h1>
        
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--dark-green)', marginBottom: '25px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
            <Plus style={{ marginRight: '10px', color: 'var(--primary)' }} />
            Add New Product
          </h2>
          
          {success && (
            <div style={{ marginBottom: '25px', padding: '15px 20px', background: '#f0fff4', color: '#2e7d32', borderRadius: '12px', display: 'flex', alignItems: 'center', border: '1px solid #c8e6c9' }}>
              <Check style={{ marginRight: '10px' }} />
              Product added successfully! It is now visible on the shop page.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd' }}
                  placeholder="e.g. Monstera Deliciosa"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white' }}
                >
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Flower">Flower</option>
                  <option value="Medicinal">Medicinal</option>
                  <option value="Succulent">Succulent</option>
                  <option value="Fruit">Fruit</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd' }}
                  placeholder="0"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Discount Price (₹)</label>
                <input
                  type="number"
                  name="discountPrice"
                  min="0"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd' }}
                  placeholder="Leave blank if no discount"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="input-field"
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '1px solid #ddd' }}
                  placeholder="e.g. Best Seller, New"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#555', marginBottom: '8px' }}>Product Image *</label>
              
              {isUploading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', border: '2px dashed #ccc', borderRadius: '12px', background: '#fafafa' }}>
                  <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Processing Image...</p>
                </div>
              ) : formData.image ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', border: '2px dashed #ccc', borderRadius: '12px', background: '#fafafa' }}>
                  <img src={formData.image} alt="Preview" style={{ height: '120px', objectFit: 'contain', marginBottom: '15px', borderRadius: '8px' }} />
                  <button type="button" onClick={() => setFormData(prev => ({...prev, image: ''}))} style={{ background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', fontWeight: 'bold' }}>Remove Image</button>
                </div>
              ) : (
                <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', border: '2px dashed #ccc', borderRadius: '12px', background: '#fafafa', cursor: 'pointer', width: '100%' }}>
                  <Upload style={{ color: '#ccc', width: '40px', height: '40px', marginBottom: '10px' }} />
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }}>
                    Upload a file
                  </span>
                  <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} required />
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>PNG, JPG, GIF</p>
                </label>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
              <button
                type="submit"
                disabled={isUploading}
                className="btn"
                style={{ padding: '14px 30px', fontSize: '16px', background: isUploading ? '#ccc' : 'var(--primary)', color: 'white', border: 'none', borderRadius: '30px', cursor: isUploading ? 'not-allowed' : 'pointer' }}
              >
                {isUploading ? 'Uploading...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>

        {/* Product List Section */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--dark-green)', marginBottom: '25px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
            Manage Products
          </h2>
          
          {products.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>No products found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee', color: '#555' }}>
                    <th style={{ padding: '15px 10px' }}>Product</th>
                    <th style={{ padding: '15px 10px' }}>Category</th>
                    <th style={{ padding: '15px 10px' }}>Price</th>
                    <th style={{ padding: '15px 10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} />
                          <span style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>{product.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '15px 10px', color: '#666' }}>{product.category}</td>
                      <td style={{ padding: '15px 10px', color: '#666' }}>₹{product.discountPrice || product.price}</td>
                      <td style={{ padding: '15px 10px' }}>
                        <button 
                          onClick={() => {
                            if(window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          style={{ background: '#ffebee', color: '#e63946', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
