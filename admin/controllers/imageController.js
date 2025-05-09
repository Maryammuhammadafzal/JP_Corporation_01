import Image from "../models/ImageModel.js";
import verifyToken from "../middlewares/tokenVerify.js";

export const addImage = async (req, res) => {
        try {
                // Get Car Id 
                const id = req.body.car_id;

                // Get Files / Images
                const files = req.files;

                const count = await Image.countDocuments();
                let car_id = parseInt(id)
                // Creating images data 
                const images = files.map((file, index) => ({
                        images: file.filename,
                        order_id: index + 1,
                        img_id: count + index + 1 + 1,
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
                const get_images = await Image.find({ car_id: parseInt(id) });
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
    const car_id = parseInt(req.params.car_id);
    const files = req.files;

    if (!car_id) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    if (!files || files.length === 0) {
      const existingImages = await Image.find({ car_id }).sort({ order_id: 1 });
      return res.status(200).json({
        message: "No new images uploaded. Returning existing images.",
        data: existingImages,
      });
    }

    // Get current images for this car
    const existingImages = await Image.find({ car_id }).sort({ order_id: 1 });

    const updatedImages = [];

    // Loop over new files and update existing image documents
    for (let i = 0; i < files.length; i++) {
      if (existingImages[i]) {
        const updated = await Image.findOneAndUpdate(
          { _id: existingImages[i]._id },
          {
            images: files[i].filename, // update image filename
            order_id: i + 1, // update order_id
          },
          { new: true }
        );
        updatedImages.push(updated);
      } else {
        // If new file but no existing record, ignore or handle accordingly
        console.warn(`Extra image uploaded: ${files[i].filename} — no matching DB record.`);
      }
    }

    res.status(200).json({
      message: "Images updated successfully (only filename and order_id changed)",
      data: updatedImages,
    });
  } catch (error) {
    console.error("Update Image Error:", error.message);
    res.status(500).json({ message: "Failed to update images", error: error.message });
  }
};


export const deleteImage = async (req, res) => {
        try {
                const car_id = req.params.car_id;
                console.log(car_id);
                
                let deleteImages = await Image.deleteMany({ car_id });
                console.log(deleteImages);


                res.status(200).json({ message: "images deleted successfully", data: deleteImages });

        } catch (error) {
                console.log(error.message);

                res.status(500).json({ message: "Failed to delete product images", error: error.message });

        }
}