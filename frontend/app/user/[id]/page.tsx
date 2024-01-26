import { BUSKER_BACKEND_URL, getUserImg } from "@/app/services/services";
import LinkSection from "@/_components/UserProfile/LinkSection";
import Link from "next/link";
import Image from "next/image";
import Calender from "@/_components/UserProfile/Calender";
import ImageComponent from "@/_components/UserProfile/ImageComponent";
import { authStatus } from "@/app/services/SSRAuth";

// {/* @ts-expect-error Server Component */}
export default async function Page({ params }: { params: { id: string } }) {
  const {id} = params;
  const isAuth = await authStatus();
  const url = await getUserImg(id); 
  if (url) URL.revokeObjectURL(url);
  return (
    <main>
      <ImageComponent id={id}/>
      <Image src={url} alt="test" width={500} height={500} />
      <Link href={`/user/${id}/my-qr`}>
        <button>MY QR </button>
      </Link>
       {/* @ts-expect-error Server Component */}
      <LinkSection isAuth={isAuth?.userId} userId={id}/>
       {/* @ts-expect-error Server Component */}
      <Calender  isAuth={isAuth?.userId} userId={id}/>
    </main>)
  }