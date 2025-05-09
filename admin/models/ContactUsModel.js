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
  message:  [
		{
			text: { type: String, required: true },
			sentAt: { type: Date, default: Date.now },
		},
	],
}, {
  timestamps: true 
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema , "contact_us");

export default ContactUs;
