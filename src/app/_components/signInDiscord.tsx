"use client";

import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function SigninDiscord() {
  return (
    <button
      className="my-5 flex w-full items-center justify-center rounded-md border border-zinc-300 bg-white py-1 text-zinc-700"
      onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
    >
      <FaDiscord className="mr-2 text-blue-600" />
      Sign in with Discord
    </button>
  );
}
