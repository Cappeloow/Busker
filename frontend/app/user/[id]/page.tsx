
import {authStatus } from "../../services/services";
import LinkSection from "@/_components/UserProfile/LinkSection";
import Link from "next/link";
import Image from "next/image";
import Calender from "@/_components/UserProfile/Calender";
// {/* @ts-expect-error Server Component */}
export default function Page({ params }: { params: { id: string } }) {
  const {id} = params;
  return (
    <main>
      <Link href={`/user/${id}/my-qr`}>
        MY QR
      </Link>
      <div>
        My Page
      </div>
       {/* @ts-expect-error Server Component */}
      <LinkSection userId={id}/>
       {/* @ts-expect-error Server Component */}
      <Calender userId={id}/>
    </main>)
  }