import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { inter, arabic, cursive } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Eid Salami Digital Envelope",
  description: "Send digital Eid Salami gifts to your loved ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${arabic.variable} ${cursive.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
