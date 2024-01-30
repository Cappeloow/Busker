import User from '../entities/user.js';
import Link from '../entities/link.js';
export async function createLink(req, res) {
    //get the userId from the logged in user
    const userId = req.user.userId;
    // get the req.body from the frontend
    const { title, url } = req.body;
    try {
        //create a link and send it back.
        const newLink = await Link.create({
            title,
            url,
            userId
        });
        res.status(201).json(newLink);
    } catch (error) {
        // my sequelize validation (validation.js)
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
        //get the param and deconstruct the userId 
        const userId = req.params.userId;
        //find all links associated with the userId and send it to the client
        const links = await Link.findAll({ where: { userId: userId } });
        res.status(200).json(links);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


export async function deleteLink(req, res) {
    // get the logged in userId
    const userId = req.user.userId;
    // get the linkId from reqbody
    const { linkId } = req.body;
    // search for the link in the db if it exists
    const link = await Link.findByPk(linkId);
    if (!link) {
        // link was not found send message back
        return res.status(404).send('Link not found');
    }

    if (link.userId !== userId) {
        // you are not the authorized user, return back message
        return res.status(403).send('Unauthorized');
    }
    // destroy the link and report it back to the client
    await link.destroy();
    res.status(200).json("Link was successfully deleted");
}


export async function clickedOnLink(req, res) {
    // take the linkData from the client (req.body)
    const linkData = req.body;
    try {
        //find the link by private key in the database
        const link = await Link.findByPk(linkData.linkId);
        // add 1+ to the attribute (linkClicks) and save it.
        if (link.userId === linkData.isAuth) {
            return res.status(200).json("Didn't add anything");
        }
        link.linkClicks = link.linkClicks + 1;
        link.save();
        return res.status(200).json("Added one");
    } catch (error) {
        console.log(error);
    }
}

export async function getTotalClicks(req, res) {
    // get the userId from the req.params
    const userId = req.params.userId
    try {
        // find all links associated to the user
        const allLinks = await Link.findAll({ where: { userId: userId } });
        let totalClicks = 0;
        //count totalClicks and return it back to the client
        allLinks.forEach(link => {
            totalClicks += link.linkClicks;
        });
        res.status(200).json({ totalClicks });
    } catch (error) {
        console.error('Error fetching links:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}