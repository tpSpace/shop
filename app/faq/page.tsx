import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nashfur - FAQ",
  description: "Frequently asked questions about Nashfur furniture.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="py-16 bg-white">
          <h1 className="text-3xl font-bold text-black mb-8 text-center">
            FAQ
          </h1>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">
                <strong>Q: How long is shipping?</strong> A: Typically 5-7
                business days.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">
                <strong>Q: Do you offer returns?</strong> A: Yes, within 30 days
                with original packaging.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">
                <strong>Q: Can I track my order?</strong> A: Yes, a tracking
                link will be emailed upon shipment.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
