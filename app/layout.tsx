import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "sonner";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NUBA",
  description: "Get rewards from paying rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={` ${rubik.className} antialiased `}>
          <Toaster position="top-center" />
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
