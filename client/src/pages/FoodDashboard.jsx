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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

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

        setMessage('Food item added successfully!');
        setSeverity('success');
        setOpen(true);

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
        setMessage('Failed to add food item. Please try again later.');
        setSeverity('error');
        setOpen(true);
      }
    } else {
      setMessage('Please fill all required fields!');
      setSeverity('error');
      setOpen(true);
    }
  };

  const fetchItems = async (college_id) => {
    const items = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/admin/fetchItems?college_id=${college_id}`
    );
    if (items.data.items?.length > 0) {
      const transformedItems = items.data.items.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      }));
      setFoodItems(transformedItems);
    } else {
      setFoodItems([]);
    }
  };

  useEffect(() => {
    fetchItems('3523');
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            centered
            indicatorColor='primary'
            textColor='inherit'
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

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={severity}
          onClose={() => setOpen(false)}
          sx={{ fontSize: '1rem', width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FoodDashboard;
