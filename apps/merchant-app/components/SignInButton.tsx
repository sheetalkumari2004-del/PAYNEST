"use client";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Sign in with Google
    </button>
  );
}