// 👇 your imports stay the same
import { useState, useEffect } from 'react';
import {
  FreeBreakfast as BreakfastIcon,
  LunchDining as LunchIcon,
  DinnerDining as DinnerIcon,
  Restaurant as DefaultIcon,
  LunchDining as VegIcon,
  KebabDining as NonVegIcon,
  ShoppingCart as CartIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useUser } from '@clerk/clerk-react';
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
  const { user } = useUser();

  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    const valid = stored.filter((it) => it._id);
    setCartItems(valid);
    const qtyMap = {};
    valid.forEach((it) => (qtyMap[it._id] = it.quantity || 1));
    setQuantities(qtyMap);
  }, []);

  const showMsg = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  const categoryIcon = (cat = '') => {
    switch (cat.toLowerCase()) {
      case 'breakfast':
        return <BreakfastIcon fontSize='small' sx={{ color: '#facc15' }} />;
      case 'lunch':
        return <LunchIcon fontSize='small' sx={{ color: '#22c55e' }} />;
      case 'dinner':
        return <DinnerIcon fontSize='small' sx={{ color: '#ef4444' }} />;
      default:
        return <DefaultIcon fontSize='small' sx={{ color: '#3b82f6' }} />;
    }
  };

  const handleQty = (_id, val) => {
    const qty = Math.max(1, Math.min(99, Number(val) || 1));
    const updated = cartItems.map((it) =>
      it._id === _id ? { ...it, quantity: qty } : it
    );
    setCartItems(updated);
    setQuantities((p) => ({ ...p, [_id]: qty }));
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleRemove = (_id) => {
    const updated = cartItems.filter((it) => it._id !== _id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    showMsg('Item removed from cart.', 'info');
  };

  const totalPrice = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  // ✅✅ FIXED Checkout function
  const handleCheckout = async () => {
    if (!cartItems.length) return showMsg('Your cart is empty!', 'warning');

    const gmailAccount = user?.primaryEmailAddress?.emailAddress;
    if (!gmailAccount) return showMsg('User email not found!', 'error');

    const transformedItems = cartItems.map((item) => ({
      item_id: item._id, // Server expects item_id
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload = {
      items: transformedItems,
      totalAmount: totalPrice, // Server expects totalAmount
      gmailAccount,
    };

    const url = import.meta.env.PROD
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:3001';

    try {
      const res = await fetch(`${url}/api/auth/addOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await res.json().catch(() => ({}));
      console.log('Checkout response:', data);

      if (res.ok && data.status) {
        localStorage.removeItem('cart');
        setCartItems([]);
        setQuantities({});
        showMsg('Checkout successful! Thank you for your order.');
      } else {
        throw new Error(data.message || 'Checkout failed');
      }
    } catch (err) {
      console.error(err);
      showMsg(err.message, 'error');
    }
  };

  return (
    <div className='max-w-5xl mx-auto min-h-screen'>
      <Typography
        variant='h4'
        align='center'
        sx={{
          fontWeight: 700,
          mb: 4,
          background: 'linear-gradient(45deg,#22c55e,#3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.8rem', sm: '2.5rem' },
        }}
      >
        Your Cart
      </Typography>

      {!cartItems.length ? (
        <Typography variant='body1' align='center' color='white'>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)' },
              gap: 3,
            }}
          >
            {cartItems.map((item) => (
              <Card
                key={item._id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component='img'
                  image={item.image}
                  alt={item.name}
                  sx={{
                    width: { xs: '100%', sm: 120 },
                    height: { xs: 160, sm: 'auto' },
                    objectFit: 'cover',
                    borderRadius: { xs: '12px 12px 0 0', sm: '12px 0 0 12px' },
                  }}
                />

                <CardContent
                  sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant='h6' sx={{ fontWeight: 700 }}>
                    {item.name}
                  </Typography>
                  <Typography variant='subtitle2' color='text.secondary'>
                    ₹{item.price} each
                  </Typography>

                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Chip
                      icon={categoryIcon(item.category)}
                      label={item.category}
                      size='small'
                    />
                    <Chip
                      icon={
                        item.veg ? (
                          <VegIcon fontSize='small' />
                        ) : (
                          <NonVegIcon fontSize='small' />
                        )
                      }
                      label={item.veg ? 'Veg' : 'Non‑Veg'}
                      size='small'
                      color={item.veg ? 'success' : 'error'}
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <TextField
                      type='number'
                      size='small'
                      label='Qty'
                      value={quantities[item._id] || 1}
                      onChange={(e) => handleQty(item._id, e.target.value)}
                      inputProps={{ min: 1, max: 99 }}
                      sx={{ width: 80 }}
                    />
                    <Button
                      color='error'
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemove(item._id)}
                      sx={{ ml: 'auto' }}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              mt: 6,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography
              variant='h6'
              sx={{ fontWeight: 700, color: 'whitesmoke' }}
            >
              Total: ₹{totalPrice}
            </Typography>
            <Button
              variant='contained'
              color='success'
              startIcon={<CartIcon />}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
