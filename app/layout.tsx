"use client";

import "./globals.css";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import ReactQueryProvider from "@/lib/client";
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>IdeaZ - Elegant Furniture</title>
        <meta name="description" content="Discover elegant and affordable furniture at IdeaZ." />
      </head>
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
