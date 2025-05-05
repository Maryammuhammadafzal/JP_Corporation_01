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
export const updateAttachment = async (req, res) => {
        try {
                const id = req.params.car_id;

                if (!id) {
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

                const update_attachment = await Attachment.findOneAndUpdate(
                        {
                                car_id: id,
                                attachments: pdf
                        },
                        { new: true }
                );

                if (!update_attachment) {
                        return res.status(404).json({ message: 'Attachment not found' });
                }

                res.status(200).json({
                        message: 'Attachment updated successfully',
                        data: update_attachment,
                });

        } catch (error) {
                res.status(400).json({ message : "Failed To update Attachment" , error : error.message});
        }
}
export const deleteAttachment = async (req, res) => {
        try {

        } catch (error) {

        }
}