// // app/layout.tsx
// import type { Metadata } from "next";
// import { Rubik } from "next/font/google";
// import "./globals.css";
// import ReduxProvider from "@/redux/provider";
// import { Toaster } from "sonner";
// import NextTopLoader from "nextjs-toploader";

// const rubik = Rubik({
//   variable: "--font-rubik",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Nuba - Rewards from your rent",
//   description: "Nuba - Rewards from your rent",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={rubik.className}>
//       <body>
//         <ReduxProvider>
//           {children}
//           <Toaster position="top-center" />
//           <NextTopLoader color="#cd921c" zIndex={10000} showSpinner={false} />
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import { Metadata } from "next";
import CustomLayout from "./customLayout";

export const metadata: Metadata = {
  title: "Nuba - Rewards from your rent",
  description: "Nuba - Rewards from your rent",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomLayout>{children}</CustomLayout>;
}
