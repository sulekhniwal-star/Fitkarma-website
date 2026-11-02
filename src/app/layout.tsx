import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitKarma | India's AI-powered Fitness and Wellness Ecosystem",
  description:
    "Pre-launch registration for FitKarma — India's AI-powered Fitness and Wellness Ecosystem. Built for Indian nutrition, flexible routines, and connected health.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

export const viewport: Viewport = {
  themeColor: "#0D0F12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" dir="ltr" lang="en">
      <body className="min-h-screen bg-canvas text-ink-primary antialiased selection:bg-brand-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
