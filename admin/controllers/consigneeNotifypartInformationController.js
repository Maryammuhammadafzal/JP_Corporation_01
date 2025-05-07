import ConsigneeNotifypartInformation from "../models/ConsigneeNotifypartyInformationModel.js";

export const addConsigneeNotifypartInformation =  async (req, res) => {
        try {
                const { consignee_name, consignee_address, consignee_city, consignee_country, consignee_phone1, consignee_phone2, consignee_phone3, consignee_faxno, consignee_phoneno_email, notifyParty_name, notifyParty_address, notifyParty_city, notifyParty_country, notifyParty_phone1, notifyParty_phone2, notifyParty_phone3, notifyParty_faxno,
                        notifyParty_phoneno_email, cap_id } = req.body;


                if (!cap_id) {
                        console.log("Document id not Found");
                        return res.status(400).json({ message: "cap_id is required" });

                }

                // Create new Cap
                const new_consignee_notifyParty_information = await ConsigneeNotifypartInformation.create({
                        consignee_name,
                        consignee_address,
                        consignee_city,
                        consignee_country,
                        consignee_phone1,
                        consignee_phone2,
                        consignee_phone3,
                        consignee_faxno,
                        consignee_phoneno_email,
                        notifyParty_name,
                        notifyParty_address,
                        notifyParty_city,
                        notifyParty_country,
                        notifyParty_phone1,
                        notifyParty_phone2,
                        notifyParty_phone3,
                        notifyParty_faxno,
                        notifyParty_phoneno_email,
                        cap_id
                })

                if (!new_consignee_notifyParty_information) {
                        console.log({ message: "Data Not Found" });
                        return res.status(400).json({ message: "Data Not Found" });
                }

                const add_consignee_notifyParty_information = await new_consignee_notifyParty_information.save();

                res.status(200).json({ message: "consignee Added Successfully", data: add_consignee_notifyParty_information });

        } catch (error) {
                console.log("consignee Add error", error.message);
                res.status(400).json({ message: "Failed To Add consignee", error: error.message });

        }
}
export const getConsigneeNotifypartInformation =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}
export const updateConsigneeNotifypartInformation =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}
export const deleteConsigneeNotifypartInformation =  async (req, res) => {
        const { id } = req.params;

        try {
                const delete_consignee = await ConsigneeNotifypartInformation.findOneAndDelete({cap_id : id});

                if (!delete_consignee) {
                        console.log("not Found");

                        return res.status(404).json({ message: "Consignee not found" });
                }
                res.status(200).json({ message: "Consignee deleted Succesfully", data: delete_consignee })

        } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: "Failed Deleting consignee", error: error.message })


        }
}