import { generateQRCode } from '@/app/services/services';
type Props = {
  id:string
}

const QrCodeImage = async (props: Props) => {
  const {id} = props;
  const data = await generateQRCode(id);

    return (
      <div className='my_qr_div'>
        {data && (
          <img
            src={`${data}`}
            alt="QR Code"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        )}
      </div>
    );
  };

export default QrCodeImage