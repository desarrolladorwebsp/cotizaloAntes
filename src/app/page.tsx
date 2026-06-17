import { HeroSection } from "@/components/hero";
import { ChatbotSection } from "@/components/sections/chatbot";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <ChatbotSection />
    </>
  );
}
