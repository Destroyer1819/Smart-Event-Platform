// ============================================================
// EVENT MODEL — Member 4 (Database Engineer)
// ============================================================
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { 
        type: String, 
        required: [true, 'Event title is required'],
        trim: true 
    },

    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },

    date: { 
        type: Date, 
        required: [true, 'Event date is required'] 
    },

    category: { 
        type: String, 
        required: [true, 'Category is required'],
        enum: ['Music', 'Workshop', 'Conference', 'Sport', 'Other'] // Ensures clean data
    },

    location: { 
        type: String, 
        required: [true, 'Location is required'] 
    },

    totalCapacity: { 
        type: Number, 
        required: [true, 'Total capacity is required'],
        min: [1, 'Capacity must be at least 1']
    },

    availableCapacity: { 
        type: Number, 
        required: true,
        min: [0, 'Available capacity cannot be negative'] 
    },

    price: { 
        type: Number, 
        required: [true, 'Ticket price is required'],
        min: [0, 'Price cannot be negative']
    },

    imageUrl: { 
        type: String, 
        default: '#cccccc' // Placeholder image URL
    }
}, { timestamps: true });

eventSchema.pre('save', function(next) {
    if (this.isNew && this.availableCapacity === undefined) {
        this.availableCapacity = this.totalCapacity;
    }
    next();
});

module.exports = mongoose.model('Event', eventSchema);
