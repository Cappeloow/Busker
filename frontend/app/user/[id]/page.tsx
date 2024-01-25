import { BUSKER_BACKEND_URL } from "@/app/services/services";
import LinkSection from "@/_components/UserProfile/LinkSection";
import Link from "next/link";
import Image from "next/image";
import Calender from "@/_components/UserProfile/Calender";
import { cookies, headers } from "next/headers";

import { authStatus } from "@/app/services/SSRAuth";

// {/* @ts-expect-error Server Component */}
export default async function Page({ params }: { params: { id: string } }) {
  const {id} = params;
  const isAuth = await authStatus();
  return (
    <main>
      <Link href={`/user/${id}/my-qr`}>
        <button>MY QR </button>
      </Link>
       {/* @ts-expect-error Server Component */}
      <LinkSection isAuth={isAuth?.userId} userId={id}/>
       {/* @ts-expect-error Server Component */}
      <Calender  isAuth={isAuth?.userId} userId={id}/>
    </main>)
  }