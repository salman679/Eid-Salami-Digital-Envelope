"use client";

import { useState, useEffect } from "react";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnvelopeGenerator from "@/components/envelope-generator";
// import EidWelcomeModal from "./eid-welcome-modal";

export default function EidLandingPage() {
  const [, setShowModal] = useState(false);
  const [showEnvelopeGenerator, setShowEnvelopeGenerator] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown before
    const hasSeenModal = localStorage.getItem("eid-modal-seen");

    if (!hasSeenModal) {
      // Show modal after a short delay to ensure smooth loading
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // If they've seen the modal before, mark it as closed
    }
  }, []);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setModalClosed(true);
  //   // Save that user has seen the modal
  //   localStorage.setItem("eid-modal-seen", "true");
  // };

  const handleStartSendingGift = () => {
    setShowEnvelopeGenerator(true);
    // Scroll to the envelope generator
    setTimeout(() => {
      document.getElementById("envelope-generator")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <>
      {/* {showModal && <EidWelcomeModal onClose={handleCloseModal} />} */}

      <main className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/10">
        {/* Hero section */}
        <div className="relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 pattern-bg opacity-10" />

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Eid Salami Digital Envelope
              </h1>

              <p className="text-xl text-primary mb-8">
                Send digital Eid gifts to your loved ones with our beautiful
                digital envelopes
              </p>

              {!showEnvelopeGenerator && (
                <div className="animate-bounce">
                  <Button
                    onClick={handleStartSendingGift}
                    className="bg-primary/95 hover:bg-primary/100 text-white text-lg px-8 py-6 rounded-full shadow-lg"
                    size="lg"
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Send Eid Salami
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary/90 mb-12">
              Why Send Digital Eid Salami?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary/90 mb-2">
                  Instant Delivery
                </h3>
                <p className="text-primary/90">
                  Send your Eid gifts instantly, no matter where your loved ones
                  are located.
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary/90 mb-2">
                  Personalized Messages
                </h3>
                <p className="text-primary/90">
                  Add your personal touch with custom messages and beautiful
                  designs.
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary/90 mb-2">
                  Easy Sharing
                </h3>
                <p className="text-primary/90">
                  Share your Eid gifts via WhatsApp, email, or social media with
                  just a click.
                </p>
              </div>
            </div>

            {!showEnvelopeGenerator && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleStartSendingGift}
                  className="bg-primary/90 hover:bg-primary/90 text-white"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Send an Eid Gift Now
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Envelope generator section */}
        {showEnvelopeGenerator && (
          <div id="envelope-generator" className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-primary/90 mb-8">
                Create Your Eid Salami Envelope
              </h2>
              <EnvelopeGenerator />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-primary/90 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>
              © {new Date().getFullYear()} Eid Salami Digital Envelope. All
              rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
