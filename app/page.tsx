import { HeroBanner } from "@/components/banner/hero-banner"
import { Navbar } from "@/components/navigation/navbar"

export default function HomePage() {
  return (
    <div className="min-h-svh bg-night text-ink">
      <Navbar />

      {/* Only the banner is rendered for now; later sections can follow it. */}
      <main>
        <HeroBanner />
      </main>
    </div>
  )
}
