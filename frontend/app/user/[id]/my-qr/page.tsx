import QrCodeImage from '@/_components/MyQr/QrCodeImage'
import GoToStoreButton from '@/_components/MyQr/GoToStoreButton'
import { authStatus } from '@/app/services/SSRAuth'
type Props = {}

export default async function Page({ params }: { params: { id: string } }) {
    const {id} = params;
    const isAuth = await authStatus();
  return (
    <main>
      <QrCodeImage id={id}/>
      { isAuth?.userId === id && <GoToStoreButton/>}
    </main>
  )
}
