import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";
import SessionProviderWrapper from "@/lib/provider";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Automed",
  description: "Hospital Managment Systems",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper session={session}>
          <NavBar />
          <main className="p-5">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
