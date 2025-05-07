import ShippingInformation from "../models/ShippingInformationModel.js";
import verifyToken from "../middlewares/tokenVerify.js";

export const addShippingInformation = async (req, res) => {
        try {
                const { carrier,
                        dep_vessel_name,
                        port_of_loading,
                        etd,
                        arrive_vessel_name,
                        port_of_discharge,
                        eta,
                        enrollment,
                        cap_id
                } = req.body;

                if (!cap_id) {
                        console.log("Shipping id not Found");
                        return res.status(400).json({ message: "cap_id is required" });

                }
                const file = req.files;


                let bl = file.bl ? file.bl[0].filename : null;
                let inspection = file.inspection ? file.inspection[0].filename : null;
                let export_certificate = file.export_certificate ? file.export_certificate[0].filename : null;
                let english_export_certificate = file.english_export_certificate ? file.english_export_certificate[0].filename : null;
                let invoice = file.invoice ? file.invoice[0].filename : null;



                // Count previous cap
                const count = await ShippingInformation.countDocuments();

                // Create new Cap
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
                })

                if (!new_shipping_information) {
                        console.log({ message: "Data Not Found" });
                        return res.status(400).json({ message: "Data Not Found" });
                }

                const add_shipping_information = await new_shipping_information.save();

                res.status(200).json({ message: "Shipping Added Successfully", data: add_shipping_information });

        } catch (error) {
                console.log("Shipping Add error", error.message);
                res.status(400).json({ message: "Failed To Add Cap", error: error.message });

        }
}
export const getShippingInformation = async (req, res) => {
        try {

                const page = parseInt(req.query.page || 1);
                const limit = parseInt(req.query.limit || 100);

                // Get All Car Listing 
                const get_shipping_data = await ShippingInformation.find()
                        .sort({ created_at: -1 })
                        .skip((page - 1) * limit)
                        .limit(limit);

                res.status(200).json({ message: "Success", data: get_shipping_data });
        } catch (error) {
                console.log(error.message);

                res.status(400).json({ message: "Invalid Credentials", error });
        }

}
export const updateShippingInformation = async (req, res) => {
        try {

        } catch (error) {

        }
}
export const deleteShippingInformation = async (req, res) => {
               const { id } = req.params;
        
                try {
                        const delete_shipping_information = await ShippingInformation.findOneAndDelete({cap_id : id});
        
                        if (!delete_shipping_information) {
                                console.log("not Found");
        
                                return res.status(404).json({ message: "shipping_information not found" });
                        }
                        res.status(200).json({ message: "shipping_information deleted Succesfully", data: delete_shipping_information })
        
                } catch (error) {
                        console.log(error.message);
                        res.status(400).json({ message: "Failed Deleting shipping_information", error: error.message })
        
        
                }
        
}