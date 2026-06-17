import { HeroSection } from "@/components/hero";
import { ChatbotSection } from "@/components/sections/chatbot";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { PageContainer } from "@/components/visual";

export default function HomePage() {
  return (
    <>
      <PageContainer className="flex-1">
        <HeroSection />
      </PageContainer>
      <WhyChooseUsSection />
      <ChatbotSection />
    </>
  );
}
