import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "sonner";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuba",
  description: "Nuba - Rewards from your rent",
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
          {children}
          <Toaster position="top-center" />
          <NextTopLoader color="#cd921c" zIndex={10000} showSpinner={false} />
        </body>
      </ReduxProvider>
    </html>
  );
}
