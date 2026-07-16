import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Property Memory",
  description: "One reliable history for every property.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
