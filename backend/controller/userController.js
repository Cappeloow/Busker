import generateQRCode from '../services/userService.js'
import User from '../entities/user.js';
export default function sayHello(req, res) {
    res.send('Hello Dude!');
}

export async function getUserQRCode(req, res) {
    const userId = req.params.userId;
    const userQRCode = await generateQRCode(userId);
    if (userQRCode) {
        res.send(`<img src="${userQRCode}" alt="User QR Code">`);
    } else {
        res.status(500).send('Error generating QR code');
    }
}

export async function updateUserDetails(req, res) {
    const userId = req.params.userId;
    const userDetails = req.body;
    try {
        const user = await User.findOne({ UserId: userId });
        if (user) {
            user.ArtistName = userDetails.artistName != null ? userDetails.artistName : user.ArtistName;
            user.Country = userDetails.country != null ? userDetails.country : user.Country;
            user.ProfileImg = userDetails.profileImg != null ? userDetails.profileImg : user.ProfileImg;
            user.City = userDetails.city != null ? userDetails.city : user.City;

            await user.save();
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getSpecificUser(req, res) {

    const userId = req.params.userId;
    User.findOne({ UserId: userId })
        .then(user => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

export async function getAllUsers(req, res) {
    const users = await User.findAll();
    res.status(200).send(users);
}

export async function unregisterUser(req, res) {
    const userId = req.body.userId;
    const user = await User.findOne({ UserId: userId });

    if (user) {
        user.destroy();
        return res.status(204).send('User was successfully removed');
    }
    return res.status(404).send('User not found');
}