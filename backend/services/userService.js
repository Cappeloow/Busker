import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

export default async function generateQRCode(id) {
    const userURL = process.env.BUSKER_URL + id;
    const canvas = createCanvas(300, 300);

    try {
        const qrOptions = {
            errorCorrectionLevel: 'H',
            margin: 4, // Border size (adjust as needed)
            color: {
                dark: '#00CED1', // Dark color (Turquoise)
                light: '#33FF57' // Light color (Green)
            }
        };

        await QRCode.toCanvas(canvas, userURL, qrOptions);

        const icon = await loadImage('./icons/music-player.png');
        const x = (canvas.width - icon.width) / 2;
        const y = (canvas.height - icon.height) / 2;

        const context = canvas.getContext('2d');
        context.drawImage(icon, x, y);

        const base64Image = canvas.toDataURL('image/png');
        return base64Image;
    } catch (error) {
        console.error('Error generating QR code', error);
        return null;
    }
}

