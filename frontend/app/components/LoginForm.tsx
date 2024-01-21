
"use client";
import { FcGoogle } from "react-icons/fc";
import { BUSKER_BACKEND_URL } from "../services/services";
import Link from "next/link";
type Props = {}

function LoginForm({}: Props) {
  return (
    <div className="auth-container">
    <h1>BUSKER</h1>
    <p><i> REAL </i>AUDIENCE START WITH <b>YOU</b></p>
    <button className="google-auth-btn" onClick={() => {
      window.location.href = `${BUSKER_BACKEND_URL}/auth/google`
    }}>
     <FcGoogle />
    </button>
    </div>
  )
}

export default LoginForm