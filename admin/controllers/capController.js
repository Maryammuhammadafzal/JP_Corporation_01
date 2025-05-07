import Cap from "../models/CapModel.js";

export const addCap = async (req, res) => {

        try {
                const { company_name, forwarder_name, message } = req.body;

                if (!company_name || !forwarder_name) {
                        console.log("All Feilds are required");
                        return res.status(400).json({ message: "All feilds are required" });
                }

                // Count previous cap
                const count = await Cap.countDocuments();

                // Create new Cap
                const new_cap = await Cap.create({
                        _id: `mongodb_generated_id${count + 1}`,
                        forwarder_name,
                        company_name,
                        message,
                        md5_id : count + 1
                })

                if (!new_cap) {
                        console.log({ message: "Data Not Found" });
                        res.status(400).json({ message: "Data Not Found" });
                }

                const add_cap = await new_cap.save();

                res.status(200).json({ message: "Cap Added Successfully", data: add_cap });

        } catch (error) {
                console.log("cap Add error", error.message);
                res.status(400).json({message : "Failed To Add Cap" , error : error.message});

        }
}
export const getCap = async (req, res) => {
        try {

                const page = parseInt(req.query.page || 1);
                const limit = parseInt(req.query.limit || 100);

                // Get All Car Listing 
                const get_cap_data = await Cap.find()
                        .sort({ created_at: -1 })
                        .skip((page - 1) * limit)
                        .limit(limit);

                res.status(200).json({ message: "Success", data: get_cap_data });
        } catch (error) {
                console.log(error.message);

                res.status(400).json({ message: "Invalid Credentials", error });
        }

}
export const updateCap = async (req, res) => {
        try {

        } catch (error) {

        }
}
export const deleteCap = async (req, res) => {
        const { id } = req.params;

        try {
                const delete_cap = await Cap.findOneAndDelete({md5_id : id});

                if (!delete_cap) {
                        console.log("not Found");

                        return res.status(404).json({ message: "Cap Listing not found" });
                }
                res.status(200).json({ message: "Cap Listing deleted Succesfully", data: delete_cap })

        } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: "Failed Deleting Cap", error: error.message })


        }
}