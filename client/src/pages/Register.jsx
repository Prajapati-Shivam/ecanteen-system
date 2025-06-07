import { useState } from 'react';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  // State to hold form data (currently only college name and email)
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  // Handle text field changes (update form state)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API to create a new college
    console.log('Registering college with:', form);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255)',
          }}
        >
          <Typography variant='h5' align='center' gutterBottom>
            College Registration
          </Typography>

          {/* Form for collecting college name */}
          <form onSubmit={handleRegister}>
            <TextField
              label='College Name'
              name='name'
              required
              fullWidth
              margin='normal'
              value={form.name}
              onChange={handleChange}
            />
            <Button
              onClick={() => {
                if (form.name.trim() === '') {
                  alert('Kindly enter your college name');
                  return;
                }

                localStorage.setItem('collegeName', form.name);

                navigate('/GoogleSignin');
              }}
            >
              Google Sign In
            </Button>

            {/* You can place Clerk SignIn button here if needed */}
          </form>
          <Typography variant='body2' align='center' mt={3}>
            Already have an account?{' '}
            <Link href='/login' underline='hover'>
              Log in here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
