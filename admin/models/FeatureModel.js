import mongoose from "mongoose"

const featureSchema = new mongoose.Schema({
  f_id: {
    type: Number,
    required: true,
    unique: true
  },
  feature: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});

// Create the model
const Feature = mongoose.model('Feature', featureSchema);


export default Feature
