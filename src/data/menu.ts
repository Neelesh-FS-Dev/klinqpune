import type { MenuItem } from '../types'
import { SOURCES } from './sources'

/**
 * Only dish and drink names that appear in a published source are listed.
 * No prices, descriptions or ingredients are added beyond what the source states.
 * Confirm the current menu with the restaurant before relying on it.
 */
export const FOOD: MenuItem[] = [
  { name: 'Tempura Veggie Bao', group: 'Small plates', source: SOURCES.ownerGraphics },
  { name: 'Baos & Sushi', group: 'Small plates', source: SOURCES.swiggy },
  { name: 'Dim Sums', group: 'Small plates', source: SOURCES.swiggy },
  { name: 'Tofu Gochujang', group: 'Small plates', source: SOURCES.swiggy },
  { name: 'Falafel', group: 'Small plates', source: SOURCES.ownerGraphics },
  { name: 'Kasundi Fish Tikka', group: 'From the grill', source: SOURCES.ownerGraphics },
  { name: 'Ghee Roast Chicken', group: 'From the grill', source: SOURCES.ownerGraphics },
  { name: 'Mutton Seekh Kebab', group: 'From the grill', source: SOURCES.ownerGraphics },
  { name: 'Lasooni Murgh Tikka', group: 'From the grill', source: SOURCES.swiggy },
  { name: 'Anardana Paneer Tikka', group: 'From the grill', source: SOURCES.swiggy },
  { name: 'Lamb Adana Kebab', group: 'From the grill', source: SOURCES.swiggy },
  { name: 'Slow Cooked Chicken', group: 'From the grill', source: SOURCES.swiggy },
  { name: 'Lebanese Grilled Fish', group: 'Mains', source: SOURCES.swiggy },
  { name: 'Chilli Garlic Butter Poached Prawns', group: 'Mains', source: SOURCES.swiggy },
  { name: 'Kadhai Mix Veg', group: 'Mains', source: SOURCES.ownerGraphics },
  { name: 'Spinach & Ricotta Ravioli', group: 'Pasta & pizza', source: SOURCES.ownerGraphics },
  { name: 'Mawa Malai Cannelloni', group: 'Pasta & pizza', source: SOURCES.ownerGraphics },
  { name: 'Pizza from the oven', group: 'Pasta & pizza', note: 'Shown as "From the oven" in an owner graphic; the menu name is not confirmed.', source: SOURCES.ownerGraphics },
  { name: 'Butter-soaked bhaji with toasted pav', group: 'Sharing', note: 'Named in an owner reel caption; confirm the menu name.', source: SOURCES.ownerGraphics },
]

export const DRINKS: MenuItem[] = [
  {
    name: 'Naughty 30',
    group: 'Signature cocktails',
    alcoholic: true,
    note: 'Almond milk wash, Ballantine\'s whiskey, Kashmiri kahwa, basil, passionfruit and peach cordial, lime, fresh basil (as printed in the owner graphic).',
    source: SOURCES.ownerGraphics,
  },
  {
    name: 'Move On',
    group: 'Signature cocktails',
    alcoholic: true,
    note: 'Introduced as a KLINQ signature made with JW Blonde (owner post, 3 Nov 2026).',
    source: SOURCES.moveOnPost,
  },
]

export const MOCKTAILS_NOTE =
  'Mocktails are part of the published menu. Individual mocktail names have not been verified yet; ask at the bar or check the District or Zomato menu.'
