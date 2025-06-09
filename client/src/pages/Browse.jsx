import { useMemo, useState } from 'react';
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
  Input,
} from '@mui/material';
import FoodCard from '../components/Food/FoodCard';
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
    image: '',
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

  const filteredItems = useMemo(() => {
    return dummyItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
    <div className='max-w-7xl mx-auto px-4 py-8 min-h-screen'>
      <Typography
        variant='h4'
        align='center'
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
      <Box maxWidth='400px' mx='auto' mb={6}>
        <input
          type='text'
          placeholder='Search food items...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            variant='body1'
            align='center'
            sx={{ color: 'text.secondary', gridColumn: '1 / -1' }}
          >
            No food items found.
          </Typography>
        ) : (
          filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              quantity={quantities[item.id] || 1}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
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
