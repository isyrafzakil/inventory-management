import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { supabase } from '../lib/supabaseClient';

const HomePage = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setItems(data);
    }
  };

  const handleAddProduct = async (product: { name: string; quantity: number; price: number; image_url: string; description: string }) => {
    const { data, error } = await supabase.from('products').insert([product]).select();
    if (error) {
      console.error('Error adding product:', error);
    } else {
      setItems([...items, data[0]]);
    }
  };

  const handleUpdateProduct = async (id: string, updatedProduct: Partial<{ name: string; quantity: number; price: number; image_url: string; description: string }>) => {
    const { error } = await supabase.from('products').update(updatedProduct).eq('id', id);
    if (error) {
      console.error('Error updating product:', error);
    } else {
      setItems(items.map(item => item.id === id ? { ...item, ...updatedProduct } : item));
    }
  };

  const handleRemoveProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Error removing product:', error);
    } else {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    const { error } = await supabase.from('products').update({ quantity }).eq('id', id);
    if (error) {
      console.error('Error updating quantity:', error);
    } else {
      setItems(items.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory Management App
        </Typography>
        <ProductForm onAddProduct={handleAddProduct} />
        <ProductList
          items={items}
          onRemoveProduct={handleRemoveProduct}
          onUpdateProduct={handleUpdateProduct}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </Paper>
    </Container>
  );
};

export default HomePage;