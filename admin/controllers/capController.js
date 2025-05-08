import Cap from "../models/CapModel.js";

export const addCap = async (req, res) => {
        try {
                const { company_name, forwarder_name, message } = req.body;

                if (!company_name || !forwarder_name) {
                        console.log("All fields are required");
                        return res.status(400).json({ message: "All fields are required" });
                }

                // Count previous cap
                const count = await Cap.countDocuments();

                // Create new Cap
                const new_cap = await Cap.create({
                        _id : `mongodb_generated_id_${count + 1}`,
                        forwarder_name,
                        company_name,
                        message,
                        md5_id: count + 1
                });

                res.status(200).json({ message: "Cap Added Successfully", data: new_cap });

        } catch (error) {
                console.log("Cap Add error", error.message);
                res.status(400).json({ message: "Failed to Add Cap", error: error.message });
        }
};
export const getCap = async (req, res) => {
        try {
                const page = parseInt(req.query.page || 1);
                const limit = parseInt(req.query.limit || 100);

                // Get Cap data with pagination
                const get_cap_data = await Cap.find()
                        .sort({ created_at: -1 }) // Assuming `created_at` is a valid field
                        .skip((page - 1) * limit)
                        .limit(limit);

                res.status(200).json({ message: "Success", data: get_cap_data });

        } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: "Failed to retrieve Cap data", error: error.message });
        }
};
export const getCapById = async (req, res) => {
        try {
                let { id } = req.params;
               let cap_id = `mongodb_generated_id_${id}`

                // Get Cap data By id with pagination
                const get_cap_data_by_id = await Cap.findById(cap_id)
                        
                res.status(200).json({ message: "Success", data: get_cap_data_by_id });

        } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: "Failed to retrieve Cap data", error: error.message });
        }
};

export const updateCap = async (req, res) => {
        try {
            const { id } = req.params;
            const { company_name, forwarder_name, message } = req.body;
    
            // Validate fields
            if (!company_name || !forwarder_name) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            // Update the cap document
            const updated_cap = await Cap.findOneAndUpdate(
                { md5_id: id }, // Assuming `md5_id` is used for updates
                { company_name, forwarder_name, message },
                { new: true } // Return the updated document
            );
    
            if (!updated_cap) {
                return res.status(404).json({ message: "Cap not found" });
            }
    
            res.status(200).json({ message: "Cap Updated Successfully", data: updated_cap });
    
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Failed to update Cap", error: error.message });
        }
    };
    
    export const deleteCap = async (req, res) => {
        const { id } = req.params;
        console.log("Cap ID:", id);
    
        try {
            const delete_cap = await Cap.findOneAndDelete({ md5_id: id });
    
            if (!delete_cap) {
                console.log("Cap not found");
                return res.status(404).json({ message: "Cap Listing not found" });
            }
    
            res.status(200).json({ message: "Cap Listing deleted successfully", data: delete_cap });
    
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: "Failed to delete Cap", error: error.message });
        }
    };
    