import { useState, useEffect } from 'react';
import {
  FreeBreakfast as FreeBreakfastIcon,
  LunchDining as LunchDiningIcon,
  DinnerDining as DinnerDiningIcon,
  Restaurant as RestaurantIcon,
  LunchDining as VegIcon,
  KebabDining as NonVegIcon,
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, []);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'breakfast':
        return <FreeBreakfastIcon fontSize="small" sx={{ color: '#facc15' }} />;
      case 'lunch':
        return <LunchDiningIcon fontSize="small" sx={{ color: '#22c55e' }} />;
      case 'dinner':
        return <DinnerDiningIcon fontSize="small" sx={{ color: '#ef4444' }} />;
      default:
        return <RestaurantIcon fontSize="small" sx={{ color: '#3b82f6' }} />;
    }
  };

  const handleQuantityChange = (itemId, value) => {
    let qty = Number(value);
    if (isNaN(qty) || qty < 1) qty = 1;
    else if (qty > 99) qty = 99;

    setQuantities((prev) => ({ ...prev, [itemId]: qty }));
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleUpdateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setSnackbar({
      open: true,
      message: 'Cart updated successfully!',
      severity: 'success',
    });
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSnackbar({
      open: true,
      message: 'Item removed from cart.',
      severity: 'info',
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setSnackbar({
        open: true,
        message: 'Your cart is empty!',
        severity: 'error',
      });
      return;
    }
    localStorage.removeItem('cart');
    setCartItems([]);
    setSnackbar({
      open: true,
      message: 'Checkout successful! Thank you for your order.',
      severity: 'success',
    });
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen">
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: '700',
          mb: 4,
          background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.8rem', sm: '2.5rem' },
        }}
      >
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center" color="white">
          Your cart is empty.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {cartItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                borderRadius: 3,
                boxShadow: 3,
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  width: { xs: '100%', sm: 120 },
                  height: { xs: 160, sm: 'auto' },
                  objectFit: 'cover',
                  borderRadius: { xs: '12px 12px 0 0', sm: '12px 0 0 12px' },
                }}
              />

              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                      mb: 0.5,
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: '600',
                      mb: 1,
                    }}
                  >
                    ₹{item.price} each
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                    <Chip
                      icon={getCategoryIcon(item.category)}
                      label={item.category}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}
                    />
                    <Chip
                      icon={item.veg ? <VegIcon fontSize="small" /> : <NonVegIcon fontSize="small" />}
                      label={item.veg ? 'Veg' : 'Non-Veg'}
                      size="small"
                      variant="outlined"
                      color={item.veg ? 'success' : 'error'}
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'nowrap',
                    mt: 'auto',
                    pt: 1,
                  }}
                >
                  <TextField
                    label="Qty"
                    type="number"
                    size="small"
                    inputProps={{
                      min: 1,
                      max: 99,
                      style: {
                        textAlign: 'center',
                        fontSize: '0.9rem',
                      },
                    }}
                    sx={{ width: 80 }}
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />

                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveItem(item.id)}
                    sx={{ ml: 'auto', fontSize: { xs: '0.75rem', sm: '0.9rem' } }}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {cartItems.length > 0 && (
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'whitesmoke' }}>
            Total: ₹{totalPrice}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" onClick={handleUpdateCart}>
              Update Cart
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckout}
              startIcon={<ShoppingCartIcon />}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            fontSize: '1rem',
            width: '100%',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '4px',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
