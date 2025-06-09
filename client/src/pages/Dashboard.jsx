import { useUser } from '@clerk/clerk-react';
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

function Dashboard() {
    const { user, isSignedIn } = useUser();
  
  // check if the user is admin otherwise redirect to home page

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
      <Container maxWidth='md'>
        <Typography
          variant='h3'
          align='center'
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3.5rem' },
            background: 'linear-gradient(to right, #22c55e, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard
        </Typography>

        <Typography
          variant='h4'
          fontWeight='bold'
          align='center'
          sx={{ mb: 3 }}
        >
          📊 Coming Soon: Analytics Dashboard!<br />
          Role : {user?.publicMetadata?.role}<br />
          College ID : {user?.publicMetadata?.college_id}
        </Typography>
      </Container>
    </Box>
  );
}

export default Dashboard;
