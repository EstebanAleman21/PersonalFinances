// components/ClientProviders.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../context/authContext"; // Adjust the import path as necessary
import { TRPCReactProvider } from "~/trpc/react"; // Adjust the import path as necessary

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider session={null}>
      <AuthProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
