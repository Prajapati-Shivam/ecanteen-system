import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

// Import your existing pages
import Browse from "./Browse";
import Cart from "./Cart";
import Orders from "./Orders";

const Student = () => {
  const { user } = useUser();
  const [tab, setTab] = useState("browse");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      maxWidth="lg"
      className="min-h-screen md:px-2 pb-4 flex flex-col mx-auto"
    
    >
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4">
        <div>
          <Typography variant="h4" className="text-white font-bold mb-2">
           Welcome, {user?.fullName || "Guest"} 
          </Typography>
          <Typography variant="body1" className="text-white">
            Role: {user?.publicMetadata?.role || "N/A"} | College ID:{" "}
            {user?.publicMetadata?.college_id || "N/A"}
          </Typography>
        </div>

        <Tabs
          value={tab}
          className="p-2 m-2"
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="inherit"
          sx={{ "& .MuiTab-root": { color: "white" } }}
        >
          <Tab label="Browse" value="browse" />
          <Tab label="Cart" value="cart" />
          <Tab label="Orders" value="orders" />
        </Tabs>
      </div>

      {/* Main Content */}
      <Container maxWidth="lg" >
        <Paper elevation={6} sx={{ borderRadius: 3, backgroundColor: "transparent" }} className="p-4">
          {tab === "browse" && <Browse />}
          
          {tab === "cart" && <Cart />}
          {tab === "orders" && <Orders />}
        </Paper>
      </Container>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            fontSize: "1rem",
            width: "100%",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "4px",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Student;
