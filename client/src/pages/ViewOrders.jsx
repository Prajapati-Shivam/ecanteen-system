import React from 'react';
import OrderTable from '../components/Food/OrderTable';
import { Box, Container, Typography } from '@mui/material';

const ViewOrders = () => {
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
      <Container maxWidth='lg'>
        <Typography
          variant='h3'
          align='center'
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3rem' },
            background: 'linear-gradient(to right, #22c55e, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Order Panel
        </Typography>

        <OrderTable />
      </Container>
    </Box>
  );
};

export default ViewOrders;
