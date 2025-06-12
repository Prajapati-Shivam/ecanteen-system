const { Item } = require('../../models');
const cloudinary = require('../../utils/cloudinary');
const streamifier = require('streamifier'); // <== required for buffer upload

const { getAuth } = require('@clerk/express');
const { users } = require('@clerk/clerk-sdk-node');

const addItem = async (req, res) => {
  const { name, price, category, veg } = req.body;

  const { userId } = getAuth(req);
  const user = await users.getUser(userId);
  const college_id = user?.publicMetadata?.college_id;

  if (!name || !price || !category || veg === undefined || !req.file) {
    return res
      .status(400)
      .json({ message: 'All fields including image are required' });
  }

  try {
    // Upload buffer to Cloudinary using upload_stream
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'canteen_items' },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);
    console.log('Cloudinary URL:', result.secure_url);

    const newItem = new Item({
      college_id,
      name,
      image: result.secure_url,
      price,
      veg,
      category,
      availability: true,
    });

    await newItem.save();

    console.log(`Item added successfully - ${name} for college ${college_id}`);
    res
      .status(200)
      .json({ item_id: newItem._id, message: 'Item added successfully' });
  } catch (err) {
    console.error('Error uploading image or adding item:', err);
    res.status(500).json({ message: 'Failed to add item', error: err.message });
  }
};

const fetchItems = async (req, res) => {
  let { college_id } = req.query;

  if (college_id === undefined) {
    const { userId } = getAuth(req);
    const user = await users.getUser(userId);
    college_id = user?.publicMetadata?.college_id;
  }

  const {
    filter_name,
    filter_category,
    filter_veg,
    filter_price,
    filter_availability,
    filter_sort,
  } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1000; // default to 10 items per page

  if (!college_id) {
    return res.status(400).json({ message: 'CollegeID is required' });
  }

  const filter = { college_id };

  if (filter_name) filter.name = { $regex: filter_name, $options: 'i' }; //'i' to match lowercase and uppercase
  if (filter_category) filter.category = filter_category;
  if (filter_veg) filter.veg = filter_veg;
  if (filter_availability)
    filter.availability = filter_availability.toLowerCase() === 'true';
  if (filter_price) {
    const [minPrice, maxPrice] = filter_price.split('-').map(Number);
    if (
      !(
        isNaN(minPrice) ||
        isNaN(maxPrice) ||
        minPrice < 0 ||
        maxPrice < 0 ||
        minPrice > maxPrice
      )
    )
      filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  let sort = {};
  if (filter_sort) {
    switch (filter_sort) {
      case 'price_asc':
        sort.price = 1; // Ascending - Price
        break;
      case 'price_desc':
        sort.price = -1; // Descending - Price
        break;
      case 'name_asc':
        sort.name = 1; // Ascending - Name
        break;
      case 'name_desc':
        sort.name = -1; // Descending - Name
        break;
      default:
        break;
    }
  }
  const skip = (page - 1) * limit; // Items to skip for pagination

  try {
    // Fetch items based on the college_id and filters
    const items = await Item.find(filter, { college_id: 0, __v: 0 })
      .sort(sort)
      .skip(skip)
      .limit(limit);
    if (!items || items.length === 0) {
      return res.status(200).json({ items: [] });
    }
    return res.status(200).json({ items });
  } catch (err) {
    console.error('Error fetching items:', err);
    res
      .status(500)
      .json({ message: 'Error fetching items', error: err.message });
  }
};

const deleteItem = async (req, res) => {
  const { item_id } = req.query;

  if (!item_id) {
    return res.status(400).json({ message: 'Item ID is required' });
  }

  try {
    const deletedItem = await Item.findByIdAndDelete(item_id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    return res
      .status(500)
      .json({ message: 'Error deleting item', error: err.message });
  }
};

const updateItem = async (req, res) => {
  const { item_id, name, price, category, image, veg, availability } = req.body;

  if (!item_id) {
    return res.status(400).json({ message: 'Item ID is required' });
  }

  if (!name || !price || !category || !image || !veg) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const updatedData = {
    name: name,
    price: price,
    category: category,
    image: image,
    veg: veg,
    availability: availability,
  };
  try {
    const updatedItem = await Item.findByIdAndUpdate(item_id, updatedData);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json({
      item: updatedItem,
      message: 'Item updated successfully',
    });
  } catch (err) {
    console.error('Error updating item:', err);
    return res
      .status(500)
      .json({ message: 'Error updating item', error: err.message });
  }
};

module.exports = {
  addItem,
  fetchItems,
  deleteItem,
  updateItem,
};
