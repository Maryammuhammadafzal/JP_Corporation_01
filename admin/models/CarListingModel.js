import mongoose from 'mongoose';

const carListingSchema = new mongoose.Schema({
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
    type: String,
    required: true
  },
  modelID: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  year: {
    type: String,
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
    type: String,
    required: true
  },
  engine_size: {
    type: String,
    required: true
  },
  cylinders: {
    type: String,
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
    type: String,
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
