import { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import ReactQueryProvider from "@/lib/client";

export const metadata: Metadata = {
  title: "Nashfur - Elegant Furniture",
  description: "Discover elegant and affordable furniture at Nashfur.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <ReactQueryProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
