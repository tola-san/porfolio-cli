import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Your Name — Developer Portfolio",
  description: "A developer portfolio built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`
          ${manrope.variable}
          m-0 min-w-80
          bg-[#0a0a12]
          text-[#e8e4db]
          antialiased
          [font-family:var(--font-sans),sans-serif]
        `}
      >
        {children}
      </body>
    </html>
  );
}
