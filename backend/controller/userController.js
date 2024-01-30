import generateQRCode from '../services/userService.js'
import User from '../entities/user.js';
import initStripe from '../stripe.js';
import useGoogleCloudStorage from '../utils/useGoogleCloudStorage.js';
import multer from 'multer';
import Link from '../entities/link.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// my function for uploading picture to the cloud (Not using anymore because google cloud storage costs after certain days).
const { uploadImage } = useGoogleCloudStorage();

//initate stripe
const stripe = initStripe();
// test
export default function sayHello(req, res) {
    res.send('Hello Dude!');
}

export async function getUserQRCode(req, res) {
    // get the userId from the params
    const userId = req.params.userId;
    // generate the QR code 
    const userQRCode = await generateQRCode(userId);
    if (userQRCode) {
        // send it back to the client
        res.status(200).json(userQRCode);
    } else {
        res.status(500).send('Error generating QR code');
    }
}

export async function updateUserDetails(req, res) {
    // get the authorized user and the information user sends with req.body
    const authUser = req.user;
    const userDetails = req.body;

    try {
        //first off find the user by Pk
        const user = await User.findByPk(authUser.userId);
        if (user) {
            // if it was found we look if there is any data in the req.body, and we insert the new information if it's not a empty string/null
            user.artistName = userDetails.artistName != null ? userDetails.artistName : user.artistName;
            user.country = userDetails.country != null ? userDetails.country : user.country;
            user.city = userDetails.city != null ? userDetails.city : user.city;

            await user.save();
            res.status(200).send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        // (validation.js)
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
    /// get the userId from params
    const userId = req.params.userId;

    try {
        // find the user
        const user = await User.findByPk(userId);

        if (user) {
            // take the information we want to display (this case I removed some unneccessary data such as img and stuff)
            const { country, city, email, artistName, userId } = user.dataValues;
            const responseData = { userId, country, city, email, artistName };
            res.status(200).json(responseData);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getAllUsers(req, res) {
    try {
        // recieve all the users in the db 
        const users = await User.findAll();
        // reconstruct
        const simplifiedUsers = await Promise.all(users.map(async (user) => {
            // get all links associated with the user
            const links = await Link.findAll({ where: { userId: user.userId } });

            // Using reduce to calculate totalClicks
            const totalClicks = links.reduce((sum, link) => sum + link.linkClicks, 0);
            // return the userData 
            return {
                userId: user.userId,
                artistName: user.artistName,
                linkClicks: totalClicks,
            };
        }));
        // sort it by the most linkClicks on the top
        const sortedUsers = simplifiedUsers.slice().sort((a, b) => b.linkClicks - a.linkClicks);

        res.status(200).send(sortedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function unregisterUser(req, res) {
    // find the authorized user
    const userId = req.user.userId;
    const user = await User.findOne({ userId: userId });
    // retrieve the user on stripe too
    const userOnStripe = await stripe.customers.retrieve(user.stripeId);
    if (user && userOnStripe) {
        // if both exists we delete the user in the db and on stripe dashboard
        await stripe.customers.del(userOnStripe.id);
        user.destroy();
        return res.status(204).send('User was successfully removed');
    }
    return res.status(404).send('User not found');
}

export async function getSpecificUserProfileImg(req, res) {
    try {
        // get the userId and find the user by pk
        const id = req.params.userId;
        const user = await User.findByPk(id);

        if (!user) {
            // If user doesn't exist, you can choose to handle it differently
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.profileImg === null) {
            // If user exists but has no profile image, you can handle it differently
            return res.status(404).json({ error: 'User has no profile image' });
        }

        // If user exists and has a profile image, send the image
        res.setHeader('Content-Type', 'image/jpeg');
        res.status(200).send(user.profileImg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function uploadProfileImage(req, res) {
    //used to upload one file
    upload.single('profileImage')(req, res, async (err) => {
        // get the authorized user and find it by pk
        const userId = req.user.userId;
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
            // No file provided > error
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file provided.' });
            }
            // buffer the file into blobs and add it the profileImage (stored as binary) and save it
            const buffer = req.file.buffer;
            user.profileImg = buffer;
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
        const userId = req.user.userId;
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
