import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Zizwa Consult — AI & Systems Consultancy for African Business",
  description:
    "US-engineered, Zambian-run. Zizwa Consult builds AI, automation, and data systems that make African businesses measurably faster and more profitable. Engagements from K25,000.",
  openGraph: {
    title: "Zizwa Consult — AI & Systems Consultancy for African Business",
    description:
      "US-engineered, Zambian-run. Zizwa Consult builds AI, automation, and data systems that make African businesses measurably faster and more profitable.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
