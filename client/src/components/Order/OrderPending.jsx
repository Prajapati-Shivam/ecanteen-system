import * as React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

function OrderRow({ order, onStatusUpdate }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(order.orderStatus);
  const [loading, setLoading] = React.useState(false);
  const url = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3001';
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      await axios.post(
        `${url}/api/admin/updateOrderStatus`,
        {
          id: order._id,
          orderStatus: newStatus,
        }
      );
      onStatusUpdate(order._id, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order._id}</TableCell>
        <TableCell>{order.totalAmount}</TableCell>
        <TableCell>
          {new Date(order.orderTime).toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Select
              size='small'
              value={status}
              onChange={handleStatusChange}
              disabled={loading}
              sx={{
                fontWeight: 'bold',
                color: status === 'completed' ? 'green' : 'orange',
              }}
            >
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
            </Select>
            {loading && <CircularProgress size={16} />}
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 2, marginLeft: 10 }}>
              {/* <Typography variant='subtitle1' gutterBottom>
                Order Items
              </Typography> */}
              <Table size='small' aria-label='items'>
                <TableHead>
                  <TableRow>
                    <TableCell>Food Item</TableCell>
                    <TableCell>Price (₹)</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function OrderPending() {
  const [orders, setOrders] = React.useState([]);
  const { user } = useUser();
  const url = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3001';
  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await axios.post(`${url}/api/admin/fetchActiveOrder`, 
          { userId: user.id }
        );

        // sort orders by order time in descending order
        const sortedOrders = [...response.data.orders].sort(
          (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  const handleStatusUpdate = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id
          ? {
              ...order,
              items: order.items.map((item) => ({
                ...item,
                status: newStatus,
              })),
            }
          : order
      )
    );
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6' gutterBottom>
        Order Summary
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Total Amount (₹)</TableCell>
              <TableCell>Order Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  <Typography variant='body1' color='text.secondary'>
                    No active orders found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
