import EidLandingPage from "@/components/eid-landing-page";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EidLandingPage />
    </Suspense>
  );
}
