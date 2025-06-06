const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    college_id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    veg: { type: Boolean, default: true },
    category: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
    availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('Item', ItemSchema);
