"use client";
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BUSKER_BACKEND_URL } from '../../app/services/services';
import { authStatus } from '../../app/services/services';

type Props = {};

function LoginForm({}: Props) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authStatus();
        console.log(user);
      } catch (error) {
        console.error('Error fetching auth status:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="auth-container">
      <h1>BUSKER</h1>
      <p>
        <i> REAL </i>AUDIENCE STARTS WITH <b>YOU</b>
      </p>
      <button
        className="google-auth-btn"
        onClick={() => {
          window.location.href = `${BUSKER_BACKEND_URL}/auth/google`;
        }}
      >
        <FcGoogle />
      </button>
    </div>
  );
}

export default LoginForm;