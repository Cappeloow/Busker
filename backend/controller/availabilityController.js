import { where } from "sequelize";
import Availability from "../entities/availability.js";

export async function createAvailability(req, res) {
    const userId = req.user.userId;
    const { date, description } = req.body;
    const availabilityExist = await Availability.findOne({ where: { date: date, userId: userId } });
    if (availabilityExist) {
        return res.status(403).json({ message: "You are already avaiable at that date" })
    }

    try {

        const availability = await Availability.create({ date: date, description: description, userId: userId });

        res.status(200).json(availability);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                message: err.message,
                type: err.type,
                path: err.path,
                value: err.value,
            }));

            return res.status(400).json({ errors: validationErrors });
        }


    }
}


export async function getAllAvailabilities(req, res) {
    const id = req.params.id;
    try {
        const availability = await Availability.findAll({ where: { userId: id } });
        res.status(200).json(availability)
    }
    catch (error) {
        res.status(500).send(error);
    }
}


export async function updateAvailability(req, res) {
    const userId = req.user.userId;
    const { availabilityId, description, date, status, bookedDateTime, location } = req.body;
    try {
        // Find the availability with the specified ID and user
        const availability = await Availability.findOne({ where: { availabilityId: availabilityId, userId: userId } });

        // Check if the availability with the specified ID exists
        if (!availability) {
            return res.status(404).json({ message: "There is no availability with that ID" });
        }

        // Check if there is any existing availability with the new date for the user
        const existingAvailability = await Availability.findOne({ where: { date, userId: userId } });

        // If an availability for the new date already exists, return an error response
        if (existingAvailability) {
            return res.status(400).json({ error: 'Availability for this date already exists. Please pick a different date.' });
        }

        // Update the availability with the provided information
        availability.description = description != null ? description : availability.description;
        availability.date = date != null ? date : availability.date;
        availability.status = status != null ? status : availability.status;
        availability.location = location != null ? location : availability.location;
        availability.bookedDateTime = bookedDateTime != null ? bookedDateTime : availability.bookedDateTime;

        // Save the updated availability
        await availability.save();

        // Return the updated availability in the response
        res.status(200).json(availability);
    } catch (error) {
        // Check if the error is a Sequelize validation error
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                message: err.message,
                type: err.type,
                path: err.path,
                value: err.value,
            }));

            return res.status(400).json({ errors: validationErrors });
        }

        // If it's not a validation error, handle it accordingly
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}