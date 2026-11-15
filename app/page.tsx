import { HeroBanner } from "@/components/banner/hero-banner"
import { StatsSection } from "@/components/home/stats-section"
import { CoreFeaturesSection } from "@/components/home/core-features-section"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-night text-ink">
      <HeroBanner />
      <StatsSection />
      <CoreFeaturesSection />
    </div>
  )
}
