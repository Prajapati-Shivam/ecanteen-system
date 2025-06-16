import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  TaskAlt as CompletedIcon,
  HourglassBottom as ActiveIcon,
  DinnerDining as DinnerIcon,
  LunchDining as LunchIcon,
  FreeBreakfast as BreakfastIcon,
  Restaurant as DefaultCategoryIcon,
  KebabDining as NonVegIcon,
  LunchDining as VegIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

export default function Orders() {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { user } = useUser();
  const url = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3001';
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const email = user.primaryEmailAddress?.emailAddress;
        const { data } = await axios.post(
          `${url}/api/auth/displayOrder`,
          { gmailAccount: email },
          { withCredentials: true }
        );

        const grouped = {};
        (data.orders || []).forEach((order) => {
          const status = order.orderStatus || 'active';
          const dt = new Date(order.orderTime || Date.now());
          const date = dt.toISOString().split('T')[0];
          const time = dt.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          });
          const total = order.items.reduce(
            (s, i) => s + i.price * i.quantity,
            0
          );

          grouped[status] = grouped[status] || [];
          grouped[status].push({
            orderId: order._id,
            date,
            time,
            total,
            items: order.items.map((i) => ({
              id: i._id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
              category: i.category || 'lunch',
              veg: i.veg ?? true,
            })),
          });
        });

        setGroupedOrders(grouped);
        setSnackbar({
          open: true,
          message: 'Orders loaded!',
          severity: 'success',
        });
      } catch (err) {
        console.error(err);
        setSnackbar({
          open: true,
          message: 'Failed to load orders.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const catIcon = (cat = '') => {
    switch (cat.toLowerCase()) {
      case 'breakfast':
        return <BreakfastIcon fontSize='small' sx={{ color: '#f59e0b' }} />;
      case 'lunch':
        return <LunchIcon fontSize='small' sx={{ color: '#22c55e' }} />;
      case 'dinner':
        return <DinnerIcon fontSize='small' sx={{ color: '#ef4444' }} />;
      default:
        return (
          <DefaultCategoryIcon fontSize='small' sx={{ color: '#3b82f6' }} />
        );
    }
  };

  const statusKey = tab === 0 ? 'active' : 'completed';
  const orders = groupedOrders[statusKey] || [];

  return (
    <div className='max-w-5xl mx-auto min-h-screen px-2 sm:px-4 py-6'>
      <Typography
        variant='h4'
        align='center'
        sx={{
          fontWeight: 700,
          mb: 4,
          background: 'linear-gradient(45deg,#22c55e,#3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Your Orders
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor='white'
          indicatorColor='primary'
          variant='fullWidth'
        >
          <Tab
            icon={<ActiveIcon />}
            iconPosition='start'
            label='Active Orders'
            sx={{ fontWeight: 600, color: 'whitesmoke' }}
          />
          <Tab
            icon={<CompletedIcon />}
            iconPosition='start'
            label='Completed Orders'
            sx={{ fontWeight: 600, color: 'whitesmoke' }}
          />
        </Tabs>
      </Box>

      {loading ? (
        <Box className='flex justify-center items-center h-40'>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography align='center' className='text-gray-50'>
          No {statusKey} orders found.
        </Typography>
      ) : (
        <Box>
          {orders.map((group) => (
            <Accordion
              key={group.orderId}
              disableGutters
              sx={{
                mb: 2,
                borderRadius: 2,
                backgroundColor: '#f3f4f6',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                  Order ID: {group.orderId.slice(-6)}
                </Typography>
                <Chip
                  size='small'
                  clickable={false}
                  label={statusKey.toUpperCase()}
                  color={statusKey === 'completed' ? 'success' : 'warning'}
                  icon={
                    statusKey === 'completed' ? (
                      <CompletedIcon fontSize='small' />
                    ) : (
                      <ActiveIcon fontSize='small' />
                    )
                  }
                />
              </AccordionSummary>
              <AccordionDetails>
                {group.items.map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: 2,
                      backgroundColor: '#ffffff',
                      '&:hover': { boxShadow: 4 },
                    }}
                  >
                    <CardContent>
                      <Typography variant='h6' sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', mb: 1 }}
                      >
                        ₹{item.price} × {item.quantity} = ₹
                        {item.price * item.quantity}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={catIcon(item.category)}
                          label={item.category}
                          size='small'
                          variant='outlined'
                          color='primary'
                          clickable={false}
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
                          variant='outlined'
                          color={item.veg ? 'success' : 'error'}
                          clickable={false}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                <Divider sx={{ my: 1 }} />
                <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
                  Total Price: ₹{group.total}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Ordered on: {group.date} at {group.time}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ fontSize: '1rem', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
