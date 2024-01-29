import User from '../entities/user.js';
import Link from '../entities/link.js';
export async function createLink(req, res) {
    const userId = req.user.userId;
    const { title, url } = req.body;
    try {
        const newLink = await Link.create({
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


export async function clickedOnLink(req, res) {
    const linkData = req.body;
    try {
        const link = await Link.findByPk(linkData.linkId);
        link.linkClicks = link.linkClicks + 1;
        link.save();

        return res.status(200).json("Added one");
    } catch (error) {

    }
}

export async function getTotalClicks(req, res) {
    const userId = req.params.userId
    try {
        const allLinks = await Link.findAll({ where: { userId: userId } });
        let totalClicks = 0;
        allLinks.forEach(link => {
            totalClicks += link.linkClicks;
        });

        res.status(200).json({ totalClicks });
    } catch (error) {
        console.error('Error fetching links:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}