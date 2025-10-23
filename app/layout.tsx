import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
// import Link from "next/link";
import Footer from "../components/Footer";


export const metadata: Metadata = {
  title: "Sankofa Seedlings",
  description: "The place for permaculture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-full bg-white antialiased`}
      >
        <Navbar />
        <main className="flex-grow w-full bg-white mx-auto px-4 pb-8 md:min-h-[57vh]">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
