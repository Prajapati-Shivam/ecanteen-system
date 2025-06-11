import { Grid, Typography } from '@mui/material';
import FoodCardEdit from './FoodCardEdit';

const ViewFoodItems = ({ foodItems }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {foodItems.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant='body1' sx={{ p: 2 }}>
            No food items available.
          </Typography>
        </Grid>
      ) : (
        foodItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <FoodCardEdit
              food={item}
              onUpdate={(updatedItem) => console.log('Update:', updatedItem)}
              onDelete={(id) => console.log('Delete item with ID:', id)}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ViewFoodItems;
