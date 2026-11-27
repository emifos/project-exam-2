import AuthProvider from "./components/context/AuthContext";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holidaze",
  description: "Find and book unique venues around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="flex flex-col">
        <AuthProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
