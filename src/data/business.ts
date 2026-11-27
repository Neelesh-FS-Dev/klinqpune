import { SOURCES } from './sources'

/**
 * Verified business facts. Phone, address and hours were matched across the owner's
 * published numbers and three listings on 27 Nov 2026. Confirm again before launch.
 */
export const BUSINESS = {
  name: 'KLINQ — Cocktails & Cuisine',
  shortName: 'KLINQ',
  tagline: 'Savor the luxury of fine dining.',
  positioning: 'Creative cuisine & signature cocktails in a stylish setting.',
  locality: 'Viman Nagar, Pune',
  address: {
    lines: [
      '5th Floor, Town Square, Mhada Colony',
      'New Airport Road, Near Dorabjee\'s',
      'Viman Nagar, Pune, Maharashtra 411014',
    ],
    mapUrl: 'https://www.google.com/maps?q=18.568575,73.9071232',
    source: SOURCES.district,
  },
  phones: [
    { display: '+91 91122 12057', tel: '+919112212057' },
    { display: '+91 91122 12075', tel: '+919112212075' },
  ],
  hours: { display: '12:30 PM to 1:00 AM, every day', source: SOURCES.zomato },
  instagram: { handle: '@klinqpune', url: 'https://www.instagram.com/klinqpune/' },
  reservations: [
    { label: 'Book on District', url: 'https://www.district.in/dining/pune/klinq-cocktails-cuisine-viman-nagar', note: 'Listing shows "Book a table".' },
    { label: 'Book on Zomato', url: 'https://www.zomato.com/pune/klinq-cocktails-cuisine-viman-nagar/book', note: 'Booking page for 2 guests.' },
    { label: 'Book on Swiggy Dineout', url: 'https://www.swiggy.com/restaurants/pune/viman-nagar/klinq-975056/dineout', note: 'Listing shows "Book a table".' },
  ],
  /** Cuisine categories as listed on Zomato; not all are confirmed on the current menu. */
  cuisines: ['North Indian', 'Asian', 'European', 'Continental', 'Italian', 'Lebanese'],
  experiences: ['Contemporary dining', 'Signature cocktails', 'Mocktails', 'Rooftop dining', 'Indoor dining', 'Outdoor seating', 'Live music', 'Social gatherings', 'Special events'],
  /** Listed on Swiggy Dineout (third-party). Confirm with the restaurant. */
  dietaryListed: ['Jain food', 'Vegan food'],
} as const
