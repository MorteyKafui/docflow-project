import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "DocFlow | Effortless document management made simple",
  description:
    "Experience the next level of document organization and efficiency. Our platform elevates your document management process, making it more efficient and effective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} ${poppins.variable} antialiased`}
      >
        <Navbar />
        <main className="bg-firstBg">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
