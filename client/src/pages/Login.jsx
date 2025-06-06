import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [userType, setUserType] = useState('college'); // 'college' or 'student'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${userType} with:`, form);
  };

  const handleTabChange = (event, newValue) => {
    setUserType(newValue);
    setForm({ email: '', password: '' });
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
          <Tabs
            value={userType}
            onChange={handleTabChange}
            centered
            variant='fullWidth'
            textColor='primary'
            indicatorColor='primary'
            sx={{ mb: 3 }}
          >
            <Tab label='College' value='college' />
            <Tab label='Student' value='student' />
          </Tabs>

          <Typography variant='h5' align='center' gutterBottom>
            {userType === 'college' ? 'College Login' : 'Student Login'}
          </Typography>

          <Button
            variant='contained'
            onClick={() => {
              navigate('/GoogleSignin');
            }}
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Google Signin
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
