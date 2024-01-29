// check if the user is authenticated
export default function auth(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}