import mongoose from 'mongoose';

const capSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
    maxlength: 15
  },
  forwarder_name: {
    type: String,
    required: true,
    maxlength: 20
  },
  message: {
    type: String,
    maxlength: 100,
    default: null
  },
  md5_id: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Cap = mongoose.model('Cap', capSchema);

export default Cap;
