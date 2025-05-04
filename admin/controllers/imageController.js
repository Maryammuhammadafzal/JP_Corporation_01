import Image from "../models/ImageModel.js";
import verifyToken from "../middlewares/tokenVerify.js";

export const addImage = async (req, res) => {
        try {
                // Get Car Id 
                const { car_id } = req.body;

                // Get Files / Images
                const files = req.files;

                const count = await Image.countDocuments();

                // Creating images data 
                const images = files.map((file, index) => ({
                        images: file.filename,
                        order_id: index + 1,
                        img_id: count + index + 1,
                        car_id,
                }));
                console.log(...images);
                

                const add_images_data = await Image.insertMany(images);
                console.log("Data" , add_images_data);
                

                res.status(200).json({ message: "Gallery images uploaded successfully", data: add_images_data });
        } catch (error) {
                console.log("Error" , error.message);
                
                res.status(500).json({ error: error.message });
        }
}
export const getImage = async (req, res) => {
        
        try {
                const id = req.params.car_id
        console.log(id);
                const get_images = await Image.find({ car_id : id});
                if (!get_images) {
                        res.status(400).json({message : "Not found"}) 
                }
                console.log(get_images);

                res.status(200).json({ message: "Gallery images get successfully", data: get_images });
        } catch (error) {
                res.status(500).json({ message : "failed to get Images" , error: error.message });
        }
}
export const updateImage = async (req, res) => {
        try {

        } catch (error) {

        }
}
export const deleteImage = async (req, res) => {
        try {

        } catch (error) {

        }
}