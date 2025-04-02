"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "@/components/ui/use-toast";
import { CreditCard, Wallet } from "lucide-react";

interface PaymentFormProps {
  onPaymentComplete: () => void;
}

export default function PaymentForm({ onPaymentComplete }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (paymentMethod === "card") {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.cardName ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv
      ) {
        // toast({
        //   title: "Missing information",
        //   description: "Please fill in all card details",
        //   variant: "destructive",
        // });
        return;
      }

      // Validate card number (simple check for demo)
      if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
        // toast({
        //   title: "Invalid card number",
        //   description: "Please enter a valid 16-digit card number",
        //   variant: "destructive",
        // });
        return;
      }

      // Validate CVV
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        // toast({
        //   title: "Invalid CVV",
        //   description: "Please enter a valid CVV code",
        //   variant: "destructive",
        // });
        return;
      }
    }

    // Process payment (mock)
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      //   toast({
      //     title: "Payment successful!",
      //     description: "Your payment has been processed successfully",
      //   });
      onPaymentComplete();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg">Payment Method</Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative">
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <div>Credit Card</div>
                </div>
              </Label>
            </div>

            <div className="relative">
              <RadioGroupItem
                value="wallet"
                id="wallet"
                className="peer sr-only"
              />
              <Label
                htmlFor="wallet"
                className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <div>Digital Wallet</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={cardDetails.cardName}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  type="password"
                  placeholder="123"
                  maxLength={4}
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "wallet" && (
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="mb-4">
              You&apos;ll be redirected to complete payment with your digital
              wallet.
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </form>
  );
}
