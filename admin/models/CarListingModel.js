import mongoose from 'mongoose';

const carListingSchema = new mongoose.Schema({
  list_id: {
    type: Number,
    required: true
  },
  featured_image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  makeID: {
    type: Number,
    required: true
  },
  modelID: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  drive_type: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  fuel_type: {
    type: String,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  engine_size: {
    type: Number,
    required: true
  },
  cylinders: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  doors: {
    type: String,
    required: true
  },
  vin: {
    type: Number,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  features: {
    type : String,
    default: ''
  },
  safety_features: {
   type : String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  uploaded_by: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: 1
  }
});

const CarListing = mongoose.model('CarListing', carListingSchema , "car_listings");

export default CarListing;
