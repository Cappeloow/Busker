"use client"
import { createAvailability,authStatus } from "../../services/services";
export default function Page({ params }: { params: { id: string } }) {
  const user = authStatus();
  console.log(user);
  return (
    <main>
      <div>
        My Page
      </div>
      {/* <button onClick={() => createAvailability()}></button> */}
    </main>)
  }