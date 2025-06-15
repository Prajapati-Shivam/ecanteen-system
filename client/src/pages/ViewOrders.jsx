import React from 'react';
import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import OrderTable from '../components/Order/OrderTable';
import OrderPending from '../components/Order/OrderPending';
import OrderComplete from '../components/Order/OrderComplete';

const ViewOrders = () => {
  const [tab, setTab] = React.useState('active');
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      maxWidth='lg'
      className='min-h-screen md:px-2 pb-4 flex flex-col mx-auto'
    >
      <div className='flex flex-col sm:flex-row items-center justify-between p-4'>
        <Typography variant='h4' className='text-white font-bold mb-2'>
          View Orders
        </Typography>

        <Tabs
          value={tab}
          className='p-2 m-2'
          onChange={handleTabChange}
          centered
          indicatorColor='primary'
          textColor='inherit'
          sx={{ '& .MuiTab-root': { color: 'white' } }}
        >
          <Tab label='Active' value='active' />
          <Tab label='Completed' value='completed' />
          <Tab label='All' value='all' />
        </Tabs>
      </div>

      <Container maxWidth='lg'>
        <Paper
          elevation={6}
          sx={{ borderRadius: 3, backgroundColor: 'transparent' }}
          className='p-4'
        >
          {tab === 'active' && <OrderPending />}
          {tab === 'completed' && <OrderComplete />}
          {tab === 'all' && <OrderTable />}
        </Paper>
      </Container>
    </Box>
  );
};

export default ViewOrders;
