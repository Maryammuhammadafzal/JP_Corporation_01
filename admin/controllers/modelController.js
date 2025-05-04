
import Model from "../models/ModalModel.js";

// Get All Modal
export const getModal = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;

  const getModal = await Model.find().sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(getModal);
};


// Get Modal by id
export const getModalById = async (req, res) => {
  const id = req.params.id;

  try {
    const modal = await Model.findById(id);

    if (!modal) {
      return res.status(404).json({ message: "modal not found" });
    }

    res.status(200).json({ message: "Get Modal By Id", data: modal });

  } catch (error) {
   
    res.status(500).json({ message: "Server error" });
  }
};

// Get Modal By Make
export const getModalByMake = async (req, res) => {
  try {

    const make = req.params.makeId;

    const get_modal_by_make = await Model.find({ make_id: make });

    if (!get_modal_by_make) {
      return res.status(404).json({ message: "modal not found" });
    }

    res.status(200).json(get_modal_by_make);

  } catch (error) {

    res.status(500).json({ message: "Server error" });
  }
};

// Delete Modal
export const deleteModal = async (req, res) => {
  const id = req.params.id;
  console.log(id);


  try {
    const deletedModal = await Model.findByIdAndDelete(id);

    if (!deletedModal) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully", data: deletedModal });

  } catch (err) {
    
    res.status(400).json({ message: "Failed to delete car", error: err.message });
  }
};

export const addModal = async (req, res) => {
  try {

    const { make_id, model } = req.body;

    if (!make_id || !model) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const count = await Model.countDocuments();

    const new_modal = new Model({
      model_id: count + 1,
      model,
      make_id
    });

    await new_modal.save();
    console.log(new_modal);

    res.status(201).json({ message: "Added Model", data: new_modal });

  } catch (error) {

    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


//  Update Modal
export const updateModal = async (req, res) => {
  const id = req.params.id;

  try {

    let { model, make_id, model_id } = req.body

    const updateModal = await Model.findByIdAndUpdate(
      id,
      { model, make_id, model_id },
      { new: true }
    );

    if (!updateModal) {
      return res.status(404).json({ message: 'Modal not found' });
    }

    res.status(200).json({
      message: 'Modal updated successfully',
      car: updateModal,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};