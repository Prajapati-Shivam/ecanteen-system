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
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddFoodForm = ({ foodForm, setFoodForm, handleAddFood, isSubmitting }) => {
  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setFoodForm({
      ...foodForm,
      [name]: name === 'veg' ? value === 'true' : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoodForm({ ...foodForm, image: file }); // ✅ Set File object
  };

  return (
    <Box sx={{ position: 'relative', opacity: isSubmitting ? 0.4 : 1, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
      <TextField
        label='Food Name'
        name='name'
        fullWidth
        margin='normal'
        value={foodForm.name}
        onChange={handleFoodChange}
      />

      <TextField
        label='Price'
        name='price'
        type='number'
        fullWidth
        margin='normal'
        inputProps={{ min: 1 }}
        value={foodForm.price}
        onChange={handleFoodChange}
      />
      <TextField
        select
        label='Select Category'
        name='category'
        fullWidth
        margin='normal'
        value={foodForm.category}
        onChange={handleFoodChange}
      >
        <MenuItem value=''>
          <em>-- Select Category --</em>
        </MenuItem>
        <MenuItem value='breakfast'>Breakfast</MenuItem>
        <MenuItem value='lunch'>Lunch</MenuItem>
        <MenuItem value='dinner'>Dinner</MenuItem>
      </TextField>

      <Box
        sx={{ mt: 2 }}
        className='flex gap-4 flex-col md:flex-row items-center'
      >
        <div>
          <FormLabel component='legend' defaultValue={'veg'}>
            Type
          </FormLabel>
          <RadioGroup
            row
            name='veg'
            value={String(foodForm.veg)}
            onChange={handleFoodChange}
          >
            <FormControlLabel value='true' control={<Radio />} label='Veg' />
            <FormControlLabel
              value='false'
              control={<Radio />}
              label='Non-Veg'
            />
          </RadioGroup>
        </div>
        <div>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type='file'
              onChange={handleFileChange}
              accept='image/*'
            />
          </Button>
        </div>
      </Box>

      {foodForm.image && (
        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle2'>Preview:</Typography>
          <img
            src={URL.createObjectURL(foodForm.image)}
            alt='Preview'
            style={{ width: '100px', borderRadius: 8, marginTop: 8 }}
          />
        </Box>
      )}

      {/* Uncomment this code if above code doesnt work for file upload */}
      {/* <Box sx={{ my: 2 }}>
        <Typography variant='subtitle1' sx={{ mb: 1 }}>
          Upload Image
        </Typography>
        <input type='file' accept='image/*' onChange={handleFileChange} />
      </Box> */}

      <Button
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleAddFood}
      >
        Add Food Item
      </Button>
      {isSubmitting && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(255,255,255,0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default AddFoodForm;
