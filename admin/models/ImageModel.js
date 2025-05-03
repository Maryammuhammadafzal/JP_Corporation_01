import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  img_id: {
    type: Number,
    required: true,
    unique: true
  },
  images: {
    type: String,
    required: true
  },
  order_id: {
    type: Number,
    required: true
  },
  car_id: {
    type: Number,
    required: true
  }
}, {
  timestamps: true 
});

// Create the model
const Image = mongoose.model('Image', imageSchema);

export default Image;
