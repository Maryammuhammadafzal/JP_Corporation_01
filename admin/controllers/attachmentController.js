import Attachment from "../models/AttachmentModel.js";
import verifyToken from "../middlewares/tokenVerify.js";

export const addAttachment = async (req, res) => {
        try {

                // get id 
                const { car_id } = req.body;

                if (!car_id) {
                        res.status(400).json("Car_id is not defined");
                }

                // Get pdf file
                const file = req.file;
                let pdf;

                if (!file) {
                        pdf = "";
                }

                if (file.mimetype !== "application/pdf") {
                        res.status(400).json("Only Pdf file is allowed")
                }

                pdf = file.filename;

                // Count All Documents
                const count = await Attachment.countDocuments();

                const new_attachment_data = new Attachment({
                        _id: `mongodb_generated_id_${count + 1}`,
                        attachments: pdf,
                        car_id
                })

                console.log(new_attachment_data);

                const add_attachment_data = await new_attachment_data.save();

                console.log(add_attachment_data);
                res.status(200).json({ message: "Attachment Added", data: add_attachment_data })

        } catch (error) {
                console.log("attachment error", error.message);
                res.status(400).json({ message: "failed to add attachment", error: error.message });

        }
}
export const getAttachment = async (req, res) => {
        try {
                const id = req.params.car_id;

                const get_attachment = await Attachment.find({ car_id: id })
                console.log(get_attachment);

                res.status(200).json({ message: "Get Attachment ", data: get_attachment });


        } catch (error) {

                res.status(400).json({ message: " failed to get attachemt", error: error.message })
        }
}
// export const updateAttachment = async (req, res) => {
//         try {
//                 const id = req.params.car_id;

//                 if (!id) {
//                         res.status(400).json("Car_id is not defined");
//                 }

//                 // Get pdf file
//                 const file = req.file;
//                 console.log("Attachment File", file);
//                 let pdf;

//                 if (file) {

//                         if (file.mimetype !== "application/pdf") {
//                                 console.log("file not fine");

//                                 res.status(400).json("Only Pdf file is allowed")
//                         }
//                         pdf = file.originalname;
//                         console.log("Get pdf", pdf)
//                 }


//                 if (!file) {
//                         pdf = req.body.attachment_image;
//                         console.log("Empty pdf", pdf)
//                 }


//                 const update_attachment = await Attachment.findOneAndUpdate(
//                         {
//                                 car_id: id,
//                                 attachments: pdf
//                         },
//                         { new: true }
//                 );

//                 if (!update_attachment) {
//                         console.log("Attachment not found");
//                         return res.status(404).json({ message: 'Attachment not found' });
//                 }

//                 console.log("Update Attachment", update_attachment);

//                 res.status(200).json({
//                         message: 'Attachment updated successfully',
//                         data: update_attachment,
//                 });

//         } catch (error) {
//                 console.log("Attachment Error", error.message);
//                 res.status(400).json({ message: "Failed To update Attachment", error: error.message });
//         }
// }
export const updateAttachment = async (req, res) => {
        try {
                const car_id = req.params.car_id;
            
                if (!car_id) {
                    return res.status(400).json({ message: "Car ID is required" });
                }
            
                const file = req.file; // For single file. Use req.files if multiple.
            
                // CASE 1: New attachment is uploaded
                if (file) {
                    // Update existing document (if exists) or insert new one
                    const updatedAttachment = await Attachment.findOneAndUpdate(
                        { car_id },
                        {
                            $set: {
                                attachments: file.filename,
                            },
                        },
                        {
                            new: true,
                            upsert: true, // Insert if not found
                        }
                    );
            
                    return res.status(200).json({
                        message: "Attachment updated successfully",
                        data: updatedAttachment,
                    });
                }
            
                // CASE 2: No file provided, return existing data
                const existingAttachment = await Attachment.findOne({ car_id });
            
                if (!existingAttachment) {
                    return res.status(404).json({ message: "No existing attachment found for this car" });
                }
            
                return res.status(200).json({
                    message: "No new attachment provided, old attachment retained",
                    data: existingAttachment,
                });
            } catch (error) {
                console.error("Update attachment Error:", error.message);
                res.status(500).json({ message: "Failed to update attachment", error: error.message });
            }
            
}
export const deleteAttachment = async (req, res) => {
        try {

        } catch (error) {

        }
}