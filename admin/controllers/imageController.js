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
                console.log("Data", add_images_data);


                res.status(200).json({ message: "Gallery images uploaded successfully", data: add_images_data });
        } catch (error) {
                console.log("Error", error.message);

                res.status(500).json({ error: error.message });
        }
}
export const getImage = async (req, res) => {

        try {
                const id = req.params.car_id
                console.log(id);
                const get_images = await Image.find({ car_id: id });
                if (!get_images) {
                        res.status(400).json({ message: "Not found" })
                }
                console.log(get_images);

                res.status(200).json({ message: "Gallery images get successfully", data: get_images });
        } catch (error) {
                res.status(500).json({ message: "failed to get Images", error: error.message });
        }
}


export const updateImage = async (req, res) => {
        try {
                const car_id = req.params.car_id;

                if (!car_id) {
                        return res.status(400).json({ message: "Car ID is required" });
                }

                const files = req.files;

                // CASE 1: User uploads new images
                if (files && files.length > 0) {
                        // Delete previous images for the car
                        await Image.deleteMany({ car_id });

                        const count = await Image.countDocuments();

                        // Map new images
                        const newImages = files.map((file, index) => ({
                                img_id: count + index + 1,
                                images: file.filename,
                                order_id: index + 1,
                                car_id: parseInt(car_id),
                        }));

                        const addedImages = await Image.insertMany(newImages);

                        return res.status(200).json({
                                message: "Images updated successfully with new files",
                                data: addedImages,
                        });
                }

                // CASE 2: No new images — keep existing ones
                const existingImages = await Image.find({ car_id });

                if (!existingImages || existingImages.length === 0) {
                        return res.status(404).json({ message: "No existing images found for this car" });
                }

                return res.status(200).json({
                        message: "No new images provided, old images retained",
                        data: existingImages,
                });
        } catch (error) {
                console.error("Update Image Error:", error.message);
                res.status(500).json({ message: "Failed to update images", error: error.message });
        }
};


export const deleteImage = async (req, res) => {
        try {

        } catch (error) {

        }
}