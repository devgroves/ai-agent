import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // ✅ Import Link from next/link
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudFlare AI Agent",
  description: "CloudFlare AI Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <header className="w-full px-6 py-4 border-b bg-white shadow-sm flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Cloudflare AI Agent
          </Link>
          <nav className="space-x-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Chat
            </Link>
            <Link href="/image" className="hover:text-blue-600 transition">
              Image
            </Link>
          </nav>
        </header>

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
