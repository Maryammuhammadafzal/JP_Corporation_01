import ShippingInformation from "../models/ShippingInformationModel.js";


export const addShippingInformation = async (req, res) => {
        try {
            const { carrier, dep_vessel_name, port_of_loading, etd, arrive_vessel_name, port_of_discharge, eta, enrollment, cap_id } = req.body;
    
            if (!cap_id) {
                console.log("Shipping id not Found");
                return res.status(400).json({ message: "cap_id is required" });
            }
    
            const file = req.files;
    
            // Handle file uploads with fallback if no file is provided
            let bl = file.bl ? file.bl[0].filename : null;
            let inspection = file.inspection ? file.inspection[0].filename : null;
            let export_certificate = file.export_certificate ? file.export_certificate[0].filename : null;
            let english_export_certificate = file.english_export_certificate ? file.english_export_certificate[0].filename : null;
            let invoice = file.invoice ? file.invoice[0].filename : null;
    
            // Count previous shipping information (if needed, for unique IDs)
            const count = await ShippingInformation.countDocuments();
    
            // Create new shipping information
            const new_shipping_information = await ShippingInformation.create({
                shipping_id: count + 1,
                carrier,
                dep_vessel_name,
                port_of_loading,
                etd,
                arrive_vessel_name,
                port_of_discharge,
                eta,
                bl,
                inspection,
                export_certificate,
                english_export_certificate,
                invoice,
                enrollment,
                cap_id
            });
    
            res.status(200).json({ message: "Shipping Added Successfully", data: new_shipping_information });
    
        } catch (error) {
            console.log("Shipping Add error", error.message);
            res.status(400).json({ message: "Failed to Add Shipping Information", error: error.message });
        }
    };
    
    export const getShippingInformation = async (req, res) => {
        try {
            const page = parseInt(req.query.page || 1);
            const limit = parseInt(req.query.limit || 100);
    
            // Get shipping information with pagination
            const get_shipping_data = await ShippingInformation.find()
                .sort({ created_at: -1 }) // Assuming `created_at` is a valid field for sorting
                .skip((page - 1) * limit)
                .limit(limit);
    
            res.status(200).json({ message: "Success", data: get_shipping_data });
    
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Failed to retrieve shipping information", error: error.message });
        }
    };
    
    export const getShippingInformationById = async (req, res) => {
        try {
        const cap_id = req.params.id;
    
            // Get shipping information with pagination
            const get_shipping_data = await ShippingInformation.findOne({cap_id})
    
            res.status(200).json({ message: "Success", data: get_shipping_data });
    
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Failed to retrieve shipping information", error: error.message });
        }
    };

    
    export const updateShippingInformation = async (req, res) => {
        try {
            const { id } = req.params;
            const { carrier, dep_vessel_name, port_of_loading, etd, arrive_vessel_name, port_of_discharge, eta, enrollment, cap_id } = req.body;
    
            // Check if required fields are provided
            if (!carrier || !dep_vessel_name || !port_of_loading || !etd || !arrive_vessel_name || !port_of_discharge || !eta) {
                return res.status(400).json({ message: "All required fields must be provided" });
            }
    
            const file = req.files;
    
            // Get existing shipping information
            const existingShippingInformation = await ShippingInformation.findOne({ cap_id: id });
    
            if (!existingShippingInformation) {
                return res.status(404).json({ message: "Shipping Information not found" });
            }
    
            // Handle files - if no new files are provided, use existing ones
            let bl = file.bl ? file.bl[0].filename : existingShippingInformation.bl;
            let inspection = file.inspection ? file.inspection[0].filename : existingShippingInformation.inspection;
            let export_certificate = file.export_certificate ? file.export_certificate[0].filename : existingShippingInformation.export_certificate;
            let english_export_certificate = file.english_export_certificate ? file.english_export_certificate[0].filename : existingShippingInformation.english_export_certificate;
            let invoice = file.invoice ? file.invoice[0].filename : existingShippingInformation.invoice;
    
            // Update the shipping information with the new or existing data
            const updated_shipping_information = await ShippingInformation.findOneAndUpdate(
                { cap_id: id },
                {
                    carrier,
                    dep_vessel_name,
                    port_of_loading,
                    etd,
                    arrive_vessel_name,
                    port_of_discharge,
                    eta,
                    enrollment,
                    bl,
                    inspection,
                    export_certificate,
                    english_export_certificate,
                    invoice,
                    cap_id
                },
                { new: true } // Return the updated document
            );
    
            if (!updated_shipping_information) {
                return res.status(404).json({ message: "Failed to update shipping information" });
            }
    
            res.status(200).json({ message: "Shipping Information Updated Successfully", data: updated_shipping_information });
    
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Failed to update shipping information", error: error.message });
        }
    };
    
    
    export const deleteShippingInformation = async (req, res) => {
        const { id } = req.params;
        console.log("Shipping Info ID:", id);
    
        try {
            const delete_shipping_information = await ShippingInformation.findOneAndDelete({ cap_id: id });
    
            if (!delete_shipping_information) {
                console.log("Shipping information not found");
                return res.status(404).json({ message: "Shipping information not found" });
            }
    
            res.status(200).json({ message: "Shipping information deleted successfully", data: delete_shipping_information });
    
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Failed to delete shipping information", error: error.message });
        }
    };
    