import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Rent the camper of your dreams for your next road trip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <TanStackProvider>
        <Header />
        {children}
      </TanStackProvider>
      </body>
    </html>
  );
}