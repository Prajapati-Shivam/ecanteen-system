import { useState } from 'react';
import { Box, Container, Paper, Typography, Tabs, Tab } from '@mui/material';

import AddFoodForm from '../components/Food/AddFoodForm';
import ViewFoodItems from '../components/Food/ViewFoodItems';
import SearchFoodItems from '../components/Food/SearchFoodItems';

function Dashboard() {
  // check if the user is admin otherwise redirect to home page
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

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleAddFood = () => {
    const { college_id, name, price, category, veg, image } = foodForm;
    console.log('Adding food item:', foodForm);
    if (college_id && name && price && category) {
      setFoodItems([...foodItems, { ...foodForm, id: Date.now() }]);
      setFoodForm({
        college_id: '',
        name: '',
        image: '',
        price: '',
        veg: true,
        category: '',
      });
    } else {
      alert('Please fill all required fields!');
    }
  };

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
          Dashboard
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
    </Box>
  );
}

export default Dashboard;
