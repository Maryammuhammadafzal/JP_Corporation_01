import DocumentInformation from "../models/DocumentInformationModel.js";

// Add Document Information
export const addDocumentInformation = async (req, res) => {
    try {
        const {
            doc_name,
            doc_address,
            doc_city,
            doc_country,
            doc_phone1,
            doc_phone2,
            doc_phone3,
            doc_faxno,
            cellphone_no_email,
            tracking_no,
            docCenter_name,
            docCenter_address,
            docCenter_city,
            docCenter_country,
            docCenter_phone1,
            docCenter_phone2,
            docCenter_phone3,
            email,
            url,
            other_information,
            cap_id
        } = req.body;

        if (!cap_id) {
            return res.status(400).json({ message: "cap_id is required" });
        }

        const newDocument = await DocumentInformation.create({
            doc_name,
            doc_address,
            doc_city,
            doc_country,
            doc_phone1,
            doc_phone2,
            doc_phone3,
            doc_faxno,
            cellphone_no_email,
            tracking_no,
            docCenter_name,
            docCenter_address,
            docCenter_city,
            docCenter_country,
            docCenter_phone1,
            docCenter_phone2,
            docCenter_phone3,
            email,
            url,
            other_information,
            cap_id
        });

        res.status(201).json({ message: "Document added successfully", data: newDocument });
    } catch (error) {
        console.error("Add Document Error:", error.message);
        res.status(500).json({ message: "Failed to add document information", error: error.message });
    }
};

// Get All Document Information (Paginated)
export const getDocumentInformation = async (req, res) => {
    try {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 100);

        const documents = await DocumentInformation.find()
            .sort({ created_at: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({ message: "Document information fetched successfully", data: documents });
    } catch (error) {
        console.error("Get Document Error:", error.message);
        res.status(500).json({ message: "Failed to fetch document information", error: error.message });
    }
};
// Get All Document Information (Paginated)
export const getDocumentInformationById = async (req, res) => {
    try {
        const cap_id = req.params.id;

        const documents = await DocumentInformation.findOne({cap_id})

        res.status(200).json({ message: "Document information fetched successfully", data: documents });
    } catch (error) {
        console.error("Get Document Error:", error.message);
        res.status(500).json({ message: "Failed to fetch document information", error: error.message });
    }
};

// Update Document Information
export const updateDocumentInformation = async (req, res) => {
    try {
        const { id } = req.params;

        const existingDoc = await DocumentInformation.findOne({ cap_id: id });
        if (!existingDoc) {
            return res.status(404).json({ message: "Document not found" });
        }

        const {
            doc_name,
            doc_address,
            doc_city,
            doc_country,
            doc_phone1,
            doc_phone2,
            doc_phone3,
            doc_faxno,
            cellphone_no_email,
            tracking_no,
            docCenter_name,
            docCenter_address,
            docCenter_city,
            docCenter_country,
            docCenter_phone1,
            docCenter_phone2,
            docCenter_phone3,
            email,
            url,
            other_information,
            cap_id
        } = req.body;

        const updatedDoc = await DocumentInformation.findOneAndUpdate(
            { cap_id: id },
            {
                doc_name,
                doc_address,
                doc_city,
                doc_country,
                doc_phone1,
                doc_phone2,
                doc_phone3,
                doc_faxno,
                cellphone_no_email,
                tracking_no,
                docCenter_name,
                docCenter_address,
                docCenter_city,
                docCenter_country,
                docCenter_phone1,
                docCenter_phone2,
                docCenter_phone3,
                email,
                url,
                other_information,
                cap_id
            },
            { new: true }
        );

        res.status(200).json({ message: "Document information updated successfully", data: updatedDoc });
    } catch (error) {
        console.error("Update Document Error:", error.message);
        res.status(500).json({ message: "Failed to update document information", error: error.message });
    }
};

// Delete Document Information by cap_id
export const deleteDocumentInformation = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDoc = await DocumentInformation.findOneAndDelete({ cap_id: id });

        if (!deletedDoc) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json({ message: "Document deleted successfully", data: deletedDoc });
    } catch (error) {
        console.error("Delete Document Error:", error.message);
        res.status(500).json({ message: "Failed to delete document information", error: error.message });
    }
};
