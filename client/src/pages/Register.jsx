import { useState } from "react";
import { SignIn, useSignIn } from "@clerk/clerk-react";
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
  const [form, setForm] = useState({
    name: "",
    email: "",
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
            backgroundColor: "rgba(255, 255, 255)",
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
            <Button
              onClick={() => {
                if (form.name.trim() === "") {
                  alert("Kindly Enter your college name");
                } else {
                  localStorage.setItem("collegeName", form.name);
                  navigate("/GoogleSignin");
                }
              }}
            >
              Google Sign In
            </Button>
            {/* add clerk signin button here */}
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
