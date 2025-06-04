import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API to create a new college
    console.log("Registering college with:", form);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            College Registration
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="College Name"
              name="name"
              required
              fullWidth
              margin="normal"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              required
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              required
              fullWidth
              margin="normal"
              value={form.phone}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              required
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" align="center" mt={3}>
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Log in here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
