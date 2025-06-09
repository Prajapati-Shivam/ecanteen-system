import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';

import AddFoodForm from '../components/Food/AddFoodForm';
import ViewFoodItems from '../components/Food/ViewFoodItems';
import SearchFoodItems from '../components/Food/SearchFoodItems';

function FoodDashboard() {
  const [tab, setTab] = useState('create');

  const [foodForm, setFoodForm] = useState({
    college_id: '',
    name: '',
    image: '',
    price: '',
    veg: true,
    category: '',
  });

  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'error', 'info', 'warning'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleAddFood = async () => {
    const { college_id, name, price, category, veg, image } = foodForm;
    if (college_id && name && price && category && image && veg !== undefined) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/addItem`,
          {
            college_id,
            name,
            price: parseFloat(price),
            category,
            image,
            veg,
          }
        );

        showSnackbar('Food item added successfully!', 'success');

        setFoodItems([
          ...foodItems,
          { ...foodForm, id: res.data.item_id, availability: true },
        ]);
        setFoodForm({
          college_id: '',
          name: '',
          image: '',
          price: '',
          veg: true,
          category: '',
        });
      } catch (err) {
        console.error('Error adding food item:', err);
        showSnackbar(
          'Failed to add food item. Please try again later.',
          'error'
        );
      }
    } else {
      showSnackbar('Please fill all required fields!', 'error');
    }
  };

  const fetchItems = async (college_id) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/fetchItems?college_id=${college_id}`
      );
      const items = res.data.items || [];
      const transformed = items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      }));
      setFoodItems(transformed);
    } catch (err) {
      console.error('Error fetching items:', err);
      showSnackbar('Error fetching food items.', 'error');
    }
  };

  useEffect(() => {
    fetchItems('4090'); // Default college_id for now
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: 2,
        pb: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='md'>
        <Typography
          variant='h3'
          align='center'
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3.5rem' },
            background: 'linear-gradient(to right, #22c55e, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Food Panel
        </Typography>

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            centered
            indicatorColor='primary'
            textColor='inherit'
            sx={{ '& .MuiTab-root': { color: 'white' } }}
          >
            <Tab label='Add Food Item' value='create' />
            <Tab label='View Food Items' value='view' />
            <Tab label='Search Food Items' value='search' />
          </Tabs>
        </Box>

        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          {tab === 'create' && (
            <AddFoodForm
              foodForm={foodForm}
              setFoodForm={setFoodForm}
              handleAddFood={handleAddFood}
            />
          )}

          {tab === 'view' && <ViewFoodItems foodItems={foodItems} />}

          {tab === 'search' && (
            <SearchFoodItems
              search={search}
              setSearch={setSearch}
              foodItems={foodItems}
            />
          )}
        </Paper>
      </Container>

      {/* Snackbar for messages */}
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
    </Box>
  );
}

export default FoodDashboard;
