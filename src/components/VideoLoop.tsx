import { useEffect, useRef } from 'react'

interface Props {
  slug: string
  label: string
}

/** Muted, looping, no audio. Only plays while on screen; the browser may still pause it. */
export function VideoLoop({ slug, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={`/media/video/${slug}.mp4`}
      poster={`/media/video/${slug}-poster.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      width={540}
      height={960}
    />
  )
}
