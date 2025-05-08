import Status from "../models/StatusModel.js";

// Add Status
export const addStatus = async (req, res) => {
  try {
    const {
      cap_available,
      reflect_document,
      booking_department,
      uploaded_export,
      arranging_whole,
      further_preparation,
      preshipment_inspection,
      allocated_a_vessel,
      reflect_shipping,
      uploaded_invoice,
      confirmed_loading,
      uploaded_bl,
      proofread_bl,
      completed_reflect,
      sent_out_bl,
      cap_id
    } = req.body;

    if (!cap_id) {
      return res.status(400).json({ message: "cap_id is required" });
    }

    const newStatus = await Status.create({
      cap_available,
      reflect_document,
      booking_department,
      uploaded_export,
      arranging_whole,
      further_preparation,
      preshipment_inspection,
      allocated_a_vessel,
      reflect_shipping,
      uploaded_invoice,
      confirmed_loading,
      uploaded_bl,
      proofread_bl,
      completed_reflect,
      sent_out_bl,
      cap_id
    });

    res.status(200).json({ message: "Status created successfully", data: newStatus });
  } catch (error) {
    console.error("Add Status Error:", error.message);
    res.status(500).json({ message: "Failed to add status", error: error.message });
  }
};

// Get Status by cap_id
export const getStatus = async (req, res) => {
  try {
    const { cap_id } = req.params;

    const status = await Status.findOne({ cap_id: parseInt(cap_id) });

    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }

    res.status(200).json({ message: "Status fetched successfully", data: status });
  } catch (error) {
    console.error("Get Status Error:", error.message);
    res.status(500).json({ message: "Failed to get status", error: error.message });
  }
};

// Update Status by cap_id
export const updateStatus = async (req, res) => {
  try {
    const { cap_id } = req.params;

    const updatedStatus = await Status.findOneAndUpdate(
      { cap_id: parseInt(cap_id) },
      { $set: req.body },
      { new: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({ message: "Status not found for update" });
    }

    res.status(200).json({ message: "Status updated successfully", data: updatedStatus });
  } catch (error) {
    console.error("Update Status Error:", error.message);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

// Delete Status by cap_id
export const deleteStatus = async (req, res) => {
  try {
    const { cap_id } = req.params;

    const deletedStatus = await Status.findOneAndDelete({ cap_id: parseInt(cap_id) });

    if (!deletedStatus) {
      return res.status(404).json({ message: "Status not found for deletion" });
    }

    res.status(200).json({ message: "Status deleted successfully", data: deletedStatus });
  } catch (error) {
    console.error("Delete Status Error:", error.message);
    res.status(500).json({ message: "Failed to delete status", error: error.message });
  }
};
