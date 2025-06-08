import { TextField, Grid, Typography, Card, CardMedia, CardContent, Chip, Stack } from '@mui/material';
import {
  KebabDining as KebabDiningIcon,
  LunchDining as LunchDiningIcon,
  FreeBreakfast as FreeBreakfastIcon,
  RamenDining as RamenDiningIcon,
  DinnerDining as DinnerDiningIcon
} from '@mui/icons-material';
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
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id} 
              sx={{
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 10
                }
              }} 
            >
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`${item.image}`}
                  title="green iguana"
                />
                <CardContent>
                  <Typography variant='h6'>{item.name}</Typography>
                  <Typography color='text.secondary'>
                    Price: ₹{item.price}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      variant="outlined"
                      color="success"
                      icon={
                        item.category.toLowerCase() === 'breakfast' ? <FreeBreakfastIcon /> :
                          item.category.toLowerCase() === 'lunch' ? <LunchDiningIcon /> :
                            <DinnerDiningIcon />
                      }
                      label={`${item.category}`}
                    />
                    <Chip
                      // variant="outlined" 
                      // size="small"
                      color={item.veg ? 'success' : 'error'}
                      icon={item.veg ? <LunchDiningIcon /> : <KebabDiningIcon />}
                      label={item.veg ? 'Veg' : 'Non-Veg'}
                    />
                  </Stack>
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
