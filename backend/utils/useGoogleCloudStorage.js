import { Storage } from '@google-cloud/storage'
import User from '../entities/user.js';
import fs from 'fs';
function useGoogleCloudStorage() {

    // Initiate my Google Cloud Storage and find the bucket where we can store the images.
    const storage = new Storage({
        keyFilename: process.env.GOOGLE_CLOUD_KEYFILENAME,// Replace with your keyfile path
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, // Replace with your Google Cloud project ID
    });
    const bucket = storage.bucket('busker_images');


    // Uploading images to the Google Cloud (file is needed)
    async function uploadImage(file) {
        try {
            const filename = file.originalname; // You can modify this based on your needs
            const gcsFile = bucket.file(filename);
            const stream = gcsFile.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            stream.end(file.buffer);

            return new Promise((resolve, reject) => {
                stream.on('finish', () => {
                    resolve(`https://storage.googleapis.com/${bucket.name}/${filename}`);
                });

                stream.on('error', (err) => {
                    reject(err);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    //Retrieve a Users Profile Image in this case from Google Clouds Platforms, We put it in the folder where we can store images for several users so we dont have to download it everytime
    async function retrieveImage(req, res) {

        const id = req.params.userId;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
        }
        const ProfileImg = user.ProfileImg;
        const localDirectoryPath = './profile-images';
        const localFilePath = `${localDirectoryPath}/${ProfileImg}`;

        try {
            if (fs.existsSync(localFilePath)) {
                // If the file exists, log a message and skip download
                res.status(200).json({ success: true, message: 'Local copy exists. Skipping download.' });
            } else {
                // Create a readable stream of the file from Google Cloud Storage
                const file = bucket.file(ProfileImg);
                const fileStream = file.createReadStream();

                // Create a writable stream to save the file locally
                const writeStream = fs.createWriteStream(localFilePath);

                // Pipe the read stream to the write stream
                fileStream.pipe(writeStream);

                // Wait for the write stream to finish
                await new Promise((resolve, reject) => {
                    writeStream.on('finish', resolve);
                    writeStream.on('error', reject);
                });
                res.status(200).json({ success: true, message: 'Image downloaded successfully.' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }


    return { uploadImage, retrieveImage };
}

export default useGoogleCloudStorage;
