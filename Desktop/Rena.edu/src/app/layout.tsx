import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Rena.edu - Education Services",
  description: "Professional education services and booking requests",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={sans.variable}>
      <body className="bg-[#FAF9F7] text-[#2B2B2B] font-sans">
        {children}
      </body>
    </html>
  );
}

