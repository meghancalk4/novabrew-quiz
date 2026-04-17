import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaBrew Coffee Taste Profile Quiz",
  description: "A personality-first coffee quiz that matches every subscriber to their perfect NovaBrew energy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}