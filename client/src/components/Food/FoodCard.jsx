 import {
  TextField,
  Typography,
  Button,
  Box,
  Chip,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  FreeBreakfast as FreeBreakfastIcon,
  LunchDining as LunchDiningIcon,
  DinnerDining as DinnerDiningIcon,
  Restaurant as RestaurantIcon,
  LunchDining as VegIcon,
  KebabDining as NonVegIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import placeholderImg from '../../assets/placeholder-food.jpg';

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'breakfast':
      return <FreeBreakfastIcon fontSize='small' sx={{ color: '#facc15' }} />;
    case 'lunch':
      return <LunchDiningIcon fontSize='small' sx={{ color: '#22c55e' }} />;
    case 'dinner':
      return <DinnerDiningIcon fontSize='small' sx={{ color: '#ef4444' }} />;
    default:
      return <RestaurantIcon fontSize='small' sx={{ color: '#3b82f6' }} />;
  }
};

export default function FoodCard({
  item,
  quantity,
  onQuantityChange,
  onAddToCart,
}) {
  const isAvailable = item.availability;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardMedia
        component='img'
        image={item.image || placeholderImg}
        alt={item.name}
        sx={{
          width: '100%',
          height: { xs: 180, sm: 200 },
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          objectFit: 'cover',
          filter: !isAvailable ? 'grayscale(100%)' : 'none',
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              mb: 0.5,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{
              color: 'text.secondary',
              fontWeight: '600',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mb: 1,
            }}
          >
            ₹{item.price}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={getCategoryIcon(item.category)}
              label={item.category}
              size='small'
              variant='outlined'
              color='primary'
              sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}
            />
            <Chip
              icon={
                item.veg ? (
                  <VegIcon fontSize='small' />
                ) : (
                  <NonVegIcon fontSize='small' />
                )
              }
              label={item.veg ? 'Veg' : 'Non-Veg'}
              size='small'
              variant='outlined'
              color={item.veg ? 'success' : 'error'}
              sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'nowrap',
          }}
        >
          <TextField
            label='Qty'
            type='number'
            size='small'
            inputProps={{
              min: 1,
              max: 99,
              style: { textAlign: 'center', fontSize: '0.9rem' },
            }}
            sx={{ width: 80 }}
            value={quantity}
            onChange={(e) => onQuantityChange(item._id, e.target.value)}
            disabled={!isAvailable}
          />

          {isAvailable ? (
            <Button
              variant='contained'
              size='medium'
              onClick={() => onAddToCart(item)}
              sx={{
                backgroundColor: 'success.main',
                flexGrow: 1,
                fontWeight: '700',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&:hover': {
                  backgroundColor: 'success.dark',
                },
              }}
              startIcon={<ShoppingCartIcon />}
            >
              Add to Cart
            </Button>
          ) : (
            <Typography
              sx={{
                color: '#ef4444',
                fontWeight: 'bold',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                flexGrow: 1,
                textAlign: 'center',
              }}
            >
              Out of Stock
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
