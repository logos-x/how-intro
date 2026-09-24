import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { HeroSection } from "@/shared/sections/HeroSection";
import { SocialProof } from "@/shared/sections/SocialProof";
import { CoreFeatures } from "@/shared/sections/CoreFeatures";
import { VoiceTutorSection } from "@/shared/sections/VoiceTutorSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white font-['Plus_Jakarta_Sans']">
      <Header />
      <HeroSection />
      <SocialProof />
      <CoreFeatures />
      <VoiceTutorSection />
      <Footer />
    </main>
  );
}
