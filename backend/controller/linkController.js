import Link from '../entities/link.js';

export async function createLink(req, res) {
    const userId = req.params.userId;
    console.log("userId:", userId);
    try {
        const newLink = await Link.create({
            Icon: "FB",
            Title: "FACEBOOK",
            URL: "https://example.com",
            UserID: userId
        });
        console.log("newLinks:", newLink)
        console.log('New link created:', newLink);
        res.status(201).json(newLink);
    } catch (error) {
        console.error('Error creating link:', error);
        res.status(500).send('Internal Server Error');
    }
}

export async function getAllLinks(req, res) {
    try {
        const links = await Link.findAll();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

