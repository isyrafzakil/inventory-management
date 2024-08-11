import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, Box } from '@mui/material';
import Image from 'next/image';

interface ProductCardProps {
  product: { id: string; name: string; quantity: number; price: number; image_url: string; description: string };
  onRemove: () => void;
  onUpdate: (updatedProduct: Partial<{ name: string; quantity: number; price: number; image_url: string; description: string }>) => void;
  onUpdateQuantity: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove, onUpdate, onUpdateQuantity }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <Card>
      <CardMedia
        component="div"
        sx={{ height: 140, position: 'relative' }}
      >
        <Image
          src={product.image_url}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </CardMedia>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleChange}
              margin="normal"
            />
          </>
        ) : (
          <>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">{product.description}</Typography>
            <Typography variant="body1">Price: ${product.price}</Typography>
          </>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography variant="body1">Quantity: {product.quantity}</Typography>
          <TextField
            type="number"
            size="small"
            value={product.quantity}
            onChange={(e) => onUpdateQuantity(parseInt(e.target.value))}
            sx={{ ml: 2, width: 70 }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          {isEditing ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={handleEdit}>Edit</Button>
          )}
          <Button onClick={onRemove} color="error">Remove</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;