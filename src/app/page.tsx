import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import SigninDiscord from "./_components/signInDiscord";
import Signout from "./_components/signOut";

export default async function Home() {
  const session = await getServerAuthSession();

  void (await api.post.getLatest.prefetch());

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-4xl font-bold">Welcome to Fintrack</h1>
          <h2 className="text-2xl">Please Login to enter the app</h2>
          <SigninDiscord />

          {session?.user && <Signout />}
        </div>
      </main>
    </HydrateClient>
  );
}
