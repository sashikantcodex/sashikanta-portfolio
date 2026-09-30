import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat-widget";
import { Boot, Cursor, Footer, Grain, Nav, ScrollProgress, ScrollReveal } from "@/components/chrome";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sashikanta Sahoo — Senior AI Full Stack Engineer",
  description:
    "Portfolio of Sashikanta Sahoo, SDE-4 at IQVIA. Healthcare platforms, React, Node.js, AWS, and agentic RAG.",
  openGraph: {
    title: "Sashikanta Sahoo — Senior AI Full Stack Engineer",
    description: "Healthcare product engineering and agentic AI. Bengaluru.",
    url: "https://github.com/sashikantcodex",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} js`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <noscript>
          <style>{`html.js [data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Grain />
        <ScrollReveal />
        <ScrollProgress />
        <Cursor />
        <Boot />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
