import ContactUs from "../models/ContactUsModel.js";
import sendEmail from "../utils/sendMessage.js"
export const addContactUs =  async (req, res) => {
        try {
           const {name , email , phone , message} = req.body;
           
           if (!name || !email || !message) {
                console.log("All Feilds are required");
                return res.status(400).json("All Feilds are required")
           }

           let contact = await ContactUs.findOne({ email });
console.log('Contact:', contact);
		if (contact) {
			// Existing user: Add new message to array
			contact.message.push({ text: message, sentAt: new Date() });
		} else {

                        contact = new ContactUs({
                             name ,
                             email,
                             phone,
                             message : [{ text: message, sentAt: new Date() }]
             
                        })

                        // Send confirmation to the user
			await sendEmail({
				type: 'message_confirmation',
				to: email, 
				data: {
				
                               message,
                    
				},
			});
                }
                
                const add_contact_data = await contact.save();
                res.status(200).json({message : "Contact Data Added Successfully" , data : add_contact_data})



        } catch (error) {
                console.log("Contact Error" , error.message);
               res.status(400).json({ message: "Contact Error", error: error.message });
                
        }
}
// export const getContactUs =  async (req, res) => {
//         try {
            
//         } catch (error) {
                
//         }
// }
// export const updateContactUs =  async (req, res) => {
//         try {
            
//         } catch (error) {
                
//         }
// }
// export const deleteContactUs =  async (req, res) => {
//         try {
            
//         } catch (error) {
                
//         }
// }