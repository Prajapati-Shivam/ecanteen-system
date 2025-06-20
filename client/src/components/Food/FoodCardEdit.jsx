import {
  Card,
  CardContent,
  CardMedia,
  TextField,
  MenuItem,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useMemo, useState } from 'react';
import placeholderImg from '../../assets/placeholder-food.jpg';

const FoodCardEdit = ({ food, onUpdate, onDelete }) => {
  const url = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3001';
  const [editableFood, setEditableFood] = useState({ ...food });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'error', 'info', 'warning'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableFood((prev) => ({
      ...prev,
      [name]:
        name === 'veg'
          ? value === 'true'
          : name === 'price'
          ? parseFloat(value)
          : value,
    }));
  };

  const isModified = useMemo(() => {
    return JSON.stringify(editableFood) !== JSON.stringify(food);
  }, [editableFood, food]);

  const handleSave = async () => {
    try {
      const updatedFood = {
        ...editableFood,
        item_id: food._id || food.id,
        availability: editableFood.availability ?? true,
      };

      const { data } = await axios.put(
        `${url}/api/admin/updateItem`,
        updatedFood
      );
      console.log('Update response:', data.item);
      if (onUpdate && data.item) onUpdate(data.item);

      showSnackbar('Food item updated successfully!', 'success');
      setEditableFood(updatedFood);
    } catch (error) {
      console.error('Error updating food item:', error);
      showSnackbar('Failed to update food item. Please try again.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this food item?')) {
      return;
    }
    try {
      const { data } = await axios.delete(`${url}/api/admin/deleteItem`, {
        params: { item_id: food._id || food.id }, // ✅ FIX: must go in params
      });
      if (data.message === 'Item deleted successfully') {
        if (onDelete) onDelete(food._id || food.id);
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      showSnackbar('Failed to delete food item. Please try again.', 'error');
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {editableFood.image && (
        <CardMedia
          component='img'
          image={editableFood.image || placeholderImg}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImg;
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
          size='small'
          value={editableFood.name}
          onChange={handleChange}
          fullWidth
          margin='dense'
        />
        <TextField
          label='Price'
          name='price'
          size='small'
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
          size='small'
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
            disabled={!isModified}
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            fontSize: '1rem',
            width: '100%',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '4px',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default FoodCardEdit;
