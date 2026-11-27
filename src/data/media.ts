import type { Photo } from '../types'

/** Original Instagram frames, 1080×1350 (4:5). Each slug has -640 and full-size WebP copies in public/media/photo. */
const P = (slug: string, alt: string, categories: Photo['categories']): Photo => ({ slug, alt, width: 1080, height: 1350, categories })

export const PHOTOS = {
  heroGlass: P('hero-glass', 'A chilled pink coupe glass with a single flower petal on black', ['Drinks']),
  pourPeppery: P('pour-peppery-twist', 'A pale rose cocktail in a fluted glass on a white background', ['Drinks']),
  pourPink: P('pour-pink-coupe', 'A pink coupe cocktail on a green marble bar top, lit by a shaft of light', ['Drinks']),
  pourNaughty: P('pour-naughty-30', 'A green cocktail over ice with a lacquered flatbread garnish', ['Drinks']),
  goldenHour: P('golden-hour-lanterns', 'Friends on a rooftop beneath woven lanterns at dusk', ['Rooftop & Interior', 'Faces']),
  afterHours: P('after-hours-courtyard', 'A warm courtyard lounge at night with lamps and palms', ['Rooftop & Interior']),
  rooftopFriends: P('rooftop-friends', 'Friends sharing a rooftop lounge table at night', ['Rooftop & Interior', 'Celebrations']),
  smallPlates: P('small-plates', 'Overhead view of small plates and dips on a timber table', ['Food']),
  chicken: P('chicken-plate', 'A chicken dish with lemon on a textured white plate', ['Food']),
  dessertNest: P('dessert-nest', 'A dessert of piped chestnut-style cream in a pastry shell', ['Food']),
  dessertPanna: P('dessert-panna', 'A pink dessert on a white plate beside cutlery', ['Food']),
  kebabRolls: P('kebab-rolls', 'Kebab rolls on a plate with mint chutney', ['Food']),
  flatbread: P('flatbread-seekh', 'Seekh kebab on flaky flatbread with a creamy sauce', ['Food']),
  portraitBar: P('faces-portrait-bar', 'A guest seated at a green banquette in the bar', ['Faces']),
  diningTrio: P('faces-dining-trio', 'Three guests dining at a round wooden table', ['Faces', 'Celebrations']),
  toast: P('faces-toast', 'Guests clinking wine glasses at a restaurant table', ['Faces', 'Celebrations']),
  neonCrowd: P('neon-crowd', 'Guests at a bar beneath a glowing KLINQ neon sign', ['Events', 'Rooftop & Interior']),
  interior: P('interior-warm', 'Warm woven light fixtures and bar seating in the interior', ['Rooftop & Interior']),
  barMono: P('bar-monochrome', 'A bartender pouring at the bar, in black and white', ['Drinks']),
  lineupPoster: P('lineup-poster', 'Weekend lineup poster listing live music on Friday, Saturday and Sunday', ['Events']),
  pastParty: P('past-party-1980s', 'A themed party evening with a poster headline "What if Kling started in 1980s?"', ['Events', 'Celebrations']),
} as const satisfies Record<string, Photo>

export const VIDEOS = {
  chefPlating: { slug: 'chef-plating', label: 'Chef plating a dish in a dark kitchen' },
  kitchenPrep: { slug: 'kitchen-prep', label: 'A cook preparing food in the kitchen' },
  neonNight: { slug: 'neon-night', label: 'Guests under lanterns at night' },
} as const

export const photoUrl = (slug: string, size: 'full' | 'small' = 'full') =>
  `/media/photo/${slug}${size === 'small' ? '-640' : ''}.webp`
export const photoSrcSet = (slug: string) => `${photoUrl(slug, 'small')} 640w, ${photoUrl(slug)} 1080w`
