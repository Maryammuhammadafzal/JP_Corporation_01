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

                const id = req.params.car_id;

                if (!id) {
                        console.log("Images Id Not Found");
                      return  res.status(400).json("Images Id Not Found");
                }

                const { gallery_images, car_id } = req.body;
                console.log("image body" , gallery_images , car_id);

                const files = req.files;
                console.log("image file" ,files);


                let images;
                if (!files || files.length === 0) {
                console.log("run");
                        
                        images = {
                                images: gallery_images,
                                car_id,
                        };
                        console.log("run Image" , images);
                        

                }
                const count = await Image.countDocuments();
                if (files) {
                console.log("runnn");
                
                        // Creating images data 
                        images = files.map((file, index) => ({
                                images: file.filename,
                                order_id: index + 1,
                                img_id: count + index + 1,
                                car_id,
                        }));

                console.log("runnn images" , images);

                }

                console.log(images);

                const update_images = await Image.findOneAndUpdate({
                        ...images
                }, { new: true });
                console.log("Updated" , update_images);

                if (!update_images) {
                        console.log("images are not updated");
                        
                      return res.status(400).json("Images Not Updated")
                }

                res.status(200).json({ message: "Images Updated Successfully", data: update_images });

        } catch (error) {
                console.log("update image err" , error.message);
                
                res.status(400).json({ message: "Failed to Updated  Images", error: error.message });

        }
}
export const deleteImage = async (req, res) => {
        try {

        } catch (error) {

        }
}