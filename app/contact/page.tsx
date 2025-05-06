import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nashfur - Contact Us",
  description: "Get in touch with Nashfur for support or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="py-16 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Image
                src="/images/modern-living.webp"
                alt="Contact Us"
                width={600}
                height={400}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Contact Us
              </h1>
              <p className="text-gray-600 mb-6">
                Have a question? Reach out to us at{" "}
                <a href="mailto:support@nashfur.com" className="text-blue-500">
                  support@nashfur.com
                </a>{" "}
                or call us at +1-800-NASHFUR.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800 self-start">
                <Link href="/faq">View FAQ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
