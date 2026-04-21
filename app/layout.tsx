import type { Metadata } from "next";
import { Outfit, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midnite Systems, AI Deployment Agency",
  description:
    "Midnite Systems is an AI deployment agency helping growing businesses maximize modern technology. We replace repetitive workflows with agentic automation and empower teams with custom platforms and reporting.",
  icons: {
    icon: "/mdnt-favicon.png",
    apple: "/mdnt-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
