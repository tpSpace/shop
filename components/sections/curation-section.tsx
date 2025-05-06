import Image from "next/image";

import { curationImages } from "@/data/siteData";

export function CurationSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black mb-8 max-w-2xl mx-auto">
          We meticulously curate our product selections to ensure you receive
          only the best.
        </h2>
        <div className="flex justify-center space-x-4 overflow-x-auto">
          {curationImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Curated product ${index + 1}`}
              width={200}
              height={200}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
