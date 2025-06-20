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

function FoodDashboard() {
  const [tab, setTab] = useState('create');
  const [foodForm, setFoodForm] = useState({
    name: '',
    image: '',
    price: '',
    veg: true,
    category: '',
  });
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const { name, price, category, veg, image } = foodForm;
    const url = import.meta.env.VITE_API_URL || window.location.origin;
    if (name && price && category && image && veg !== undefined) {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('veg', veg);
        formData.append('image', image); // ✅ actual File object

        setIsSubmitting(true);
        const res = await axios.post(
          `${url}/api/admin/addItem`,
          formData,
          {
            withCredentials: true, // Ensures cookies are sent
          }
          // ❌ Do not set headers — let Axios set the correct Content-Type
        );

        showSnackbar('Food item added successfully!', 'success');
        setFoodItems([
          ...foodItems,
          { ...foodForm, id: res.data.item_id, availability: true },
        ]);
        setFoodForm({
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
    setIsSubmitting(false);
  };

  const url = import.meta.env.VITE_API_URL || window.location.origin;
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${url}/api/admin/fetchItems`, {
        withCredentials: true,
      });
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
    fetchItems(); // Default college_id for now
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      maxWidth='lg'
      className='min-h-screen md:px-2 pb-4 flex flex-col mx-auto'
    >
      <div className='flex flex-col sm:flex-row items-center justify-between p-4'>
        <h3 className='text-2xl font-bold text-white'>Food Panel</h3>
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
        </Tabs>
      </div>
      <Container maxWidth='lg'>
        <Paper elevation={6} sx={{ borderRadius: 3 }} className='p-2 sm:p-4'>
          {tab === 'create' && (
            <AddFoodForm
              foodForm={foodForm}
              setFoodForm={setFoodForm}
              handleAddFood={handleAddFood}
              isSubmitting={isSubmitting}
            />
          )}

          {tab === 'view' && (
            <ViewFoodItems
              foodItems={foodItems}
              setFoodItems={setFoodItems}
              search={search}
              setSearch={setSearch}
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
