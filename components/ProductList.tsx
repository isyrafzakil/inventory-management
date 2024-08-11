import React from 'react';
import { Grid } from '@mui/material';
import ProductCard  from './ProductCard';

interface ProductListProps {
  items: Array<{ id: string; name: string; quantity: number; price: number; image_url: string; description: string }>;
  onRemoveProduct: (id: string) => void;
  onUpdateProduct: (id: string, updatedProduct: Partial<{ name: string; quantity: number; price: number; image_url: string; description: string }>) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ items, onRemoveProduct, onUpdateProduct, onUpdateQuantity }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <ProductCard
            product={item}
            onRemove={() => onRemoveProduct(item.id)}
            onUpdate={(updatedProduct) => onUpdateProduct(item.id, updatedProduct)}
            onUpdateQuantity={(quantity) => onUpdateQuantity(item.id, quantity)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;