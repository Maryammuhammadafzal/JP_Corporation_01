import Contact from '../models/ContactModel.js';
import dotenv from 'dotenv';
import sendMessage from '../utils/sendMessage.js';
dotenv.config();

const submitContactForm = async (req, res) => {
        try {
                const { name, email, message , phone} = req.body;
                
                // Validate required fields
                if (!email || !message) {
                        
                        return res.status(400).json({ error: 'Email and message are required' });
                }

                // Find or create contact
                let contact = await Contact.findOne({ email });
               
                if (contact) {
                        
                        // Existing user: Add new message to array
                        contact.messages.push({ text: message, sentAt: new Date() });
                } else {
                        
                        // New user: Create with first message
                        if (!email) return res.status(400).json({ error: 'Email is required for new users' });

                        contact = new Contact({
                                name,
                                email,
                                phone,
                                messages: [{ text: message, sentAt: new Date() }],
                        });
                        console.log(contact);
                        
                        // Send confirmation to the user
                        await sendMessage({
                                type: 'message_confirmation',
                                to: email,
                                data: {

                                        message,

                                },
                        });
                        
                }
              
                

                await contact.save();


                return res.status(contact ? 200 : 201).json({
                        message: 'Message submitted successfully',
                        user: contact ? 'Existing User' : 'New User',
                });
        } catch (error) {
                res.status(500).json({ error: 'Server error', details: error.message });
        }
};




export default submitContactForm;