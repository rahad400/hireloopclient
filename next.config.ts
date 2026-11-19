import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // The dashboard sidebar owns the bottom-left corner; Next's dev badge sits
  // on top of the logout row, so keep it out of the way.
  devIndicators: false,
}

export default nextConfig
