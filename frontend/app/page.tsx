"use client";
import { BUSKER_BACKEND_URL } from "./services/services";
export default function Home() {
  return (
    <main>
      <button onClick={() => {
        window.location.href = `${BUSKER_BACKEND_URL}/auth/google`
      }}>
        Login
      </button>
    </main>
  )
}
