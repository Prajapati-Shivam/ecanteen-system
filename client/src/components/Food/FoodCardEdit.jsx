import {
  Card,
  CardContent,
  CardMedia,
  TextField,
  MenuItem,
  Typography,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import placeholderImg from '../../assets/placeholder-food.jpg';
const FoodCardEdit = ({ food, onUpdate, onDelete }) => {
  const url = import.meta.env.VITE_API_URL;
  const [editableFood, setEditableFood] = useState({ ...food });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableFood((prev) => ({
      ...prev,
      [name]: name === 'veg' ? value === 'true' : value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedFood = {
        ...editableFood,
        item_id: food.id,
      };
      const { data } = await axios.put(
        `${url}/api/admin/updateItem`,
        updatedFood
      );

      if (onUpdate) onUpdate(data.item);
      alert('Food item updated successfully!'); // replace by snackbar
    } catch (error) {
      console.error('Error updating food item:', error);
      alert('Failed to update food item. Please try again.'); // replace by snackbar
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${url}/api/admin/deleteItem`, {
        item_id: food.id,
      });
      if (data.message === 'Item deleted successfully') {
        if (onDelete) onDelete(food.id);
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      alert('Failed to delete food item. Please try again.'); // replace by snackbar
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {editableFood.image && (
        <CardMedia
          component='img'
          image={editableFood.image || placeholderImg}
          onError={(e) => {
            e.target.onerror = null; // prevents looping
            e.target.src = placeholderImg; // fallback image
          }}
          alt={editableFood.name}
          sx={{
            width: '100%',
            height: { xs: 180, sm: 200 },
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            objectFit: 'cover',
          }}
        />
      )}
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          label='Name'
          name='name'
          value={editableFood.name}
          onChange={handleChange}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Price'
          name='price'
          type='number'
          value={editableFood.price}
          onChange={handleChange}
          fullWidth
          margin='dense'
          inputProps={{ min: 1 }}
        />
        <TextField
          select
          label='Category'
          name='category'
          value={editableFood.category}
          onChange={handleChange}
          fullWidth
          margin='dense'
        >
          <MenuItem value='breakfast'>Breakfast</MenuItem>
          <MenuItem value='lunch'>Lunch</MenuItem>
          <MenuItem value='dinner'>Dinner</MenuItem>
        </TextField>

        <RadioGroup
          row
          name='veg'
          value={String(editableFood.veg)}
          onChange={handleChange}
          sx={{ mt: 1 }}
        >
          <FormControlLabel value='true' control={<Radio />} label='Veg' />
          <FormControlLabel value='false' control={<Radio />} label='Non-Veg' />
        </RadioGroup>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            onClick={handleSave}
            variant='contained'
            color='primary'
            fullWidth
          >
            Save
          </Button>
          <Button
            onClick={handleDelete}
            variant='outlined'
            color='error'
            fullWidth
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCardEdit;
