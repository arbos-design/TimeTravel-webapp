import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import FloatingChat from "@/components/FloatingChat";
import PageWrapper from "@/components/PageWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TimeTravelAgency — Traversez les siècles",
  description:
    "Agence de voyage temporel de luxe. De l'ère des dinosaures à la naissance du monde moderne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body className="antialiased bg-dark-green text-cream">
        <PageWrapper>{children}</PageWrapper>
        <FloatingChat />
      </body>
    </html>
  );
}
