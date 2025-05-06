import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function AmbitionsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/images/modern-living.webp"
            alt="Modern living room"
            width={600}
            height={400}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            <span className="text-sm block">OUR AMBITIONS</span>
            Pioneering innovation and excellence in furniture
          </h2>
          <p className="text-gray-600 mb-6">
            Striving for the highest standards in furniture design and
            craftsmanship. Our ambition is to set new standards in quality,
            customer satisfaction, and sustainability, bringing you innovative,
            modern furniture for your home.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 self-start">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
