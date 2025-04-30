import AdminLogin from "../models/AdminModel.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jp_admin_password = process.env.JP_ADMIN_PASSWORD;
const jp_admin_new_password = process.env.JP_ADMIN_NEW_PASSWORD;


export const adminLogin = async (req, res) => {
        const { username, password } = req.body;    

        if (username && password === jp_admin_password) {
                
                // create Unique id
                let count = await AdminLogin.countDocuments();
                
                // Create new Password 
                let newPassword = jp_admin_new_password;
                
                // create Role
                let role;
                if (username === "admin") {
                        role = "admin"
                } else {
                        role = "user"
                }

                const admin = new AdminLogin({
                        _id : `mongo_generated_id_${count + 1}`,
                        username,
                        password : newPassword, 
                        role  
                        
                });
                
                let newAdmin = await admin.save();
                const token = jwt.sign({ username }, `${process.env.JWT_SECRET}`);
                return res.status(201).json({message : "Admin Login Succesfully" , token , newAdmin});

        } else {
                res.status(401).json({ message: 'Invalid credentials' });
        }
}
