import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HomepageWrapper from "./homepageWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harmoniq",
  description: "AI first service management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomepageWrapper>{children}</HomepageWrapper>
      </body>
    </html>
  );
}
