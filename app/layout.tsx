import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "sonner";
import Head from "next/head";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NUBA",
  description: "NUBA - Rewards from your rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <ReduxProvider>
        <body className={` ${rubik.className} antialiased `}>
          <Toaster position="top-center" />
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
