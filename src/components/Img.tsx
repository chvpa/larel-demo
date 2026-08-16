import { useState } from 'react'

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f4f4f5"/><rect x="168" y="168" width="64" height="64" rx="16" fill="#26FE41"/><path d="M188 180h8v26a4 4 0 0 0 4 4h6v6h-8c-5.5 0-10-4.5-10-10v-26z" fill="#111"/></svg>`
  )

export function Img({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false)
  return (
    <img
      src={err ? FALLBACK : src}
      alt={alt}
      loading="lazy"
      onError={() => setErr(true)}
      className={className}
    />
  )
}
