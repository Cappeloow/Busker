import generateQRCode from '../services/userService.js'
function sayHello(req, res) {
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
export default sayHello;