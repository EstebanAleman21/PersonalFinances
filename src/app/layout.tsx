import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import ClientLayout from "./_components/ClientLayout"; // Client-side component

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {/* Wrapping everything in the client-side component */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
