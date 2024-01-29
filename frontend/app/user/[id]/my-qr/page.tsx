import QrCodeImage from '@/_components/MyQr/QrCodeImage'
import GoToStoreButton from '@/_components/MyQr/GoToStoreButton'
import { authStatus } from '@/app/services/SSRAuth'
type Props = {}

//displaying the QR and the store btn if (auth)
export default async function Page({ params }: { params: { id: string } }) {
    const {id} = params;
    const isAuth = await authStatus();
  return (
    <main className='myqr-main'>
  {/* @ts-expect-error Server Component */}
      <QrCodeImage id={id}/>
      { isAuth?.userId === id && <GoToStoreButton />}
    </main>
  )
}
