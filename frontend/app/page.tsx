import Link from "next/link";
import LoginForm from "../_components/LoginPage/LoginForm";

//Login/Landing page
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
       <LoginForm/>
    </main>
  )
}
