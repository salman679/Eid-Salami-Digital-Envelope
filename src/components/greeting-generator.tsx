"use client";

import type React from "react";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  Facebook,
  Download,
  Share2,
  RefreshCw,
  CheckCircle2,
  Moon,
  Star,
  ChurchIcon as Mosque,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";

const CARD_DESIGNS = [
  {
    id: "classic",
    name: "Classic",
    bgClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
    icon: <Moon className="h-5 w-5" />,
  },
  {
    id: "elegant",
    name: "Elegant",
    bgClass: "bg-gradient-to-r from-amber-500 to-yellow-600",
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "festive",
    name: "Festive",
    bgClass: "bg-gradient-to-r from-purple-500 to-indigo-600",
    icon: <Mosque className="h-5 w-5" />,
  },
];

const GREETINGS = [
  "May the magic of this Eid bring lots of happiness in your life!",
  "Wishing you joy, peace, and prosperity on this blessed occasion.",
  "May Allah's blessings be with you today and always.",
  "Sending you warm wishes on this joyous occasion of Eid.",
];

export default function GreetingGenerator() {
  const [name, setName] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(CARD_DESIGNS[0].id);
  const [greeting, setGreeting] = useState(GREETINGS[0]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required to generate a greeting", {
        description: "Please enter a name",
      });
      return;
    }

    // Pick a random greeting
    const randomGreeting =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setGreeting(randomGreeting);
    setShowCard(true);
  };

  const regenerateCard = () => {
    const randomGreeting =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setGreeting(randomGreeting);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });

      // Create a link and trigger download
      const link = document.createElement("a");
      link.download = `eid-greeting-for-${name
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("Your greeting card has been downloaded", {
        description: "Download successful!",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("There was an error downloading your greeting card", {
        description: "Download failed",
      });
    } finally {
      setDownloading(false);
    }
  };

  const shareToWhatsApp = () => {
    if (!cardRef.current) return;

    setSharing(true);

    // Create a message with a link back to the app
    const message = `Eid Mubarak! I created this special greeting for you using the Eid Greeting Generator. Check it out!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setSharing(false);
  };

  const shareToFacebook = () => {
    if (!cardRef.current) return;

    setSharing(true);

    // Open Facebook share dialog
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookUrl, "_blank");
    setSharing(false);
  };

  const getDesignClass = () => {
    return (
      CARD_DESIGNS.find((design) => design.id === selectedDesign)?.bgClass ||
      CARD_DESIGNS[0].bgClass
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-medium">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-primary/50 focus:border-primary/50 focus:ring-0"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-medium">Card Design</Label>
            <RadioGroup
              value={selectedDesign}
              onValueChange={setSelectedDesign}
              className="grid grid-cols-1 gap-2"
            >
              {CARD_DESIGNS.map((design) => (
                <div key={design.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={design.id} id={design.id} />
                  <Label
                    htmlFor={design.id}
                    className="flex items-center cursor-pointer"
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full mr-2 flex items-center justify-center text-white",
                        design.bgClass
                      )}
                    >
                      {design.icon}
                    </div>
                    {design.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary/60 hover:bg-primary/70 text-white"
          >
            Generate Greeting
          </Button>
        </form>
      </div>

      <div className="w-full lg:w-2/3">
        {showCard ? (
          <div className="space-y-4">
            <div
              ref={cardRef}
              className={cn(
                "rounded-xl shadow-lg p-8 text-white transition-all duration-500 ease-in-out transform",
                getDesignClass(),
                showCard ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <div className="card-content relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 opacity-10">
                  <Mosque className="w-32 h-32" />
                </div>
                <div className="absolute bottom-0 left-0 opacity-10">
                  <Moon className="w-24 h-24" />
                </div>
                <div className="absolute top-1/4 left-1/4 opacity-10">
                  <Star className="w-16 h-16" />
                </div>

                <div className="relative z-10 text-center py-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 font-arabic">
                    Eid Mubarak!
                  </h2>

                  <div className="text-xl md:text-2xl mb-6">{greeting}</div>

                  <div className="text-3xl md:text-4xl font-semibold mt-8 font-cursive">
                    {name}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={regenerateCard}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                New Message
              </Button>

              <Button
                onClick={downloadCard}
                variant="outline"
                className="flex-1 sm:flex-none"
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </>
                )}
              </Button>

              <Button
                onClick={shareToWhatsApp}
                variant="outline"
                className="flex-1 sm:flex-none bg-primary/5 hover:bg-primary/10 text-primary/60 border-primary/20"
                disabled={sharing}
              >
                <Share2 className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>

              <Button
                onClick={shareToFacebook}
                variant="outline"
                className="flex-1 sm:flex-none bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                disabled={sharing}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-12 bg-white/50 rounded-xl border-2 border-dashed border-primary/20">
            <div className="text-center text-primary/60">
              <Mosque className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">
                Enter your name and generate a beautiful Eid greeting card
              </p>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
