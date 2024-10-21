'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider, signInWithPopup } from "../../constants/firebase";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");  
    } catch (err) {
      setError("Failed to sign in with Google.");
      console.error(err);
    }
  };

  return (
    <div className="">
      <div className="min-h-screen lg:w-1/5 md:w-1/2 mx-auto text-white">
        <img src="/img/login/main/bag.png" className="w-11/12 mx-auto" alt="" />
        <p className="text-center text-brand-primary-200 my-2 text-xl font-medium">
          All Your Learning, One Place
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}

        <div className="space-y-5 mt-5 px-7">
          {/* Google Login */}
          <div
            className="flex justify-center gap-2 font-medium text-lg p-2 border border-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105"
            onClick={handleGoogleLogin} // Trigger Google login on click
          >
            <img src="/img/login/main/google.svg" className="h-6" alt="" />
            <p>Login using Google</p>
          </div>

          <p className="font-medium text-base-100 text-center">OR</p>

          {/* Redirect to Email Login (handled on another page) */}
          <div
            className="flex justify-center gap-2 font-medium text-lg p-2 border border-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105"
            onClick={() => router.push('/signup')} // Redirect to signup on click
          >
            <p>Login using Email</p>
          </div>

          {/* Email Signup */}
          <Link
            href="/signup"
            className="flex justify-center items-center bg-brand-primary-200 text-base-500 gap-2 font-medium text-lg p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-brand-primary-300 transform hover:scale-105"
          >
            <img src="/img/login/main/gmail.svg" className="h-5" alt="" />
            <p>Signup using Mail</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
