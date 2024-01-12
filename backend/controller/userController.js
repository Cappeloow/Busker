import generateQRCode from '../services/userService.js'
import User from '../entities/user.js';
import initStripe from '../stripe.js';
import useGoogleCloudStorage from '../utils/useGoogleCloudStorage.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { uploadImage } = useGoogleCloudStorage();


const stripe = initStripe();
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
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                message: err.message,
                type: err.type,
                path: err.path,
                value: err.value,
            }));

            return res.status(400).json({ errors: validationErrors });
        }
        res.status(500).send(error);
    }
}

export async function getSpecificUser(req, res) {
    const userId = req.params.userId;
    User.findOne({ UserId: userId })
        .then(user => {
            if (user) {
                res.setHeader('Content-Type', 'image/jpeg');
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
    const userId = req.user.UserID;
    const user = await User.findOne({ UserId: userId });
    const userOnStripe = await stripe.customers.retrieve(user.stripeId);
    if (user && userOnStripe) {
        await stripe.customers.del(userOnStripe.id);
        user.destroy();
        return res.status(204).send('User was successfully removed');
    }
    return res.status(404).send('User not found');
}

export async function getSpecificUserProfileImg(req, res) {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404);
    }
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(user.ProfileImg);
}

export async function uploadProfileImage(req, res) {
    upload.single('profileImage')(req, res, async (err) => {
        const userId = req.user.UserID;
        const user = await User.findByPk(userId)
        try {
            if (err instanceof multer.MulterError) {
                // Multer error (e.g., file size exceeded)
                return res.status(400).json({ success: false, message: err.message });
            } else if (err) {
                // Other errors
                console.error('Error:', err);
                return res.status(500).json({ success: false, message: 'Server error.' });
            }

            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file provided.' });
            }
            const buffer = req.file.buffer;
            user.ProfileImg = buffer;
            await user.save();
            return res.status(200).json({ success: true, message: 'File uploaded successfully.' });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
    })
}


//Unused function because I change to blob instead of using Clouds 
export async function uploadSingleFile(req, res, next) {
    upload.single('profileImage')(req, res, async (err) => {
        const userId = req.user.UserID;
        const user = await User.findByPk(userId)
        try {
            if (err instanceof multer.MulterError) {
                // Multer error (e.g., file size exceeded)
                return res.status(400).json({ success: false, message: err.message });
            } else if (err) {
                // Other errors
                console.error('Error:', err);
                return res.status(500).json({ success: false, message: 'Server error.' });
            }

            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file provided.' });
            }
            const imageUrl = await uploadImage(req.file);
            await user.save();
            return res.status(200).json({ success: true, message: 'File uploaded successfully.' });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
    });
};
