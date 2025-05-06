// /home/ubuntu/frontend_ecommerce/app/(public)/page.tsx

import { PopularSection } from "@/components/sections/popular-section";
import { CategorySection } from "@/components/sections/category-section";
import { Metadata } from "next";
import { getFeaturedProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { CurationSection } from "@/components/sections/curation-section";
import { AmbitionsSection } from "@/components/sections/ambitions-section";
import { HeroSection } from "@/components/sections/hero-section";

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
  // Ensure metadataBase is correctly set for production
  // metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Nashfur - Elegant & Affordable Furniture",
    description: "Explore our collection of stylish and affordable furniture.",
  },
};

// Fetch data on the server for the home page
async function getHomePageData() {
  // Fetch in parallel
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(), // Using the recreated API function
    getCategories(), // Using the recreated API function
  ]);
  return { featuredProducts, categories };
}

export default async function Home() {
  const { featuredProducts, categories } = await getHomePageData();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        <HeroSection />
        {/* Pass fetched data to sections */}
        <PopularSection products={featuredProducts || []} />
        <CategorySection categories={categories || []} />
        <AmbitionsSection />
        <CurationSection />
      </main>
    </div>
  );
}
