"use client"
import { createAvailability,authStatus } from "../../services/services";
import LinkSection from "@/_components/UserProfile/LinkSection";
// {/* @ts-expect-error Server Component */}
export default function Page({ params }: { params: { id: string } }) {
  const {id} = params;
  return (
    <main>
      <div>
        My Page
      </div>
      <LinkSection userId={id}/>
      {/* <button onClick={() => createAvailability()}>createAvailability</button> */}
    </main>)
  }