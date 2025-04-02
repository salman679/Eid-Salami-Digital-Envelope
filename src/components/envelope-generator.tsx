"use client";

import type React from "react";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  Mail,
  Download,
  Share2,
  ChevronRight,
  CheckCircle2,
  ChevronLeft,
  Gift,
  ChurchIcon as Mosque,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "@/components/ui/use-toast";
// import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import PaymentForm from "./payment-form";

const CARD_DESIGNS = [
  {
    id: "classic",
    name: "Classic Green",
    bgClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
    borderClass: "border-emerald-600",
  },
  {
    id: "elegant",
    name: "Golden Elegance",
    bgClass: "bg-gradient-to-r from-amber-500 to-yellow-600",
    borderClass: "border-amber-600",
  },
  {
    id: "festive",
    name: "Royal Purple",
    bgClass: "bg-gradient-to-r from-purple-500 to-indigo-600",
    borderClass: "border-purple-600",
  },
];

type FormData = {
  amount: string;
  recipientName: string;
  senderName: string;
  message: string;
  design: string;
};

const initialFormData: FormData = {
  amount: "",
  recipientName: "",
  senderName: "",
  message: "",
  design: CARD_DESIGNS[0].id,
};

export default function EnvelopeGenerator() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [, setIsPaymentComplete] = useState(false);
  const [isGeneratingEnvelope, setIsGeneratingEnvelope] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const envelopeRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesignChange = (value: string) => {
    setFormData((prev) => ({ ...prev, design: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.amount || !formData.recipientName || !formData.senderName) {
        // toast({
        //   title: "Missing information",
        //   description: "Please fill in all required fields",
        //   variant: "destructive",
        // });
        return;
      }

      // Validate amount is a number and greater than 0
      const amount = Number.parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        // toast({
        //   title: "Invalid amount",
        //   description: "Please enter a valid amount greater than 0",
        //   variant: "destructive",
        // });
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handlePaymentComplete = () => {
    setIsPaymentComplete(true);
    setIsGeneratingEnvelope(true);

    // Simulate envelope generation delay
    setTimeout(() => {
      setIsGeneratingEnvelope(false);
      setCurrentStep(4);
    }, 1500);
  };

  const downloadEnvelope = async () => {
    if (!envelopeRef.current) return;

    try {
      setDownloading(true);
      const dataUrl = await toPng(envelopeRef.current, { quality: 0.95 });

      // Create a link and trigger download
      const link = document.createElement("a");
      link.download = `eid-salami-for-${formData.recipientName
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      //   toast({
      //     title: "Download successful!",
      //     description: "Your digital envelope has been downloaded",
      //   });
    } catch (error) {
      console.error("Error generating image:", error);
      //   toast({
      //     title: "Download failed",
      //     description: "There was an error downloading your envelope",
      //     variant: "destructive",
      //   });
    } finally {
      setDownloading(false);
    }
  };

  const shareToWhatsApp = () => {
    setSharing(true);

    // Create a message
    const message = `Eid Mubarak! I've sent you an Eid Salami gift of $${formData.amount}. ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setSharing(false);
  };

  const shareByEmail = () => {
    setSharing(true);

    const subject = encodeURIComponent(
      "Eid Mubarak! I've sent you an Eid Salami gift"
    );
    const body = encodeURIComponent(
      `Dear ${formData.recipientName},\n\nEid Mubarak! I've sent you an Eid Salami gift of $${formData.amount}.\n\n${formData.message}\n\nBest wishes,\n${formData.senderName}`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setSharing(false);
  };

  const getDesignClass = () => {
    return (
      CARD_DESIGNS.find((design) => design.id === formData.design)?.bgClass ||
      CARD_DESIGNS[0].bgClass
    );
  };

  //   const getBorderClass = () => {
  //     return (
  //       CARD_DESIGNS.find((design) => design.id === formData.design)
  //         ?.borderClass || CARD_DESIGNS[0].borderClass
  //     );
  //   };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-emerald-800">
              Step 1: Gift Details
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-lg">
                  Gift Amount ($)*
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="border-emerald-200 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientName" className="text-lg">
                  Recipient&apos;s Name*
                </Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  placeholder="Who is receiving this gift?"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="border-emerald-200 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderName" className="text-lg">
                  Your Name*
                </Label>
                <Input
                  id="senderName"
                  name="senderName"
                  placeholder="Your name"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  className="border-emerald-200 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={handleNextStep}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-emerald-800">
              Step 2: Personalize Your Envelope
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write a personal message for the recipient..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[120px] border-emerald-200 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg">Envelope Design</Label>
                <RadioGroup
                  value={formData.design}
                  onValueChange={handleDesignChange}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {CARD_DESIGNS.map((design) => (
                    <div key={design.id} className="relative">
                      <RadioGroupItem
                        value={design.id}
                        id={design.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={design.id}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <div
                          className={cn(
                            "w-full h-16 rounded-md mb-2",
                            design.bgClass
                          )}
                        ></div>
                        {design.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button onClick={handlePrevStep} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNextStep}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-emerald-800">
              Step 3: Payment
            </h2>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-medium">Payment Summary</h3>
                  <p className="text-gray-500">Eid Salami Gift</p>
                </div>
                <div className="text-2xl font-bold">${formData.amount}</div>
              </div>

              <PaymentForm onPaymentComplete={handlePaymentComplete} />
            </div>

            <div className="pt-4 flex justify-between">
              <Button onClick={handlePrevStep} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-emerald-800">
              Your Digital Envelope is Ready!
            </h2>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div
                ref={envelopeRef}
                className={cn(
                  "rounded-xl shadow-lg p-8 text-white",
                  getDesignClass()
                )}
              >
                <div className="relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 opacity-10">
                    <Mosque className="w-32 h-32" />
                  </div>
                  <div className="absolute bottom-0 left-0 opacity-10">
                    <Gift className="w-24 h-24" />
                  </div>

                  <div className="relative z-10 text-center py-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-arabic">
                      Eid Mubarak!
                    </h2>

                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                      <div className="text-lg mb-1">Eid Salami Gift</div>
                      <div className="text-4xl md:text-5xl font-bold mb-2">
                        ${formData.amount}
                      </div>
                      <div className="text-sm">
                        For {formData.recipientName}
                      </div>
                    </div>

                    {formData.message && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 italic">
                        &quot;{formData.message}&quot;
                      </div>
                    )}

                    <div className="text-lg font-semibold mt-4 font-cursive">
                      From: {formData.senderName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={downloadEnvelope}
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
                  className="flex-1 sm:flex-none bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                  disabled={sharing}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>

                <Button
                  onClick={shareByEmail}
                  variant="outline"
                  className="flex-1 sm:flex-none bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
                  disabled={sharing}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                onClick={() => {
                  setFormData(initialFormData);
                  setCurrentStep(1);
                  setIsPaymentComplete(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Create Another Envelope
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      {isGeneratingEnvelope ? (
        <div className="py-20 text-center">
          <div className="inline-block p-4 mb-4 rounded-full bg-emerald-100">
            <Gift className="h-12 w-12 text-emerald-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-medium text-emerald-800 mb-2">
            Generating Your Digital Envelope
          </h3>
          <p className="text-emerald-600">Please wait a moment...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                    currentStep >= 1 ? "bg-emerald-600" : "bg-gray-300"
                  )}
                >
                  1
                </div>
                <div
                  className={cn(
                    "h-1 w-12",
                    currentStep >= 2 ? "bg-emerald-600" : "bg-gray-300"
                  )}
                />
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                    currentStep >= 2 ? "bg-emerald-600" : "bg-gray-300"
                  )}
                >
                  2
                </div>
                <div
                  className={cn(
                    "h-1 w-12",
                    currentStep >= 3 ? "bg-emerald-600" : "bg-gray-300"
                  )}
                />
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                    currentStep >= 3 ? "bg-emerald-600" : "bg-gray-300"
                  )}
                >
                  3
                </div>
                <div
                  className={cn(
                    "h-1 w-12",
                    currentStep >= 4 ? "bg-emerald-600" : "bg-gray-300"
                  )}
                />
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                    currentStep >= 4 ? "bg-emerald-600" : "bg-gray-300"
                  )}
                >
                  4
                </div>
              </div>
            </div>
          </div>

          {renderStepContent()}
        </>
      )}

      {/* <Toaster /> */}
    </div>
  );
}
