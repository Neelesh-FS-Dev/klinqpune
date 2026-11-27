import { BUSINESS } from '../data/business'

export const telHref = (tel: string) => `tel:${tel}`
export const RESERVE_PRIMARY = BUSINESS.reservations[0]
export const isExternal = (href: string) => /^https?:\/\//.test(href)
