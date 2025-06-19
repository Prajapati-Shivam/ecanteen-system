import { useAuth, useUser } from '@clerk/clerk-react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Container,
  Paper,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';

function Dashboard() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [filterType, setFilterType] = useState('weekdays');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL || window.location.origin;

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${url}/api/admin/fetchAllOrder`, {
          withCredentials: true,
        });
        if (data.status === 'success') {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    try {
      const { data } = await axios.delete(`${url}/api/auth/deleteAccount`, { withCredentials: true });
      if (data.status === 'deleted') {
        await signOut();
        showSnackbar('Account deleted successfully!', 'success');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      showSnackbar('Failed to delete account. Please try again.', 'error');
    }
  };

  // ✅ FIXED: Use .local() to handle IST time filtering
  const filteredOrders = orders.filter(order => {
    if (!order.createdAt) return false;

    const date = dayjs(order.createdAt).local(); // convert to IST
    const today = dayjs();

    switch (filterType) {
      case 'weekdays':
        return ![0, 6].includes(date.day());
      case 'weekends':
        return [0, 6].includes(date.day());
      case 'day':
        return date.isSame(today, 'day');
      case 'month':
        return date.isSame(today, 'month');
      case 'year':
        return date.isSame(today, 'year');
      case 'all':
      default:
        return true;
    }
  });

  const ordersToday = orders.filter(order =>
    dayjs(order.createdAt).local().isSame(dayjs(), 'day')
  );

  const itemFrequencyByFilter = {};
  filteredOrders.forEach(order => {
    order.items?.forEach(item => {
      const name = item.name || item.itemName;
      itemFrequencyByFilter[name] = (itemFrequencyByFilter[name] || 0) + 1;
    });
  });

  const getTopItems = (obj, top = 5) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, top)
      .map(([name, count]) => ({ name, count }));

  const filteredChartData = getTopItems(itemFrequencyByFilter);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={60} thickness={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', px: 2, pb: 4 }}>
      <Container maxWidth='lg'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(to right, #22c55e, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dashboard
          </Typography>
          <div className='flex items-center gap-x-6'>
            <Button
              onClick={() => console.log('downloaded')}
              variant="contained"
              className='bg-gradient-to-tr from-green-400 to-blue-500'
              startIcon={<DownloadIcon />}
            >
              Export Orders
            </Button>

            <Typography align='right' fontWeight='bold'>
              Role: {user?.publicMetadata?.role.toUpperCase()}<br />
              College ID: {user?.publicMetadata?.college_id}
            </Typography>

            <DeleteIcon fontSize='medium' className='text-red-400 cursor-pointer' onClick={handleDelete} />
          </div>
        </div>

        <Box className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Paper className='p-6'>
            <Typography variant='h6'>Orders Today</Typography>
            <Typography variant='h4'>{ordersToday.length}</Typography>
          </Paper>

          <Paper className='p-6'>
            <Typography variant='h6'>Total Orders</Typography>
            <Typography variant='h4'>{orders.length}</Typography>
          </Paper>

          <Box sx={{ px: 2, mt: 2 }}>
            <FormControl
              fullWidth
              variant="outlined"
              sx={{
                mt: 1,
                maxWidth: 300,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#030712',
                  color: 'white',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#555',
                  },
                  '&:hover fieldset': {
                    borderColor: '#22c55e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                  '&.Mui-focused': {
                    color: '#3b82f6',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: '#000000',
                },
              }}
            >
              <InputLabel id="filter-label">Filter By</InputLabel>
              <Select
                labelId="filter-label"
                value={filterType}
                label="Filter By"
                onChange={(e) => setFilterType(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      mt: 1,
                      '& .MuiMenuItem-root': {
                        fontWeight: 500,
                        color: '#000000',
                      },
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                      '& .Mui-selected': {
                        backgroundColor: '#e0e0e0',
                        '&:hover': {
                          backgroundColor: '#d4d4d4',
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="weekdays">Weekdays</MenuItem>
                <MenuItem value="weekends">Weekends</MenuItem>
                <MenuItem value="day">Today</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Paper className='p-6 md:col-span-2'>
            <Typography variant='h6'>
              Top Items ({filterType.charAt(0).toUpperCase() + filterType.slice(1)})
            </Typography>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={filteredChartData}>
                <XAxis dataKey='name' />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey='count' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ fontSize: '1rem', width: '100%', border: '1px solid', borderColor: 'divider', borderRadius: '4px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;
