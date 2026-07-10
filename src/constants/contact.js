export const WHATSAPP_NUMBER = '923717461694'
export const WHATSAPP_DISPLAY = '+92 371 7461694'
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hi PrimeAxis Technologies! I would like to discuss a project with your team.'

export const OFFICE_ADDRESS = 'Thokar Niaz Baig, Lahore, Pakistan'
export const OFFICE_ADDRESS_SHORT = 'Lahore — Thokar Niaz Baig'
export const OFFICE_MAP_URL = 'https://maps.google.com/?q=Thokar+Niaz+Baig,+Lahore,+Pakistan'
export const OFFICE_MAP_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=74.20%2C31.44%2C74.28%2C31.49&layer=mapnik&marker=31.467%2C74.241'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
