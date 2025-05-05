import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  _id: {
    type: String,
  
  },
  attachments: {
    type: String,
    
  },
  car_id: {
    type: Number,
   
  }
}, {
  timestamps: true
});

const Attachment = mongoose.model('Attachment', attachmentSchema , "attachments");

export default Attachment;
