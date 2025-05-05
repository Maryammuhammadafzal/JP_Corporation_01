import { log } from "console";
import CarListing from "../models/CarListingModel.js";

export const addCarListing = async (req, res) => {

        let admin = req.user.username;
        try {
                let {
                        title,
                        condition,
                        type,
                        makeID,
                        modelID,
                        price,
                        year,
                        drive_type,
                        transmission,
                        fuel_type,
                        mileage,
                        engine_size,
                        cylinders,
                        color,
                        doors,
                        vin,
                        availability,
                        description,
                        features,
                        safety_features
                } = req.body;


                // Check All Inputs
                if (!availability || !vin || !doors || !color || !engine_size || !mileage || !fuel_type || !transmission || !drive_type || !year || !price || !modelID || !makeID || !type || !condition || !title) {
                        return res.status(400).json("All Feilds are required");
                }

                // Check Files
                if (!req.file || Object.keys(req.file).length === 0) {
                        return res.status(400).json({ errors: "No file uploaded" });


                }

                // Check File Format
                const allowedFileFormat = ["image/png", "image/jpg", "image/jpeg"];
                if (!allowedFileFormat.includes(req.file.mimetype)) {
                        return res.status(400).json({ errors: "Invalid File Format . Only png , jpg & jpeg are allowed" })
                }

                // Get File Name
                const featuredImagePath = req.file.filename;
                console.log(featuredImagePath);

                // Count All Documents
                const count = await CarListing.countDocuments();

                // Create New Car Listing Object
                const new_car_listing = new CarListing({
                        list_id: count + 1,
                        title,
                        condition,
                        type,
                        makeID,
                        modelID,
                        price,
                        year,
                        drive_type,
                        transmission,
                        fuel_type,
                        mileage,
                        engine_size,
                        cylinders,
                        color,
                        doors,
                        vin,
                        availability,
                        description,
                        features,
                        safety_features,
                        status: count + 1,
                        uploaded_by: admin,
                        featured_image: featuredImagePath

                });

                // Add New Car Listing Object
                const add_car_listing = await new_car_listing.save();
                console.log("Added Car Listing", add_car_listing);
                res.status(200).json({ message: "Added Car Listing", data: add_car_listing });

        } catch (error) {
                console.log(error.message);

                res.status(400).json({ message: "Invalid Credentials", error: error.message });
        }
}
export const getCarListing = async (req, res) => {

        try {

                // const page = parseInt(req.query.page || 1);
                // const limit = parseInt(req.query.limit || 100);

                // Get All Car Listing 
                const get_car_listing_data = await CarListing.find()
                        .sort({ created_at: -1 })
                // .skip((page - 1) * limit)
                // .limit(limit);

                res.status(200).json({ message: "Success", data: get_car_listing_data });
        } catch (error) {

                res.status(400).json({ message: "Invalid Credentials", error });
        }


}
export const getCarListingById = async (req, res) => {
        const { id } = req.params;

        try {
                const get_car_listing_data_by_id = await CarListing.findById(id);

                res.status(200).json({ message: "Success", data: get_car_listing_data_by_id });
        } catch (error) {

                res.status(400).json({ message: "Invalid Credentials", error });
        }


}
export const updateCarListing = async (req, res) => {
        try {
                const { id } = req.params;

                if (!id) {
                        res.status(400).json("Id Not Found");
                }

                const {
                        title,
                        condition,
                        type,
                        makeID,
                        modelID,
                        price,
                        year,
                        drive_type,
                        transmission,
                        fuel_type,
                        mileage,
                        engine_size,
                        cylinders,
                        color,
                        doors,
                        vin,
                        availability,
                        description,
                        features,
                        safety_features,
                        featured_image
                } = req.body

                console.log("Body", req.body);

                // Check All Inputs
                if (!availability || !vin || !doors || !color || !engine_size || !mileage || !fuel_type || !transmission || !drive_type || !year || !price || !modelID || !makeID || !type || !condition || !title || !cylinders) {
                        console.log(("All Feilds are required"));
                        return res.status(400).json("All Feilds are required");

                }


                let featuredImagePath;

                const file = req.file;
                console.log(file);


                // Check Files
                if (!file || Object.keys(file).length === 0) {
                        featuredImagePath = featured_image;
                        console.log("get", featuredImagePath);

                }

                if (file) {
                        // Check File Format
                        const allowedFileFormat = ["image/png", "image/jpg", "image/jpeg"];
                        if (!allowedFileFormat.includes(req.file.mimetype)) {
                                console.log("invalid file");

                                return res.status(400).json({ errors: "Invalid File Format . Only png , jpg & jpeg are allowed" })
                        }

                        // Get File Name
                        featuredImagePath = req.file.filename;
                        console.log("File get", featuredImagePath);
                }


                // Update Car Listing Object
                const update_car_listing = await CarListing.findByIdAndUpdate(
                        id,
                        {
                                title,
                                condition,
                                type,
                                makeID,
                                modelID,
                                price,
                                year,
                                drive_type,
                                transmission,
                                fuel_type,
                                mileage,
                                engine_size,
                                cylinders,
                                color,
                                doors,
                                vin,
                                availability,
                                description,
                                features,
                                safety_features,
                                featured_image: featuredImagePath
                        },
                        { new: true }
                );

                if (!update_car_listing) {
                        console.log("Car listing Not Updated");

                        res.status(400).json("Car listing Not Updated");
                }

                console.log(update_car_listing)
                res.status(200).json({ message: "Car Listing updated Successfully", data: update_car_listing });

        } catch (error) {
                console.log("Update Car Listing Error", error.message);

                res.status(400).json({ message: "Failed To update Car Listing", error: error.message });

        }
}
export const deleteCarListing = async (req, res) => {

        const { id } = req.params;

        try {
                const delete_car_listing = await CarListing.findByIdAndDelete(id);

                if (!delete_car_listing) {
                        console.log("not Found");

                        return res.status(404).json({ message: "Car Listing not found" });
                }
                res.status(200).json({ message: "Car Listing deleted Succesfully", data: delete_car_listing })

        } catch (error) {
                console.log(error.message);
                res.status(400).json({ message: "Failed Deleting Car", error: error.message })


        }
}