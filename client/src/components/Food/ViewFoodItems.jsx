import { Grid, Typography, Card, CardContent } from '@mui/material';

const ViewFoodItems = ({ foodItems }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {foodItems.length === 0 ? (
        <Typography variant='body1' sx={{ p: 2 }}>
          No food items available.
        </Typography>
      ) : (
        foodItems.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography color='text.secondary'>
                  Price: ₹{item.price}
                </Typography>
                <Typography color='text.secondary'>
                  Category: {item.category}
                </Typography>
                <Typography color='text.secondary'>
                  Type: {item.veg ? 'Veg' : 'Non-Veg'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ViewFoodItems;
