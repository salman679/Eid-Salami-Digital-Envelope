import { Inter, Lateef, Dancing_Script } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const arabic = Lateef({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export const cursive = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cursive",
});
