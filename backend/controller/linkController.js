import User from '../entities/user.js';
import Link from '../entities/link.js';
export async function createLink(req, res) {
    const userId = req.user.UserID;
    const { Icon, Title, URL } = req.body;
    try {
        const newLink = await Link.create({
            Icon: Icon,
            Title: Title,
            URL: URL,
            UserID: userId
        });
        res.status(201).json(newLink);
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


export async function deleteLink(req, res) {
    const { linkId, userId } = req.body;

    const link = await Link.findByPk(linkId);
    if (!link) {
        return res.status(404).send('Link not found');
    }

    if (link.UserID !== userId) {
        return res.status(403).send('Unauthorized');
    }

    await link.destroy();
    res.status(200).json("Link was successfully deleted");
}


