import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    maxlength: 60
  },
  phone: {
    type: String,
    default: null
  },
  message: {
    type: String,
    required: true,
    maxlength: 255
  }
}, {
  timestamps: true 
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;
