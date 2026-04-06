'use client'

/**
 * DEV ENVIRONMENT BANNER
 * Shown site-wide to make clear this is a development/preview build.
 * No real orders will be processed or fulfilled.
 * Remove this component (and its usage in layout.tsx) before going live.
 */
export default function DevBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-400 text-amber-900 text-xs font-semibold text-center py-1.5 px-4 flex items-center justify-center gap-2 shadow-md">
      <span>⚠️</span>
      <span>
        DEV ENVIRONMENT — This is a development/preview site. No real orders will be processed or fulfilled.
      </span>
      <span>⚠️</span>
    </div>
  )
}
