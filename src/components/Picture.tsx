import { photoSrcSet, photoUrl, PHOTOS } from '../data/media'
import type { Photo } from '../types'

interface Props {
  photo: Photo
  sizes?: string
  eager?: boolean
  caption?: string
  className?: string
}

/** Responsive WebP with explicit dimensions to prevent layout shift. */
export function Picture({ photo, sizes = '(min-width: 900px) 50vw, 100vw', eager = false, caption, className }: Props) {
  return (
    <figure className={`photo ${className ?? ''}`.trim()}>
      <img
        src={photoUrl(photo.slug)}
        srcSet={photoSrcSet(photo.slug)}
        sizes={sizes}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export { PHOTOS }
