// React and MUI hooks/components
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
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // State to hold form data (currently only college name and email)
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  // Handle text field changes (update form state)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Simple validation: check if college name is empty
    if (form.name.trim() === "") {
      alert("Kindly enter your college name");
      return;
    }

    // Save college name locally for future use (e.g. sending to backend)
    localStorage.setItem("collegeName", form.name);

    // Navigate to Google SignIn page (Clerk will handle the rest)
    navigate("/GoogleSignin");
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
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
            backgroundColor: "rgba(255, 255, 255)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            College Registration
          </Typography>

          {/* Form for collecting college name */}
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

            {/* Redirects to Clerk Google SignIn via /GoogleSignin */}
            <Button onClick={handleRegister}>Google Sign In</Button>

            {/* You can place Clerk SignIn button here if needed */}
          </form>

          {/* Navigation for existing users */}
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
