import type { Metadata, Viewport } from "next";
import { Quicksand, Dancing_Script, Playfair_Display } from "next/font/google";
import { content } from "@/lib/content";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `Para ${content.girlfriendName} 💕`,
  description: "Un regalito hecho con amor.",
};

export const viewport: Viewport = {
  themeColor: "#ffd0dd",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${quicksand.variable} ${dancingScript.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
