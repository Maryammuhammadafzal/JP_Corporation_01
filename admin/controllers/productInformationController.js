import ProductInformation from "../models/ProductInformationModel.js";

export const addProductInformation =  async (req, res) => {
        try {
                const { product_name, reference_no, mileage, modelCode, registeration_year_month, manufacture_year_month, modelGrade, chassis, engine_size, drive, seats, doors, engine_no, options, cap_id } = req.body;


                if (!cap_id) {
                        console.log("Document id not Found");
                        return res.status(400).json({ message: "cap_id is required" });

                }

                const file = req.file;
                console.log(file);
                
                let featured_image = file ? file.filename : null;


                const count = await ProductInformation.countDocuments();

                // Create new Cap
                const new_document_information = await ProductInformation.create({
                        product_id : count + 1,
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
                        featured_image,
                        cap_id
                })

                if (!new_document_information) {
                        console.log({ message: "Data Not Found" });
                        return res.status(400).json({ message: "Data Not Found" });
                }

                const add_document_information = await new_document_information.save();

                res.status(200).json({ message: "Document Added Successfully", data: add_document_information });

        } catch (error) {
                console.log("Document Add error", error.message);
                res.status(400).json({ message: "Failed To Add document", error: error.message });

        }
}
export const getProductInformation =  async (req, res) => {
        try {

                const page = parseInt(req.query.page || 1);
                const limit = parseInt(req.query.limit || 100);

                // Get All Car Listing 
                const get_product_data = await ProductInformation.find()
                        .sort({ created_at: -1 })
                        .skip((page - 1) * limit)
                        .limit(limit);

                res.status(200).json({ message: "Success", data: get_product_data });
        } catch (error) {
                console.log(error.message);

                res.status(400).json({ message: "Invalid Credentials", error });
        }

}
export const updateProductInformation =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}
export const deleteProductInformation =  async (req, res) => {
                const { id } = req.params;
        
                try {
                        const delete_product_information = await ProductInformation.findOneAndDelete({cap_id : id});
        
                        if (!delete_product_information) {
                                console.log("not Found");
        
                                return res.status(404).json({ message: "product_information not found" });
                        }
                        res.status(200).json({ message: "product_information deleted Succesfully", data: delete_product_information })
        
                } catch (error) {
                        console.log(error.message);
                        res.status(400).json({ message: "Failed Deleting product_information", error: error.message })
        
        
                }
        
}