import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import ContextProvider from "@/context";
import { cookies } from "next/headers"; // Import cookies

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFT Minting App",
  description: "Built by Benjamin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve cookies
  const cookieStore = await cookies(); // Get cookie store
  const cookieList = cookieStore.getAll(); // Get all cookies as an array
  const cookieString = JSON.stringify(cookieList) // Convert cookies to string
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider cookies={cookieString}>{children}</ContextProvider>
      </body>
    </html>
  );
}
