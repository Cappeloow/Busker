"use client"
import { createAvailability,authStatus } from "../../services/services";
export default function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <div>
        My Page
      </div>
      <button onClick={() => createAvailability()}>createAvailability</button>
    </main>)
  }