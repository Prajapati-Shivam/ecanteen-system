import {
  TextField,
  MenuItem,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";

const AddFoodForm = ({ foodForm, setFoodForm, handleAddFood }) => {
  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setFoodForm({
      ...foodForm,
      [name]: name === "veg" ? value === "true" : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoodForm({ ...foodForm, image: file }); // ✅ Set File object
  };

  return (
    <Box>
      <TextField
        label="College ID"
        name="college_id"
        fullWidth
        margin="normal"
        value={foodForm.college_id}
        onChange={handleFoodChange}
      />
      <TextField
        label="Food Name"
        name="name"
        fullWidth
        margin="normal"
        value={foodForm.name}
        onChange={handleFoodChange}
      />

      {/* ✅ Use normal input for file */}
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Upload Image
        </Typography>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </Box>

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
          <FormControlLabel value="true" control={<Radio />} label="Veg" />
          <FormControlLabel value="false" control={<Radio />} label="Non-Veg" />
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
  );
};

export default AddFoodForm;
