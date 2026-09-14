import type { Metadata } from "next";
import { DM_Mono, Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { portfolio } from "../portfolio.config";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-mono" });
const serif = Playfair_Display({ subsets: ["latin"], style: ["italic"], weight: ["500"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: `${portfolio.name} — ${portfolio.role}`,
  description: portfolio.introduction,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${mono.variable} ${serif.variable}`}>
        {children}
      </body>
    </html>
  );
}
