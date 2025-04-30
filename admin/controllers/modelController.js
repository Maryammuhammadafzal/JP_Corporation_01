// import CarModel from "../models/CarModel.js";
// import verifyToken from "../middlewares/tokenVerify.js";

import Model from "../models/ModalModel.js";

// Get All Modal
export const getModal =  async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;

        const getModal = await Model.find().sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);

        res.json(getModal);
};


// // Get Modal by id
// export const getModalById = async (req, res) => {
//         const id = req.params.id;
//         console.log(id);
        
//         try {
//             const modal = await Modal.findById(id);     
        
//             if (!modal) {
//               return res.status(404).json({ message: "modal not found" });
//             }
        
//             res.status(200).json(modal);
//           } catch (error) {
//             console.error("Error fetching modal by ID:", error);
//             res.status(500).json({ message: "Server error" });
//           }
//     };

//     // Get Modal By Make
// export const getModalByMake = async (req, res) => {
//   try {
//     const make = req.params.modalMake;
//     console.log("Make" , make);
  
//     const getModalByMake = await Modal.find({ modalMake : make});     
        
//             if (!getModalByMake) {
//               return res.status(404).json({ message: "modal not found" });
//             }

//             console.log(getModalByMake);
            
        
//             res.status(200).json(getModalByMake);
//           } catch (error) {
//             console.error("Error fetching modal by Make:", error);
//             res.status(500).json({ message: "Server error" });
//           }
//     };
    
//     // Delete Modal
// export const deleteModal =  async (req, res) => {
//         const id = req.params.id;
//         console.log(id);
        
    
//         try {
//             const deletedModal = await Modal.findByIdAndDelete(id);
    
//             if (!deletedModal) {
//                 return res.status(404).json({ message: "Car not found" });
//             }
    
//             res.json({ message: "Car deleted successfully", data: deletedModal });
//         } catch (err) {
//             res.status(400).json({ message: "Failed to delete car", error: err.message });
//         }
//     };

//     export const addModal = async (req, res) => {
//         try {
//           const { modalMake, modalTitle } = req.body;  
//           console.log(modalMake, modalTitle);  
      
//           if (!modalMake || !modalTitle) {
//             return res.status(400).json({ message: "All fields are required" });
//           }
      
//           const newModal = new Modal({
//             modalMake,
//             modalTitle
//           });
      
//           await newModal.save();
//           res.status(201).json(newModal);
//         } catch (error) {
//           console.error("Error adding car:", error);
//           res.status(500).json({ message: "Server Error" });
//         }
//       };


//       export const updateModal = async (req, res) => {
//         const id = req.params.id;
//         console.log("ID:", id);
//         try {
  
//           let { modalTitle , modalMake } = req.body
//           console.log(modalMake , modalTitle);

//           const updateModal = await Modal.findByIdAndUpdate(id, { modalTitle , modalMake }, { new: true });

//           if (!updateModal) {
//             return res.status(404).json({ message: 'Modal not found' });
//           }
          
//           res.status(200).json({
//             message: 'Modal updated successfully',
//             car: updateModal,
//           });
          
//         }  catch (error) {
//           console.error(error);
//           res.status(500).json({ message: 'Server error' });
//           }
//       };