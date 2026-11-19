import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribeToViewportChange(onStoreChange: () => void) {
  const mediaQueryList = window.matchMedia(MOBILE_QUERY)
  mediaQueryList.addEventListener("change", onStoreChange)

  return () => mediaQueryList.removeEventListener("change", onStoreChange)
}

function getViewportSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

/** The server has no viewport, so assume the desktop layout while rendering. */
function getServerSnapshot() {
  return false
}

/**
 * Tracks whether the viewport is narrower than `md`.
 *
 * `useSyncExternalStore` subscribes to the media query without calling
 * `setState` inside an effect, which keeps the React Compiler lint rule happy
 * and avoids a cascading render on mount.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribeToViewportChange,
    getViewportSnapshot,
    getServerSnapshot
  )
}
