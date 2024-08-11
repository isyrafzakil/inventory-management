import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface ProductFormProps {
  onAddProduct: (product: { name: string; quantity: number; price: number; image_url: string; description: string }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<number>(0);
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [newItemImageUrl, setNewItemImageUrl] = useState<string>('');
  const [newItemDescription, setNewItemDescription] = useState<string>('');

  const handleAddItem = () => {
    if (newItemName.trim() && newItemQuantity > 0 && newItemPrice > 0) {
      onAddProduct({
        name: newItemName,
        quantity: newItemQuantity,
        price: newItemPrice,
        image_url: newItemImageUrl,
        description: newItemDescription,
      });
      setNewItemName('');
      setNewItemQuantity(0);
      setNewItemPrice(0);
      setNewItemImageUrl('');
      setNewItemDescription('');
    }
  };

  return (
    <Box component="form" sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Add New Product
      </Typography>
      <TextField
        label="Product Name"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Quantity"
        value={newItemQuantity}
        onChange={(e) => setNewItemQuantity(parseInt(e.target.value, 10))}
        fullWidth
        margin="normal"
        variant="outlined"
        type="number"
      />
      <TextField
        label="Price"
        value={newItemPrice}
        onChange={(e) => setNewItemPrice(parseFloat(e.target.value))}
        fullWidth
        margin="normal"
        variant="outlined"
        type="number"
      />
      <TextField
        label="Image URL"
        value={newItemImageUrl}
        onChange={(e) => setNewItemImageUrl(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Description"
        value={newItemDescription}
        onChange={(e) => setNewItemDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddItem}
        sx={{ mt: 2 }}
        fullWidth
      >
        Add Product
      </Button>
    </Box>
  );
};

export default ProductForm;
