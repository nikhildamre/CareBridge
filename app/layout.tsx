import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import SessionProviderWrapper from "@/lib/provider";
import { getServerSession } from "next-auth";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProviderWrapper session={session}>
          <Theme>
            <NavBar  />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
          </SessionProviderWrapper>
      </body>
    </html>
  );
}
