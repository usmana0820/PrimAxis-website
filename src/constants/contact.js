export const WHATSAPP_NUMBER = '923717461694'
export const WHATSAPP_DISPLAY = '+92 371 7461694'
export const CONTACT_EMAIL = 'primeaxis.technologies19@gmail.com'
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hi PrimeAxis Technologies! I would like to discuss a project with your team.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
