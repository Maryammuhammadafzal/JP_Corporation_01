import ProductImage from "../models/ProductImagesModel.js";

// Add Product Images
export const addProductImage = async (req, res) => {
    try {
        const { productID } = req.body;
        const files = req.files;

        if (!productID || !files || files.length === 0) {
            return res.status(400).json({ message: "Product ID and images are required" });
        }

        const count = await ProductImage.countDocuments();

        const images = files.map((file, index) => ({
            img_url: file.filename,
            img_id: count + index + 1,
            productID: parseInt(productID),
        }));

        const added = await ProductImage.insertMany(images);

        res.status(200).json({ message: "Product images uploaded successfully", data: added });
    } catch (error) {
        res.status(500).json({ message: "Failed to upload product images", error: error.message });
    }
};

// Get Product Images
export const getProductImage = async (req, res) => {
    try {
        const productID = req.params.productID;
        const images = await ProductImage.find({ productID: parseInt(productID) });

        if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found for this product" });
        }

        res.status(200).json({ message: "Product images retrieved successfully", data: images });
    } catch (error) {
        res.status(500).json({ message: "Failed to get product images", error: error.message });
    }
};

// Get Product Images by id
export const getProductImageById = async (req, res) => {
    try {
        const productID = req.params.productID;
        
        const images = await ProductImage.find({ productID: parseInt(productID) });

        if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found for this product" });
        }

        res.status(200).json({ message: "Product images retrieved successfully", data: images });
    } catch (error) {
        res.status(500).json({ message: "Failed to get product images", error: error.message });
    }
};

// Update Product Images
export const updateProductImage = async (req, res) => {
    try {
        const productID = req.params.productID;
        const files = req.files;

        if (!productID) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        await ProductImage.deleteMany({ productID: parseInt(productID) });

        if (files && files.length > 0) {
            const count = await ProductImage.countDocuments();

            const updatedImages = files.map((file, index) => ({
                img_id: count + index + 1,
                img_url: file.filename,
                productID: parseInt(productID),
            }));

            const added = await ProductImage.insertMany(updatedImages);

            return res.status(200).json({ message: "Product images updated successfully", data: added });
        }

        const existingImages = await ProductImage.find({ productID: parseInt(productID) });

        res.status(200).json({ message: "No new images uploaded. Returning existing images.", data: existingImages });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product images", error: error.message });
    }
};

// Delete Product Images
export const deleteProductImage = async (req, res) => {
    try {
        const productID = req.params.productID;

        await ProductImage.deleteMany({ productID: parseInt(productID) });

        res.status(200).json({ message: "Product images deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product images", error: error.message });
    }
};
