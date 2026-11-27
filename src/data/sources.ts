import type { Source } from '../types'

const RETRIEVED = '2026-11-27'

export const SOURCES = {
  instagramBio: { kind: 'official', label: 'KLINQ Instagram profile', url: 'https://www.instagram.com/klinqpune/', retrieved: RETRIEVED },
  weekendPost: { kind: 'owner-post', label: 'Instagram post, weekend lineup (24 Nov 2026)', url: 'https://instagram.com/p/DgH0ohRugZ7', retrieved: RETRIEVED },
  moveOnPost: { kind: 'owner-post', label: 'Instagram post, Move On (3 Nov 2026)', url: 'https://instagram.com/p/DfRifZ-OqH7', retrieved: RETRIEVED },
  ownerGraphics: { kind: 'owner-post', label: 'KLINQ Instagram graphics (supplied media)', url: 'https://www.instagram.com/klinqpune/', retrieved: RETRIEVED },
  district: { kind: 'third-party', label: 'District listing', url: 'https://www.district.in/dining/pune/klinq-cocktails-cuisine-viman-nagar', retrieved: RETRIEVED },
  zomato: { kind: 'third-party', label: 'Zomato listing', url: 'https://www.zomato.com/pune/klinq-cocktails-cuisine-viman-nagar', retrieved: RETRIEVED },
  swiggy: { kind: 'third-party', label: 'Swiggy Dineout listing', url: 'https://www.swiggy.com/restaurants/pune/viman-nagar/klinq-975056/dineout', retrieved: RETRIEVED },
  urbanly: { kind: 'third-party', label: 'Urbanly article (published Nov 2024)', url: 'https://www.urbanly.in/pune/food/catch-the-best-sunsets-this-new-boho-rooftop-restaurant-in-pune/', retrieved: RETRIEVED },
} as const satisfies Record<string, Source>
