import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
	name: { type: String },
	email: { type: String, required: true, } ,
	phone: { type: String } ,
	messages: [
		{
			text: { type: String, required: true },
			sentAt: { type: Date, default: Date.now },
		},
	], // Store messages as an array
	
	createdAt: { type: Date, default: Date.now },
});


export default mongoose.model('Contact', contactSchema);
