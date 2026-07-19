export const PROJECT_CATEGORIES = [
  'Mobile App',
  'Web Application',
  'Zoho CRM',
  'Zoho ERP',
  'AI',
  'SaaS',
  'UI/UX',
]

export const PROJECT_INDUSTRIES = [
  'Healthcare',
  'Construction',
  'Real Estate',
  'Restaurant',
  'Education',
  'Retail',
  'Manufacturing',
  'Finance',
  'Travel',
  'Startups',
  'Trading',
  'Other',
]

export const PROJECT_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
]

export const DELIVERY_STATUSES = [
  { value: 'completed', label: 'Completed' },
  { value: 'ongoing', label: 'Ongoing' },
]

export { TECH_STACK_OPTIONS, TECH_ADMIN_GROUPS } from './techStack'

export const TEAM_ROLES = [
  'Developer',
  'Business Analyst',
  'Marketing',
  'Designer',
  'Project Manager',
]

export const USER_ROLES = {
  developer: { label: 'Developer', canDelete: true, canPublish: true },
  analyst: { label: 'Business Analyst', canDelete: false, canPublish: true },
  marketing: { label: 'Marketing', canDelete: false, canPublish: true },
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const EMPTY_PROJECT = {
  title: '',
  slug: '',
  category: 'Web Application',
  industry: 'Healthcare',
  status: 'draft',
  projectStatus: 'completed',
  client: '',
  service: '',
  duration: '',
  shortDescription: '',
  fullDescription: '',
  problemStatement: '',
  challenges: '',
  solution: '',
  businessImpact: '',
  impactMetrics: [],
  result: '',
  technologies: [],
  features: [],
  teamMembers: [],
  coverImage: '',
  galleryImages: ['', '', ''],
  liveDemoUrl: '',
  githubUrl: '',
  seoTitle: '',
  seoDescription: '',
}
