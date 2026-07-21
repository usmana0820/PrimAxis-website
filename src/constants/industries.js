/** Homepage + CMS industry sectors — add new names here to extend both lists. */
export const INDUSTRY_SECTORS = [
  'Marketing Agencies',
  'Digital Marketing Agencies',
  'Food & Beverage',
  'Restaurants & Cafés',
  'Retail & E-commerce',
  'Healthcare',
  'Real Estate',
  'Construction',
  'Education',
  'Travel & Tourism',
  'Manufacturing',
  'Logistics & Supply Chain',
  'Finance & Accounting',
  'Professional Services',
  'Legal Firms',
  'Human Resources',
  'Inventory & Warehousing',
  'Wholesale & Distribution',
  'Automotive',
  'Non-Profit Organizations',
  'Hospitality & Hotels',
  'Fitness & Wellness',
  'Salons & Beauty',
  'Event Management',
  'Pharmaceutical',
  'Trading Companies',
]

/** Admin project form + filters — includes fallback for legacy/other values. */
export const PROJECT_INDUSTRIES = [...INDUSTRY_SECTORS, 'Other']

const GRADIENTS = [
  'from-[#355C7D] to-[#4F46E5]',
  'from-[#4F46E5] to-[#06B6D4]',
  'from-[#06B6D4] to-[#355C7D]',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-indigo-600',
  'from-red-500 to-rose-600',
  'from-violet-500 to-purple-600',
  'from-slate-600 to-slate-800',
  'from-cyan-500 to-blue-600',
  'from-sky-500 to-[#4F46E5]',
]

export function getIndustryDisplayCards() {
  return INDUSTRY_SECTORS.map((name, index) => ({
    name,
    gradient: GRADIENTS[index % GRADIENTS.length],
    icon: getIndustryIconKey(name),
  }))
}

function getIndustryIconKey(name) {
  const key = name.toLowerCase()
  if (key.includes('health') || key.includes('pharma') || key.includes('fitness') || key.includes('wellness')) return 'health'
  if (key.includes('food') || key.includes('restaurant') || key.includes('hospitality') || key.includes('hotel')) return 'hospitality'
  if (key.includes('retail') || key.includes('wholesale') || key.includes('distribution') || key.includes('inventory') || key.includes('warehouse')) return 'retail'
  if (key.includes('real estate') || key.includes('construction')) return 'building'
  if (key.includes('education')) return 'education'
  if (key.includes('travel') || key.includes('tourism') || key.includes('event') || key.includes('automotive')) return 'travel'
  if (key.includes('marketing') || key.includes('salon') || key.includes('beauty')) return 'marketing'
  if (key.includes('finance') || key.includes('legal') || key.includes('professional') || key.includes('trading')) return 'finance'
  if (key.includes('logistics') || key.includes('supply')) return 'logistics'
  if (key.includes('manufacturing')) return 'manufacturing'
  if (key.includes('human resources') || key.includes('non-profit')) return 'people'
  return 'business'
}
