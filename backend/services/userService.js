import QRCode from 'qrcode';

export default async function generateQRCode(id) {
    try {
        const qrCode = await QRCode.toDataURL(process.env.BUSKER_URL + id);
        return qrCode;
    } catch (error) {
        console.error('Error generating QR code', error);
        return null;
    }
};
