// import Car from "../models/CarModel.js";
// import verifyToken from "../middlewares/tokenVerify.js";

// // Get All Car
// export const getCars =  async (req, res) => {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 100;

//         const getCar = await Car.find().sort({ createdAt: -1 })
//                 .skip((page - 1) * limit)
//                 .limit(limit);

//         res.json(getCar);
// };


// // Get Car by id
// export const getCarById = async (req, res) => {
//         const id = req.params.id;
//         console.log("dashboardEditId" , id);
        
//         try {
//             const car = await Car.findById(id);     
        
//             if (!car) {
//               return res.status(404).json({ message: "Car not found" });
//             }
        
//             res.status(200).json(car);
//           } catch (error) {
//             console.error("Error fetching car by ID:", error);
//             res.status(500).json({ message: "Server error" });
//           }
//     };
    
//     // Delete Car
// export const deleteCar =  async (req, res) => {
//         const id = req.params.id;
//         console.log(id);
        
    
//         try {
//             const deletedCar = await Car.findByIdAndDelete(id);
    
//             if (!deletedCar) {
//                 return res.status(404).json({ message: "Car not found" });
//             }
    
//             res.json({ message: "Car deleted successfully", data: deletedCar });
//         } catch (err) {
//             res.status(400).json({ message: "Failed to delete car", error: err.message });
//         }
//     };