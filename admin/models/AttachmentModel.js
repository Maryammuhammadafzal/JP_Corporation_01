import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  attachments: {
    type: String,
    required: true
  },
  car_id: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Attachment = mongoose.model('Attachment', attachmentSchema , "attachments");

export default Attachment;
