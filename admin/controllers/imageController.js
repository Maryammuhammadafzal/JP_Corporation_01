import Image from "../models/ImageModel.js";
import verifyToken from "../middlewares/tokenVerify.js";

export const addImage =  async (req, res) => {
        try {
                const { list_id } = req.body ;
                console.log(list_id);
                 
                const files = req.files;
            console.log(files);
            
                const images = files.map(file => ({ list_id, image_url: `/uploads/gallery_images/${file.filename}`,  }));
            
                await GalleryImage.insertMany(images);
                res.status(200).json({ message: "Gallery images uploaded successfully" });
              } catch (err) {
                res.status(500).json({ error: err.message });
              }
}
export const getImage =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}
export const updateImage =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}
export const deleteImage =  async (req, res) => {
        try {
            
        } catch (error) {
                
        }
}