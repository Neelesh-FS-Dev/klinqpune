/** Where a fact came from. Only `official` and `owner-post` may be stated as KLINQ's own words. */
export type SourceKind = 'official' | 'owner-post' | 'third-party' | 'proposed'

export interface Source {
  kind: SourceKind
  label: string
  url: string
  retrieved: string // YYYY-MM-DD
}

export interface Photo {
  slug: string
  alt: string
  /** Aspect is always 4:5 for the supplied Instagram posts; kept explicit for layout. */
  width: number
  height: number
  categories: GalleryCategory[]
}

export type GalleryCategory = 'Food' | 'Drinks' | 'Rooftop & Interior' | 'Faces' | 'Events' | 'Celebrations'

export interface EventItem {
  id: string
  title: string
  artist?: string
  startDate: string // YYYY-MM-DD, Asia/Kolkata
  endDate: string
  startTime?: string // 24h local time
  description: string
  source: Source
  /** Date the listing was last checked against the source. */
  lastVerifiedAt: string
}

export interface MenuItem {
  name: string
  group: string
  alcoholic?: boolean
  note?: string
  source: Source
}
