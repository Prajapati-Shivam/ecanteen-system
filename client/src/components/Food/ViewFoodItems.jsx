import { Grid, Typography, TextField, Box } from '@mui/material';
import FoodCardEdit from './FoodCardEdit';

const ViewFoodItems = ({ foodItems, setFoodItems, search, setSearch }) => {
  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (updatedItem) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        (item._id || item.id) === (updatedItem._id || updatedItem.id)
          ? updatedItem
          : item
      )
    );
  };

  const handleDelete = (deletedId) => {
    setFoodItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.id) !== deletedId)
    );
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      <TextField
        label='Search by Food Name'
        fullWidth
        variant='outlined'
        margin='normal'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {foodItems.length === 0 ? (
        <Typography variant='body1' sx={{ mt: 4, textAlign: 'center' }}>
          No food items available.
        </Typography>
      ) : filteredItems.length === 0 ? (
        <Typography variant='body1' sx={{ mt: 4, textAlign: 'center' }}>
          No matching food found.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {filteredItems.map((item) => (
            <Grid size={{ sm: 6, md: 4 }} key={item._id || item.id}>
              <FoodCardEdit
                food={item}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ViewFoodItems;
