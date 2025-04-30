import mongoose from 'mongoose';

// Model Schema
const modelSchema = new mongoose.Schema({
  model_id: {
    type: Number,
    required: true,
    unique: true
  },
  model: {
    type: String,
    required: true
  },
  make_id: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Model = mongoose.model('Model', modelSchema , "model");

export default Model;
