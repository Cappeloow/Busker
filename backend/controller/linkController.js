import User from '../entities/user.js';
import Link from '../entities/link.js';
export async function createLink(req, res) {
    const { userId, Icon, Title, URL } = req.body;
    try {
        const newLink = await Link.create({
            Icon: Icon,
            Title: Title,
            URL: URL,
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
        const userId = req.body.userId;
        const links = await Link.findAll({ where: { UserID: userId } });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

