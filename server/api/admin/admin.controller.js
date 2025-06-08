const { Item } = require("../../models");
// college_id: { type: String, required: true },
// name: { type: String, required: true },
// image: { type: String },
// price: { type: Number, required: true },
// veg: { type: Boolean, default: true },
// category: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
// availability: { type: Boolean, default: true }

const addItem = async (req, res) => {
  //Body - { college_id, name, price, category, image, type }
  const { college_id, name, price, category, image, type } = req.body;

  if (!name || !price || !category || !image || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newItem = new Item({
    college_id: college_id,
    name: name,
    image: image,
    price: price,
    veg: type.toLowerCase() === "true",
    category: category,
    availability: true, // Default to true, can be updated later
  });
  await newItem.save().catch((err) => {
    console.error("Error adding item:", err);
    return res
      .status(500)
      .json({ message: "Error adding item", error: err.message });
  });
  // Logic to add an item
  console.log(`Item added successfully - ${name} for college ${college_id}`);

  res.status(200).json({ message: "Item added successfully" });
};

const fetchItems = async (req, res) => {
  const { college_id } = req.query || 123; //Mandatory field (Default to fetch all items)
  const {
    filter_name,
    filter_category,
    filter_type,
    filter_price,
    filter_availability,
    filter_sort,
  } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // default to 10 items per page

  if (!college_id) {
    return res.status(400).json({ message: "CollegeID is required" });
  }

  const filter = { college_id };

  if (filter_name) filter.name = { $regex: filter_name, $options: "i" }; //'i' to match lowercase and uppercase
  if (filter_category) filter.category = filter_category;
  if (filter_type) filter.veg = filter_type.toLowerCase() === "true";
  if (filter_availability)
    filter.availability = filter_availability.toLowerCase() === "true";
  if (filter_price) {
    const [minPrice, maxPrice] = filter_price.split("-").map(Number);
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
      case "price_asc":
        sort.price = 1; // Ascending - Price
        break;
      case "price_desc":
        sort.price = -1; // Descending - Price
        break;
      case "name_asc":
        sort.name = 1; // Ascending - Name
        break;
      case "name_desc":
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
    console.error("Error fetching items:", err);
    res
      .status(500)
      .json({ message: "Error fetching items", error: err.message });
  }
};

const deleteItem = async (req, res) => {
  const { item_id } = req.query;

  if (!item_id) {
    return res.status(400).json({ message: "Item ID is required" });
  }

  try {
    const deletedItem = await Item.findByIdAndDelete(item_id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting item:", err);
    return res
      .status(500)
      .json({ message: "Error deleting item", error: err.message });
  }
};

const updateItem = async (req, res) => {
  const { item_id, name, price, category, image, type, availability } =
    req.body;

  if (!item_id) {
    return res.status(400).json({ message: "Item ID is required" });
  }

  if (!name || !price || !category || !image || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updatedData = {
    name: name,
    price: price,
    category: category,
    image: image,
    veg: type.toLowerCase() === "true",
    availability: availability,
  };
  try {
    const updatedItem = await Item.findByIdAndUpdate(item_id, updatedData);
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item updated successfully" });
  } catch (err) {
    console.error("Error updating item:", err);
    return res
      .status(500)
      .json({ message: "Error updating item", error: err.message });
  }
};

module.exports = {
  addItem,
  fetchItems,
  deleteItem,
  updateItem,
};
