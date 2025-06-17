import { useAuth, useUser } from '@clerk/clerk-react';
import DeleteIcon from '@mui/icons-material/Delete';
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
import axios from 'axios';
import { useState } from 'react';

function Dashboard() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'error', 'info', 'warning'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const url = import.meta.env.VITE_API_URL || window.location.origin;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      const { data } = await axios.delete(`${url}/api/auth/deleteAccount`, {
        withCredentials: true,
      });

      if (data.status === 'deleted') {
        await signOut();
        showSnackbar('Account deleted successfully!', 'success');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      showSnackbar('Failed to delete account. Please try again.', 'error');
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
            <Typography align='right' fontWeight='bold'>
              Role: {user?.publicMetadata?.role.toUpperCase()}
              <br />
              College ID: {user?.publicMetadata?.college_id}
            </Typography>

            <DeleteIcon
              fontSize='medium'
              className='text-red-400 cursor-pointer'
              onClick={handleDelete}
            />
          </div>
        </div>
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

export default Dashboard;
