import mongoose from 'mongoose';

// Product Information Schema
const productInformationSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  reference_no: {
    type: String,
    required: true
  },
  mileage: {
    type: String,
    required: true
  },
  modelCode: {
    type: String,
    required: true
  },
  registeration_year_month: {
    type: String,
    required: true
  },
  manufacture_year_month: {
    type: String,
    required: true
  },
  modelGrade: {
    type: String,
    required: true
  },
  chassis: {
    type: String,
    default: ''
  },
  engine_size: {
    type: Number
  },
  drive: {
    type: String
  },
  ext_color: {
    type: String
  },
  steering: {
    type: String
  },
  transmission: {
    type: String
  },
  fuel: {
    type: String
  },
  seats: {
    type: Number
  },
  doors: {
    type: Number
  },
  engine_no: {
    type: String
  },
  options: {
    type: String
  },
  featured_image: {
    type: String
  },
  cap_id: {
    type: Number,
    required: true
  }
}, { versionKey: false });

const ProductInformation = mongoose.model('ProductInformation', productInformationSchema , "product_information");

export default ProductInformation;
