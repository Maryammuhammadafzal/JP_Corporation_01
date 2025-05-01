import Make from "../models/MakeModel.js";
import verifyToken from "../middlewares/tokenVerify.js";

export const addMake =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}
export const getMake =  async (req, res) => {
        console.log("running");
        
        try {
            let get_all_make = await Make.find();

            res.status(200).json({message : "Success" , data : get_all_make});
        } catch (error) {
                res.status(400).json({message : "Failed" , error : error.message});
        }
}
export const updateMake =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}
export const deleteMake =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}