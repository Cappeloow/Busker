import { BUSKER_BACKEND_URL, getUserById, getUserImg } from "@/app/services/services";
import LinkSection from "@/_components/UserProfile/LinkSection";
import Link from "next/link";
import Calender from "@/_components/UserProfile/Calender";
import ImageComponent from "@/_components/UserProfile/ImageComponent";
import { authStatus } from "@/app/services/SSRAuth";
import { MdQrCodeScanner } from "react-icons/md";
import UserDetailsComponent from "@/_components/UserProfile/UserDetailsComponent";
// {/* @ts-expect-error Server Component */}
export default async function Page({ params }: { params: { id: string } }) {
  const {id} = params;
  const user = await getUserById(id);
  const isAuth = await authStatus();
  const url = await getUserImg(id); 
  if (url) URL.revokeObjectURL(url);
  return (
    <main className="userprofile-main">
      <ImageComponent height={350} width={350} id={id} isAuth={isAuth?.userId}/>
      <Link href={`/user/${id}/my-qr`}>
        <MdQrCodeScanner className="QR_code_icon"/>
      </Link>
        {/* @ts-expect-error Server Component */}
      <UserDetailsComponent isAuth={isAuth?.userId} userId={id} user={user}/>
       {/* @ts-expect-error Server Component */}
      <LinkSection isAuth={isAuth?.userId} userId={id}/>
       {/* @ts-expect-error Server Component */}
      <Calender  isAuth={isAuth?.userId} userId={id}/>
    </main>)
  }