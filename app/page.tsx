import { HeroSection } from "@/components/sections/hero-section";
import { PopularSection } from "@/components/sections/popular-section";
import { CategorySection } from "@/components/sections/category-section";
import { AmbitionsSection } from "@/components/sections/ambitions-section";
import { CurationSection } from "@/components/sections/curation-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nashfur - Elegant & Affordable Furniture",
  description:
    "Discover elegant and affordable furniture for every room at Nashfur. Shop sofas, tables, chairs, and more.",
  keywords: [
    "furniture",
    "affordable furniture",
    "home decor",
    "sofas",
    "tables",
    "chairs",
  ],
  metadataBase: new URL("https://nashfur-furniture.com"),
  openGraph: {
    title: "Nashfur - Elegant & Affordable Furniture",
    description: "Explore our collection of stylish and affordable furniture.",
    url: "https://nashfur-furniture.com",
    images: ["/images/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow">
        <HeroSection />
        <PopularSection />
        <CategorySection />
        <AmbitionsSection />
        <CurationSection />
      </main>
    </div>
  );
}
