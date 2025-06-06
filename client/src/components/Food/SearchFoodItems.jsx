import { TextField, Grid, Typography, Card, CardContent } from '@mui/material';

const SearchFoodItems = ({ search, setSearch, foodItems }) => {
  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TextField
        label='Search by Food Name'
        fullWidth
        margin='normal'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {filteredItems.length === 0 ? (
          <Typography variant='body1' sx={{ p: 2 }}>
            No matching food items found.
          </Typography>
        ) : (
          filteredItems.map((item) => (
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
    </>
  );
};

export default SearchFoodItems;
