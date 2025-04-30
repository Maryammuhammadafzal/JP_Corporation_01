import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
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

const Attachment = mongoose.model('Attachment', attachmentSchema);

export default Attachment;
