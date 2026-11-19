import { HeroBanner } from "@/components/banner/hero-banner"
import { StatsSection } from "@/components/home/stats-section"
import { CoreFeaturesSection } from "@/components/home/core-features-section"
import { PricingSection } from "@/components/home/pricing-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-night text-ink">
      <HeroBanner />
      <StatsSection />
      <CoreFeaturesSection />
      <PricingSection />
      <CtaSection />
    </div>
  )
}
