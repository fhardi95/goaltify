import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TierListSection from "@/components/home/TierListSection";
import AIChatSection from "@/components/home/AIChatSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.bloxfruitsai.com" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is Blox Fruits AI?", acceptedAnswer: { "@type": "Answer", text: "Blox Fruits AI is an AI-powered platform for Roblox Blox Fruits players providing real-time tier lists, trade calculators, devil fruit value lists, and build guides." } },
    { "@type": "Question", name: "What is the best fruit in Blox Fruits in 2025?", acceptedAnswer: { "@type": "Answer", text: "As of 2025, Dragon, Leopard, and Kitsune hold the top S-tier spots. Our AI tier list updates after every patch to reflect the current meta." } },
    { "@type": "Question", name: "Is Blox Fruits AI free?", acceptedAnswer: { "@type": "Answer", text: "Yes! Blox Fruits AI is completely free. Access the tier list, trade calculator, value list, and AI chat tool at no cost." } },
    { "@type": "Question", name: "How does the trade calculator work?", acceptedAnswer: { "@type": "Answer", text: "Add fruits from both sides of the trade. The calculator compares total values, demand scores, and Robux prices to tell you if a trade is fair, overpay, or underpay." } },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HeroSection />
      <FeaturesSection />
      <TierListSection />
      <AIChatSection />
      <HowItWorksSection />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
