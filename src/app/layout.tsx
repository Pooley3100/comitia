import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const cinzelFont = localFont({ src: './fonts/Cinzel-Regular.ttf', variable: '--font-Cinzel' })

export const metadata: Metadata = {
  title: "Comitia",
  description: "The place for arguments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzelFont.variable} font-roman ${inter.variable} font-sans`}
      >
        <div className="w-screen h-screen flex flex-col bg-red-300">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
