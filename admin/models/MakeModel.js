import mongoose from 'mongoose';

// Make Schema
const makeSchema = new mongoose.Schema({
  make_id: {
    type: Number,
    required: true,
    unique: true
  },
  make: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Make = mongoose.model('Make', makeSchema , "make");

export default  Make;
