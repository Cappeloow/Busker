import Availability from "../entities/availability.js";

export async function createAvailability(req, res) {
    const userId = req.user.UserID;
    const { date, description } = req.body;

    const availabilityExist = await Availability.findOne({ where: { date: date } })
    if (availabilityExist) {
        res.status(404).send("Your are already available on that date.");
        return;
    }

    const availability = await Availability.create({ date: date, description: description, UserID: userId });


    res.status(200).json(availability);
}


export async function getAllAvailabilities(req, res) {
    const id = req.params.id;
    try {
        const availability = await Availability.findAll({ where: { UserID: id } });
        res.status(200).json(availability)
    }
    catch (error) {
        res.status(500).send(error);
    }
}


export async function updateAvailability(req, res) {
    const { availabilityId, description, date, status, bookedDateTime, location } = req.body;

    try {
        const availability = await Availability.findByPk(availabilityId);

        if (!availability) {
            return res.status(404).send("There is no availability with that ID");
        }

        availability.description = description != null ? description : availability.description;
        availability.date = date != null ? date : availability.date;
        availability.status = status != null ? status : availability.status;
        availability.location = location != null ? location : availability.location;
        availability.bookedDateTime = bookedDateTime != null ? bookedDateTime : availability.bookedDateTime;

        await availability.save();

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