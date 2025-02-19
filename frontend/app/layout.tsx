import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import ContextProvider from "@/context";
import { headers } from "next/headers"; // Import headers
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
  console.log("Cookies in RootLayout:", cookieString); // Debugging
  // const headersObj = await headers();
  // const cookies = headersObj.get('cookie')
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
