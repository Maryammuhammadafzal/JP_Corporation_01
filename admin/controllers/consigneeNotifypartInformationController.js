import ConsigneeNotifypartInformation from "../models/ConsigneeNotifypartyInformationModel.js";

// Add Consignee & Notify Party Info
export const addConsigneeNotifypartInformation = async (req, res) => {
    try {
        const {
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
        } = req.body;

        if (!cap_id) {
            return res.status(400).json({ message: "cap_id is required" });
        }

        const data = new ConsigneeNotifypartInformation({
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
        });

        const saved = await data.save();

        res.status(200).json({ message: "Consignee and Notify Party information added successfully", data: saved });
    } catch (error) {
        res.status(400).json({ message: "Failed to add Consignee and Notify Party", error: error.message });
    }
};

// Get Consignee & Notify Party by cap_id
export const getConsigneeNotifypartInformation = async (req, res) => {
    try {
        const cap_id = req.params.cap_id;

        const data = await ConsigneeNotifypartInformation.findOne({ cap_id });

        if (!data) {
            return res.status(404).json({ message: "No data found for this cap_id" });
        }

        res.status(200).json({ message: "Data retrieved successfully", data });
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve data", error: error.message });
    }
};

// Get Consignee & Notify Party by cap_id
export const getConsigneeNotifypartInformationById = async (req, res) => {
    try {
        const cap_id = req.params.id;

        const data = await ConsigneeNotifypartInformation.findOne({ cap_id });
console.log(data);

        if (!data) {
            return res.status(404).json({ message: "No data found for this cap_id" });
        }

        res.status(200).json({ message: "Data retrieved successfully", data });
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve data", error: error.message });
    }
};

// Update Consignee & Notify Party by cap_id
export const updateConsigneeNotifypartInformation = async (req, res) => {
    try {
        const cap_id = req.params.cap_id;
        const updates = req.body;

        const updated = await ConsigneeNotifypartInformation.findOneAndUpdate(
            { cap_id },
            updates,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "No data found to update for this cap_id" });
        }

        res.status(200).json({ message: "Consignee and Notify Party updated successfully", data: updated });
    } catch (error) {
        res.status(400).json({ message: "Failed to update data", error: error.message });
    }
};

// Delete by cap_id
export const deleteConsigneeNotifypartInformation = async (req, res) => {
    try {
        const { cap_id } = req.params;

        const deleted = await ConsigneeNotifypartInformation.findOneAndDelete({ cap_id });

        if (!deleted) {
            return res.status(404).json({ message: "Consignee and Notify Party not found" });
        }

        res.status(200).json({ message: "Consignee and Notify Party deleted successfully", data: deleted });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete data", error: error.message });
    }
};
