import type { Metadata } from "next";
import "./globals.css";
import SlideNavigation from "@/components/SlideNavigation";

export const metadata: Metadata = {
  title: "SVG Icon Optimization Demo",
  description:
    "Compare different SVG icon approaches: Sprite, Inline, and Image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SlideNavigation />
      </body>
    </html>
  );
}
