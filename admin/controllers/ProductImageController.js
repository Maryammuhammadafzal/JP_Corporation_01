import ProductImage from "../models/ProductImagesModel.js";

export const addProductImage = async (req, res) => {
        try {
                // Get Car Id 
                const { productID } = req.body;

                // Get Files / Images
                const files = req.files;

                const count = await ProductImage.countDocuments();

                // Creating images data 
                const images = files.map((file, index) => ({
                        img_url: file.filename,
                        img_id: count + index + 1,
                        productID,
                }));
                console.log(...images);


                const add_images_data = await ProductImage.insertMany(images);
                console.log("Data", add_images_data);


                res.status(200).json({ message: "Product images uploaded successfully", data: add_images_data });
        } catch (error) {
                console.log("Error", error.message);

                res.status(500).json({ error: error.message });
        }
}
export const getProductImage = async (req, res) => {

        try {
                const id = req.params.productID
                console.log(id);
                const get_images = await ProductImage.find({ productID: id });
                if (!get_images) {
                        res.status(400).json({ message: "Not found" })
                }
                console.log(get_images);

                res.status(200).json({ message: "Product images get successfully", data: get_images });
        } catch (error) {
                res.status(500).json({ message: "failed to get Images", error: error.message });
        }
}


export const updateProductImage = async (req, res) => {
        try {
                const productID = req.params.productID;

                if (!productID) {
                        return res.status(400).json({ message: "product ID is required" });
                }

                const files = req.files;
                let updatedImages = [];

                if (files && files.length > 0) {
                        // Step 1: Delete previous images
                        await ProductImage.deleteMany({ productID: parseInt(productID) });

                        const lastImage = await ProductImage.find({ productID: parseInt(productID) })
                                .sort({ img_id: -1 })
                                .limit(1);
                        console.log(lastImage);


                        let lastImgId = lastImage.length > 0 ? lastImage[0].img_id : 0;
                        console.log("last Image id", lastImgId);


                        // Step 2: Get total count of documents for img_id generation
                        const count = await ProductImage.countDocuments();
                        console.log(count);

                        // Step 3: Add new images
                        updatedImages = files.map((file, index) => ({
                                img_id: count + index + 1,
                                images: file.filename,
                                productID: parseInt(productID),
                        }));

                        // Step 4: Save to DB
                        const addedImages = await ProductImage.insertMany(updatedImages);

                        return res.status(200).json({
                                message: "Images updated successfully with new files",
                                data: addedImages,
                        });
                } else {
                        // No new files, just return current images
                        const existingImages = await ProductImage.find({ productID: parseInt(productID) });

                        return res.status(200).json({
                                message: "No new images uploaded. Returning existing images.",
                                data: existingImages,
                        });
                }
        } catch (error) {
                console.error("Update Image Error:", error.message);
                res.status(500).json({ message: "Failed to update images", error: error.message });
        }
};

export const deleteProductImage =  async (req, res) => {
        const { id } = req.params;

        try {
                const delete_product_images = await ProductImage.findOneAndDelete({productID : id});

                if (!delete_product_images) {
                        console.log("not Found");

                        return res.status(404).json({ message: "product_images not found" });
                }
                res.status(200).json({ message: "product_images deleted Succesfully", data: delete_product_images })

        } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: "Failed Deleting product_images", error: error.message })


        }
}