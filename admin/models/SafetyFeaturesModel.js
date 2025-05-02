import mongoose from 'mongoose';

// Safety Features Schema
const safetyFeaturesSchema = new mongoose.Schema({
  safety_features: {
    type: String,
    required: true
  }
}, { timestamps: true });

const SafetyFeature = mongoose.model('SafetyFeature', safetyFeaturesSchema  );

export default SafetyFeature;
