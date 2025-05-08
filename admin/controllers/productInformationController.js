import ProductInformation from "../models/ProductInformationModel.js";

// Add Product Information
export const addProductInformation = async (req, res) => {
        try {
                const {
                        product_name,
                        reference_no,
                        mileage,
                        modelCode,
                        registeration_year_month,
                        manufacture_year_month,
                        modelGrade,
                        chassis,
                        engine_size,
                        drive,
                        seats,
                        doors,
                        engine_no,
                        options,
                        cap_id
                } = req.body;

                if (!cap_id) {
                        return res.status(400).json({ message: "cap_id is required" });
                }

                const parsedDoors = isNaN(parseInt(doors)) ? null : parseInt(doors);
                const featured_image = req.file ? req.file.filename : null;

                const count = await ProductInformation.countDocuments();

                const newProduct = await ProductInformation.create({
                        product_id: count + 1,
                        product_name,
                        reference_no,
                        mileage,
                        modelCode,
                        registeration_year_month,
                        manufacture_year_month,
                        modelGrade,
                        chassis,
                        engine_size,
                        drive,
                        seats,
                        doors: parsedDoors,
                        engine_no,
                        options,
                        featured_image,
                        cap_id
                });

                res.status(201).json({ message: "Product information added successfully", data: newProduct });
        } catch (error) {
                console.error("Add Product Error:", error.message);
                res.status(500).json({ message: "Failed to add product information", error: error.message });
        }
};

// Get All Product Information (Paginated)
export const getProductInformation = async (req, res) => {
        try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 100;

                const products = await ProductInformation.find()
                        .sort({ created_at: -1 })
                        .skip((page - 1) * limit)
                        .limit(limit);

                res.status(200).json({ message: "Product information fetched successfully", data: products });
        } catch (error) {
                console.error("Get Product Error:", error.message);
                res.status(500).json({ message: "Failed to fetch product information", error: error.message });
        }
};

// Get All Product Information (Paginated)
export const getProductInformationById = async (req, res) => {
        try {
                let cap_id = req.params.id

                const products = await ProductInformation.findOne({ cap_id })

                res.status(200).json({ message: "Product information fetched successfully", data: products });
        } catch (error) {
                console.error("Get Product Error:", error.message);
                res.status(500).json({ message: "Failed to fetch product information", error: error.message });
        }
};

// Update Product Information
export const updateProductInformation = async (req, res) => {
        try {
                const { id } = req.params;

                const existingProduct = await ProductInformation.findOne({ cap_id: id });

                if (!existingProduct) {
                        return res.status(404).json({ message: "Product information not found" });
                }

                const {
                        product_name,
                        reference_no,
                        mileage,
                        modelCode,
                        registeration_year_month,
                        manufacture_year_month,
                        modelGrade,
                        chassis,
                        engine_size,
                        drive,
                        seats,
                        doors,
                        engine_no,
                        options,
                        cap_id
                } = req.body;

                const parsedDoors = isNaN(parseInt(doors)) ? existingProduct.doors : parseInt(doors);
                const featured_image = req.file ? req.file.filename : existingProduct.featured_image;

                const updatedProduct = await ProductInformation.findOneAndUpdate(
                        { cap_id: id },
                        {
                                product_name,
                                reference_no,
                                mileage,
                                modelCode,
                                registeration_year_month,
                                manufacture_year_month,
                                modelGrade,
                                chassis,
                                engine_size,
                                drive,
                                seats,
                                doors: parsedDoors,
                                engine_no,
                                options,
                                featured_image,
                                cap_id
                        },
                        { new: true }
                );

                res.status(200).json({ message: "Product information updated successfully", data: updatedProduct });
        } catch (error) {
                console.error("Update Product Error:", error.message);
                res.status(500).json({ message: "Failed to update product information", error: error.message });
        }
};

// Delete Product Information by cap_id
export const deleteProductInformation = async (req, res) => {
        try {
                const { id } = req.params;

                const deletedProduct = await ProductInformation.findOneAndDelete({ cap_id: id });

                if (!deletedProduct) {
                        return res.status(404).json({ message: "Product information not found" });
                }

                res.status(200).json({ message: "Product information deleted successfully", data: deletedProduct });
        } catch (error) {
                console.error("Delete Product Error:", error.message);
                res.status(500).json({ message: "Failed to delete product information", error: error.message });
        }
};
