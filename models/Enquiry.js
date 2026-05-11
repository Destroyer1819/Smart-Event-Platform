// ============================================================
// ENQUIRY MODEL — Member 4 (Database Engineer)
// ============================================================
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    subject: { 
        type: String, 
        required: [true, 'Subject is required'],
        trim: true 
    },
    message: { 
        type: String, 
        required: [true, 'Message body is required'] 
    },
    status: { 
        type: String, 
        enum: ['pending', 'resolved'], 
        default: 'pending',
        lowercase: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
