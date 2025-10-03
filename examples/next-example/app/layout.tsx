import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SVG Sprite Webpack Loader - Next.js Example",
  description: "Demonstrating SVG sprite generation with Next.js and Turbopack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/sprite.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
