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
    type: Number,
    default : null
  },
  drive: {
    type: String,
    default : null
  },
  ext_color: {
    type: String,
    default : null
  },
  steering: {
    type: String,
    default : null
  },
  transmission: {
    type: String,
    default : null
  },
  fuel: {
    type: String,
    default : null
  },
  seats: {
    type: Number,
    default : null
  },
  doors: {
    type: Number,
    default : null
  },
  engine_no: {
    type: String,
    default : null
  },
  options: {
    type: String,
    default : null
  },
  featured_image: {
    type: String,
    default : null
  },
  cap_id: {
    type: Number,
    required: true
  }
}, { versionKey: false });

const ProductInformation = mongoose.model('ProductInformation', productInformationSchema , "product_information");

export default ProductInformation;
