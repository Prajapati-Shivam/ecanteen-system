import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import adminImg from '../assets/user-form-admin.svg';
import userImg from '../assets/user-form-user.svg';

function UserForm() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [inputValue, setInputValue] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const randomId = Math.floor(Math.random() * 10000);

  useEffect(() => {
    if (user && isSignedIn) {
      (async () => {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/check`,
            {
              UserName: user.fullName,
              UserEmail: user.primaryEmailAddress.emailAddress,
              College_id: randomId,
            }
          );

          if (data.exists) {
            setSnackbar('Email Already Exists', 'error');
            navigate('/dashboard');
          } else if (data.success === false) {
            setSnackbar('Server Down! Try after some time', 'error');
            navigate('/');
          }
        } catch (error) {
          console.error('Check error:', error);
        }
      })();
    }
  }, [user, isSignedIn]);

  const setSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role === 'admin') {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/addAdmin`,
          {
            userId: user.id,
            Collegename: inputValue,
            UserName: user.fullName,
            UserEmail: user.primaryEmailAddress.emailAddress,
            College_id: randomId,
          }
        );

        if (data.success) {
          setSnackbar('🎉 Admin Registered Successfully!', 'success');
          navigate('/dashboard');
        } else {
          setSnackbar('⚠️ ' + data.message, 'error');
        }
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/addUser`,
          {
            userId: user.id,
            UserName: user.fullName,
            UserEmail: user.primaryEmailAddress.emailAddress,
            College_id: inputValue,
          }
        );

        if (!data.college_id_exists) {
          setSnackbar('College ID does not exist', 'error');
        } else if (data.success) {
          setSnackbar('✅ Student Registered Successfully!', 'success');
          navigate('/student');
        } else {
          setSnackbar('⚠️ ' + data.message, 'error');
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSnackbar('❌ Server Error! Try again later.', 'error');
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='80vh'
      px={2}
    >
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant='h5' gutterBottom textAlign='center'>
          Complete Your Registration
        </Typography>

        <img
          src={role == 'admin' ? adminImg : userImg}
          alt='User Form'
          className='width-[70%] h-auto mb-4 mx-auto max-w-full max-h-[300px] object-contain'
        />

        <FormControl component='fieldset' fullWidth sx={{ mb: 2 }}>
          <FormLabel>Select Role</FormLabel>
          <RadioGroup
            row
            defaultValue={'student'}
            onChange={(e) => {
              setRole(e.target.value);
              setInputValue('');
            }}
          >
            <FormControlLabel value='admin' control={<Radio />} label='Admin' />
            <FormControlLabel
              value='student'
              control={<Radio />}
              label='Student'
            />
          </RadioGroup>
        </FormControl>

        {role && (
          <form onSubmit={handleSubmit}>
            <TextField
              label={role === 'admin' ? 'College Name' : 'College ID'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Submit
            </Button>
          </form>
        )}
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserForm;
