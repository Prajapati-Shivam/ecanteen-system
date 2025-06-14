// import React, { useState, useEffect } from 'react';
// import {
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import {
//   TaskAlt as CompletedIcon,
//   HourglassBottom as ActiveIcon,
//   DinnerDining as DinnerIcon,
//   LunchDining as LunchIcon,
//   FreeBreakfast as BreakfastIcon,
//   Restaurant as DefaultCategoryIcon,
//   KebabDining as NonVegIcon,
//   LunchDining as VegIcon,
// } from '@mui/icons-material';

// const dummyOrders = [
//   {
//     id: 'order1',
//     name: 'Masala Dosa',
//     price: 80,
//     quantity: 2,
//     status: 'active',
//     category: 'breakfast',
//     veg: true,
//     date: '2025-06-09',
//   },
//   {
//     id: 'order2',
//     name: 'Butter Chicken',
//     price: 250,
//     quantity: 1,
//     status: 'completed',
//     category: 'dinner',
//     veg: false,
//     date: '2025-06-07',
//   },
//   {
//     id: 'order3',
//     name: 'Paneer Tikka',
//     price: 180,
//     quantity: 3,
//     status: 'active',
//     category: 'lunch',
//     veg: true,
//     date: '2025-06-08',
//   },
// ];

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [tab, setTab] = useState(0);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   useEffect(() => {
//     // Simulate fetching orders from backend/localStorage
//     setOrders(dummyOrders);
//     setSnackbar({
//       open: true,
//       message: 'Orders loaded successfully!',
//       severity: 'success',
//     });
//   }, []);

//   const getCategoryIcon = (category) => {
//     switch (category.toLowerCase()) {
//       case 'breakfast':
//         return <BreakfastIcon fontSize="small" sx={{ color: '#f59e0b' }} />;
//       case 'lunch':
//         return <LunchIcon fontSize="small" sx={{ color: '#22c55e' }} />;
//       case 'dinner':
//         return <DinnerIcon fontSize="small" sx={{ color: '#ef4444' }} />;
//       default:
//         return <DefaultCategoryIcon fontSize="small" sx={{ color: '#3b82f6' }} />;
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   const filteredOrders = orders.filter(
//     (order) => order.status === (tab === 0 ? 'active' : 'completed')
//   );

//   return (
//     <div className="max-w-5xl mx-auto  min-h-screen">
//      <Typography
//         variant="h4"
//         align="center"
//         sx={{
//           fontWeight: '700',
//           mb: 4,
//           background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//           fontSize: { xs: '1.8rem', sm: '2.5rem' },
//         }}
//       >
//         Your Orders
//       </Typography>

//       <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
//         <Tabs
//           value={tab}
//           onChange={handleTabChange}
//           textColor="white"
//           indicatorColor="primary"
//           variant="fullWidth"
//         >
//           <Tab
//             icon={<ActiveIcon />}
//             iconPosition="start"
//             label="Active Orders"
//             sx={{ fontWeight: '600',color:'whitesmoke' }}
//           />
//           <Tab
//             icon={<CompletedIcon />}
//             iconPosition="start"
//             label="Completed Orders"
//             sx={{ fontWeight: '600' ,color:'whitesmoke' }}
//           />
//         </Tabs>
//       </Box>

//       {filteredOrders.length === 0 ? (
//         <Typography align="center" color="text.secondary">
//           No {tab === 0 ? 'active' : 'completed'} orders found.
//         </Typography>
//       ) : (
//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
//             gap: 3,
//           }}
//         >
//           {filteredOrders.map((order) => (
//             <Card
//               key={order.id}
//               sx={{
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 p: 1,
//                 '&:hover': { boxShadow: 6 },
//               }}
//             >
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.5 }}
//                 >
//                   {order.name}
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   sx={{ color: 'text.secondary', mb: 1 }}
//                 >
//                   ₹{order.price} × {order.quantity} = ₹{order.price * order.quantity}
//                 </Typography>

//                 <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
//                   <Chip
//                     icon={getCategoryIcon(order.category)}
//                     label={order.category}
//                     size="small"
//                     variant="outlined"
//                     color="primary"
//                   />
//                   <Chip
//                     icon={
//                       order.veg ? (
//                         <VegIcon fontSize="small" />
//                       ) : (
//                         <NonVegIcon fontSize="small" />
//                       )
//                     }
//                     label={order.veg ? 'Veg' : 'Non-Veg'}
//                     size="small"
//                     variant="outlined"
//                     color={order.veg ? 'success' : 'error'}
//                   />
//                   <Chip
//                     icon={
//                       order.status === 'completed' ? (
//                         <CompletedIcon fontSize="small" />
//                       ) : (
//                         <ActiveIcon fontSize="small" />
//                       )
//                     }
//                     label={order.status.toUpperCase()}
//                     size="small"
//                     variant="filled"
//                     color={order.status === 'completed' ? 'success' : 'warning'}
//                   />
//                 </Box>

//                 <Typography variant="caption" color="text.secondary">
//                   Ordered on: {order.date}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           sx={{
//             fontSize: '1rem',
//             width: '100%',
//             borderRadius: '4px',
//             border: '1px solid',
//             borderColor: 'divider',
//           }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }



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
} from '@mui/icons-material';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const { user } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const email = user?.primaryEmailAddress?.emailAddress;
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/displayOrder`,
          { gmailAccount: email },
          { withCredentials: true }
        );

        const fetchedOrders = response.data.orders || [];

        // Transform orders if needed
        const transformedOrders = fetchedOrders.flatMap(order =>
          order.items.map(item => ({
            id: item._id || order._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            status: item.status || 'active',
            category: item.category || 'lunch',
            veg: item.veg !== undefined ? item.veg : true,
            date: order.date || new Date().toISOString().split('T')[0],
          }))
        );

        setOrders(transformedOrders);
        setSnackbar({
          open: true,
          message: 'Orders loaded successfully!',
          severity: 'success',
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load orders. Please try again later.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'breakfast':
        return <BreakfastIcon fontSize="small" sx={{ color: '#f59e0b' }} />;
      case 'lunch':
        return <LunchIcon fontSize="small" sx={{ color: '#22c55e' }} />;
      case 'dinner':
        return <DinnerIcon fontSize="small" sx={{ color: '#ef4444' }} />;
      default:
        return <DefaultCategoryIcon fontSize="small" sx={{ color: '#3b82f6' }} />;
    }
  };

  const filteredOrders = orders.filter(
    (order) => order.status === (tab === 0 ? 'active' : 'completed')
  );

  return (
    <div className="max-w-5xl mx-auto min-h-screen px-2 sm:px-4 py-6">
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
        Your Orders
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="white"
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab
            icon={<ActiveIcon />}
            iconPosition="start"
            label="Active Orders"
            sx={{ fontWeight: '600', color: 'whitesmoke' }}
          />
          <Tab
            icon={<CompletedIcon />}
            iconPosition="start"
            label="Completed Orders"
            sx={{ fontWeight: '600', color: 'whitesmoke' }}
          />
        </Tabs>
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center h-40">
          <CircularProgress />
        </Box>
      ) : filteredOrders.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No {tab === 0 ? 'active' : 'completed'} orders found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
          }}
        >
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 1,
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.5 }}
                >
                  {order.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 1 }}
                >
                  ₹{order.price} × {order.quantity} = ₹
                  {order.price * order.quantity}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={getCategoryIcon(order.category)}
                    label={order.category}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    icon={
                      order.veg ? (
                        <VegIcon fontSize="small" />
                      ) : (
                        <NonVegIcon fontSize="small" />
                      )
                    }
                    label={order.veg ? 'Veg' : 'Non-Veg'}
                    size="small"
                    variant="outlined"
                    color={order.veg ? 'success' : 'error'}
                  />
                  <Chip
                    icon={
                      order.status === 'completed' ? (
                        <CompletedIcon fontSize="small" />
                      ) : (
                        <ActiveIcon fontSize="small" />
                      )
                    }
                    label={order.status.toUpperCase()}
                    size="small"
                    variant="filled"
                    color={order.status === 'completed' ? 'success' : 'warning'}
                  />
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Ordered on: {order.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

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
            borderRadius: '4px',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
