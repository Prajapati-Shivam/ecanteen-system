const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    college_name: { 
        type: String,
        required: true
    },
    college_id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true 
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
