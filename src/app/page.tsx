import EnvelopeGenerator from "@/components/envelope-generator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-2">
            Eid Salami Digital Envelope
          </h1>
          <p className="text-emerald-600 text-lg">
            Send a digital Eid Salami gift to your loved ones
          </p>
        </header>

        <EnvelopeGenerator />
      </div>
    </main>
  );
}
