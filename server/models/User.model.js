const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    college_id: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('User', UserSchema);
