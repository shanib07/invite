import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shazin & Safa",
    template: "%s | Shazin & Safa",
  },
  description: "The wedding of Shazin Sardar and Safa Gazzali.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
