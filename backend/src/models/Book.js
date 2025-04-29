const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid ISBN!`
    }
  },
  publishedYear: { 
    type: Number, 
    required: true,
    min: [1000, 'Year must be at least 1000'],
    max: [new Date().getFullYear(), `Year cannot be in the future`]
  },
  genre: { 
    type: String, 
    required: true,
    enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy','Mystery', 'Thriller', 'Horror', 'Self-Help', 'Children', 'Young Adult','Math'],
  },
  totalCopies: { type: Number, required: true, min: 1 },
  availableCopies: { type: Number, required: true, min: 0 },
  location: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
bookSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Book', bookSchema);