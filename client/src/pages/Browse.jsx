import { useState, useEffect, useMemo } from 'react';
import { Typography, Snackbar, Alert, Box } from '@mui/material';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import FoodCard from '../components/Food/FoodCard';

export default function Browse() {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/browseOrder`,
          { gmailAccount: user?.primaryEmailAddress?.emailAddress },
          { withCredentials: true }
        );

        if (response.data.success) {
          setItems(response.data.items);
        } else {
          setSnackbar({
            open: true,
            message: response.data.message || 'No items found.',
            severity: 'info',
          });
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setSnackbar({
          open: true,
          message: 'Failed to fetch food items.',
          severity: 'error',
        });
      }
    };

    if (user) fetchItems();
  }, [user]);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, items]);

  const handleQuantityChange = (itemId, value) => {
    const qty = Math.max(1, Math.min(99, Number(value) || 1));
    setQuantities((prev) => ({ ...prev, [itemId]: qty }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item._id] || 1;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex((c) => c._id === item._id);

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
    setQuantities((prev) => ({ ...prev, [item._id]: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
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

      <Box maxWidth="400px" mx="auto" mb={6}>
        <input
          type="text"
          placeholder="Search food items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Box>

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
          filteredItems.map((item, index) => (
            <FoodCard
              key={item._id || `${item.name}-${index}`}
              item={item}
              quantity={quantities[item._id] || 1}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
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
