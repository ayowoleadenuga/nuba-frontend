// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AOSProvider } from "@/components/AosProvider";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuba - Rewards from your rent",
  description: "Nuba - Rewards from your rent",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.className} antialiased`}
      >
        <Providers>
          <AOSProvider>{children}</AOSProvider>

          <Toaster position="top-center" />
          <NextTopLoader color="#cd921c" zIndex={10000} showSpinner={false} />
        </Providers>
      </body>
    </html>
  );
}
