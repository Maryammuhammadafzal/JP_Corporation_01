import DocumentInformation from "../models/DocumentInformationModel.js";

export const addDocumentInformation = async (req, res) => {
        try {
                const { doc_name, doc_address, doc_city, doc_country, doc_phone1, doc_phone2, doc_phone3, doc_faxno, cellphone_no_email, tracking_no, docCenter_name, docCenter_address, docCenter_city, docCenter_country, docCenter_phone1, docCenter_phone2, docCenter_phone3, email, url, other_information, cap_id } = req.body;


                if (!cap_id) {
                        console.log("Document id not Found");
                        return res.status(400).json({ message: "cap_id is required" });

                }

                // Create new Cap
                const new_document_information = await DocumentInformation.create({
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
export const getDocumentInformation = async (req, res) => {
        try {

                const page = parseInt(req.query.page || 1);
                const limit = parseInt(req.query.limit || 100);

                // Get All Car Listing 
                const get_document_data = await DocumentInformation.find()
                        .sort({ created_at: -1 })
                        .skip((page - 1) * limit)
                        .limit(limit);

                res.status(200).json({ message: "Success", data: get_document_data });
        } catch (error) {
                console.log(error.message);

                res.status(400).json({ message: "Invalid Credentials", error });
        }

}
export const updateDocumentInformation = async (req, res) => {
        try {

        } catch (error) {

        }
}
export const deleteDocumentInformation = async (req, res) => {
          const { id } = req.params;

        try {
                const delete_document = await DocumentInformation.findOneAndDelete({cap_id : id});

                if (!delete_document) {
                        console.log("not Found");

                        return res.status(404).json({ message: "Car Listing not found" });
                }
                res.status(200).json({ message: "Car Listing deleted Succesfully", data: delete_document })

        } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: "Failed Deleting Car", error: error.message })


        }
}