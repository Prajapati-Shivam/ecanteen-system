 import { useState } from 'react';
import {
  FreeBreakfast as FreeBreakfastIcon,
  LunchDining as LunchDiningIcon,
  DinnerDining as DinnerDiningIcon,
  Restaurant as RestaurantIcon,
  LunchDining as VegIcon,
  KebabDining as NonVegIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
  Chip,
  Box,
} from '@mui/material';

const dummyItems = [
  {
    id: 1,
    name: 'Veg Burger',
    price: 80,
    category: 'Lunch',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    veg: true,
  },
  {
    id: 2,
    name: 'Chicken Pizza',
    price: 150,
    category: 'Dinner',
    image:
      'https://sugarspunrun.com/wp-content/uploads/2024/05/BBQ-chicken-pizza-1-of-1.jpg',
    veg: false,
  },
  {
    id: 3,
    name: 'Salad Bowl',
    price: 60,
    category: 'Breakfast',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80',
    veg: true,
  },
  {
    id: 4,
    name: 'Mutton Kebab',
    price: 190,
    category: 'Dinner',
    image:
      'https://images.unsplash.com/photo-1623245916537-8361a91e0c24?auto=format&fit=crop&w=600&q=80',
    veg: false,
  },
];

export default function Browse() {
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState({}); // quantity per item

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const filteredItems = dummyItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
    const qty = Math.max(1, Math.min(99, Number(value) || 1));
    setQuantities((prev) => ({ ...prev, [itemId]: qty }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    setSnackbar({
      open: true,
      message: `${item.name} (x${quantity}) added to cart!`,
      severity: 'success',
    });

    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
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
        Browse Food Items
      </Typography>

      {/* Search Input */}
      <Box maxWidth="400px" mx="auto" mb={6}>
        <TextField
          label="Search Food"
        
          fullWidth
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ borderRadius: 2, bgcolor: 'background.paper' }}
        />
      </Box>

      {/* Cards Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
          px: { xs: 1, sm: 0 },
        }}
      >
        {filteredItems.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'text.secondary', gridColumn: '1 / -1' }}
          >
            No food items found.
          </Typography>
        ) : (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  width: '100%',
                  height: { xs: 180, sm: 200 },
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  objectFit: 'cover',
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' }, mb: 0.5 }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: '600',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      mb: 1,
                    }}
                  >
                    ₹{item.price}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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

                {/* Quantity + Add Button Row */}
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'nowrap',
                  }}
                >
                  <TextField
                    label="Qty"
                    type="number"
                    size="small"
                    inputProps={{
                      min: 1,
                      max: 99,
                      style: { textAlign: 'center', fontSize: '0.9rem' },
                    }}
                    sx={{ width: 80 }}
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />

                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => handleAddToCart(item)}
                    sx={{
                      backgroundColor: 'success.main',
                      flexGrow: 1,
                      fontWeight: '700',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '&:hover': { backgroundColor: 'success.dark' },
                    }}
                    startIcon={<ShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

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
