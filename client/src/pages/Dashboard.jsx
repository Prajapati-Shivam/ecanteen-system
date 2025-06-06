 import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  MenuItem,
} from "@mui/material";

function Dashboard() {
  const [tab, setTab] = useState("create");

  const [foodForm, setFoodForm] = useState({
    college_id: "",
    name: "",
    image: "",
    price: "",
    veg: true,
    category: "",
  });

  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const handleTabChange = (event, newValue) => setTab(newValue);

  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setFoodForm({
      ...foodForm,
      [name]: name === "veg" ? value === "true" : value,
    });
  };

  const handleAddFood = () => {
    const { college_id, name, price, category } = foodForm;
    if (college_id && name && price && category) {
      setFoodItems([...foodItems, { ...foodForm, id: Date.now() }]);
      setFoodForm({
        college_id: "",
        name: "",
        image: "",
        price: "",
        veg: true,
        category: "",
      });
    } else {
      alert("Please fill all required fields!");
    }
  };

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          className="mt-8 font-bold text-4xl md:text-7xl text-gray-800 leading-snug"
          sx={{ mb: 2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-tr from-green-500 to-blue-600">
            Dashboard
          </span>
        </Typography>

        {/* Tabs OUTSIDE the Paper */}
         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
  <Tabs
    value={tab}
    onChange={handleTabChange}
    centered
    indicatorColor="primary"
    textColor="inherit"
    sx={{ "& .MuiTab-root": { color: "white" } }}
  >
    <Tab label="Add Food Item" value="create" />
    <Tab label="View Food Items" value="view" />
    <Tab label="Search Food Items" value="search" />
  </Tabs>
</Box>

        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          {/* Add Food Item Form */}
          {tab === "create" && (
            <Box>
               
              <TextField
                label="Food Name"
                name="name"
                fullWidth
                margin="normal"
                value={foodForm.name}
                onChange={handleFoodChange}
              />

              <TextField
                label="Image URL"
                name="image"
                fullWidth
                margin="normal"
                value={foodForm.image}
                onChange={handleFoodChange}
              />

              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                margin="normal"
                inputProps={{ min: 1 }}
                value={foodForm.price}
                onChange={handleFoodChange}
              />

              <TextField
                select
                label="Select Category"
                name="category"
                fullWidth
                margin="normal"
                value={foodForm.category}
                onChange={handleFoodChange}
              >
                <MenuItem value="">
                  <em>-- Select Category --</em>
                </MenuItem>
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
              </TextField>

              <Box sx={{ mt: 2 }}>
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  row
                  name="veg"
                  value={String(foodForm.veg)}
                  onChange={handleFoodChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Veg"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Non-Veg"
                  />
                </RadioGroup>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleAddFood}
              >
                Add Food Item
              </Button>
            </Box>
          )}

          {/* View Food Items Tab */}
          {tab === "view" && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {foodItems.length === 0 ? (
                <Typography variant="body1" sx={{ p: 2 }}>
                  No food items available.
                </Typography>
              ) : (
                foodItems.map((item) => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography color="text.secondary">
                          Price: ₹{item.price}
                        </Typography>
                        <Typography color="text.secondary">
                          Category: {item.category}
                        </Typography>
                        <Typography color="text.secondary">
                          Type: {item.veg ? "Veg" : "Non-Veg"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}

          {/* Search Food Items Tab */}
          {tab === "search" && (
            <Box>
              <TextField
                label="Search by Food Name"
                fullWidth
                margin="normal"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {filteredItems.length === 0 ? (
                  <Typography variant="body1" sx={{ p: 2 }}>
                    No matching food items found.
                  </Typography>
                ) : (
                  filteredItems.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography color="text.secondary">
                            Price: ₹{item.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Category: {item.category}
                          </Typography>
                          <Typography color="text.secondary">
                            Type: {item.veg ? "Veg" : "Non-Veg"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Dashboard;
