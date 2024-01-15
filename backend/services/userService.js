import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
export default async function generateQRCode(id) {
    const userURL = process.env.BUSKER_URL + id;
    const canvas = createCanvas(300, 300);
    try {
        await QRCode.toCanvas(canvas, userURL, { errorCorrectionLevel: 'H' });
        const icon = await loadImage('./icons/music-player.png');
        console.log(icon);
        const x = (canvas.width - icon.width) / 2
        const y = (canvas.height - icon.height) / 2
        const context = canvas.getContext('2d');
        context.drawImage(icon, x, y);
        const base64Image = canvas.toDataURL('image/png');
        return base64Image;
    } catch (error) {
        console.error('Error generating QR code', error);
        return null;
    }
};
