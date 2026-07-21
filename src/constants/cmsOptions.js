export const PROJECT_CATEGORIES = [
  'Mobile App',
  'Web Application',
  'Zoho CRM',
  'Zoho ERP',
  'AI',
  'SaaS',
  'UI/UX',
]

export { PROJECT_INDUSTRIES } from './industries'

export const PROJECT_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
]

export const DELIVERY_STATUSES = [
  { value: 'completed', label: 'Completed' },
  { value: 'ongoing', label: 'Ongoing' },
]

export { TECH_STACK_OPTIONS, TECH_ADMIN_GROUPS } from './techStack'

export const TEAM_ROLE_CUSTOM = '__custom__'

export const TEAM_ROLES = [
  'Project Manager',
  'Software Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile App Developer',
  'Business Analyst',
  'UI/UX Designer',
  'AI Engineer',
  'QA Engineer',
  'Software Tester',
  'DevOps Engineer',
  'Digital Marketing Manager',
  'SEO Specialist',
  'Graphic Designer',
  'Sales Executive',
  'Business Development Executive',
  'Product Manager',
  'Technical Consultant',
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
