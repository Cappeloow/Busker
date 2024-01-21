"use client";
import { FcGoogle } from "react-icons/fc";
import { BUSKER_BACKEND_URL } from "./services/services";
import Link from "next/link";
export default function Home() {
  return (
    <main className="home-main">
      <header>
        <ul>
          <Link href={`/explore`}>
          <li>EXPLORE</li>
          </Link>
          <li>WHY BUSKER</li>
        </ul>
      </header>
    </main>
  )
}
