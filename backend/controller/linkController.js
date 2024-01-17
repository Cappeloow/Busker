import User from '../entities/user.js';
import Link from '../entities/link.js';
export async function createLink(req, res) {
    const userId = req.user.userId;
    const { icon, title, url } = req.body;
    try {
        const newLink = await Link.create({
            icon,
            title,
            url,
            userId
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
        const userId = req.params.userId;
        const links = await Link.findAll({ where: { userId: userId } });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


export async function deleteLink(req, res) {
    const userId = req.user.userId;
    const { linkId } = req.body;

    const link = await Link.findByPk(linkId);
    if (!link) {
        return res.status(404).send('Link not found');
    }

    if (link.userId !== userId) {
        return res.status(403).send('Unauthorized');
    }

    await link.destroy();
    res.status(200).json("Link was successfully deleted");
}


