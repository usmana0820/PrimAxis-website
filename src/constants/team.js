export const COMPANY_STATS = [
  { value: '7', label: 'Core Team Members' },
  { value: '4', label: 'Leadership Roles' },
  { value: '50+', label: 'Projects Delivered' },
]

export const LEADERSHIP_TEAM = [
  {
    name: 'Zoha Mahmood',
    role: 'Founder & Chief Executive Officer (CEO)',
    bio: 'Founded PrimeAxis and leads company vision, business strategy, operations, client relationships, and organizational growth.',
    focus: 'Vision, Strategy & Operations',
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    initials: 'ZM',
    themeId: 'ceo',
  },
  {
    name: 'Usmana Zulfiqar',
    role: 'Chief Technology Officer (CTO)',
    bio: 'Leads software engineering, web and mobile development, system architecture, backend engineering, API integration, DevOps, and technical innovation.',
    focus: 'Technology & Engineering',
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    initials: 'UZ',
    themeId: 'cto',
  },
  {
    name: 'Manahil Tehseen',
    role: 'Chief Business Officer (CBO) & Business Analyst',
    bio: 'Leads business analysis, Zoho ERP and CRM consulting, requirement gathering, solution design, proposal development, and process optimization.',
    focus: 'Business & Zoho Consulting',
    gradient: 'from-[#06B6D4] to-[#355C7D]',
    initials: 'MT',
    themeId: 'cbo',
  },
  {
    name: 'Zark Mahmood',
    role: 'Head of Digital Marketing',
    bio: 'Leads branding, SEO, social media marketing, content strategy, advertising campaigns, lead generation, and digital growth.',
    focus: 'Marketing & Brand Growth',
    gradient: 'from-rose-500 to-orange-500',
    initials: 'ZK',
    themeId: 'marketing',
  },
]

export const TEAM_MEMBERS = [
  {
    name: 'Syed Abdul Qayyum',
    role: 'AI Engineer',
    bio: 'Develops AI applications, intelligent automation, machine learning solutions, chatbot systems, and AI integrations.',
    focus: 'AI & Intelligent Automation',
    gradient: 'from-violet-500 to-purple-600',
    initials: 'AQ',
    themeId: 'ai',
  },
  {
    name: 'Sammia',
    role: 'UI/UX Designer',
    bio: 'Designs user experiences, interfaces, wireframes, prototypes, design systems, and responsive web and mobile layouts.',
    focus: 'Design & User Experience',
    gradient: 'from-fuchsia-500 to-pink-600',
    initials: 'SA',
    themeId: 'design',
  },
  {
    name: 'Ramsha',
    role: 'Sales & Business Development Executive',
    bio: 'Manages client acquisition, business development, sales consultations, partnership opportunities, and customer relationships.',
    focus: 'Sales & Business Development',
    gradient: 'from-emerald-500 to-teal-600',
    initials: 'RA',
    themeId: 'sales',
  },
]

/** Homepage leadership row */
export const LEADERSHIP = LEADERSHIP_TEAM

/** Homepage specialist preview */
export const TEAM_PREVIEW = TEAM_MEMBERS

/** Executive core — CEO, CTO, CBO only (detail page org chart) */
export const CORE_LEADERSHIP = LEADERSHIP_TEAM.slice(0, 3).map(({ name, focus, themeId }) => ({
  name,
  focus,
  themeId,
}))

export const ALL_TEAM = [...LEADERSHIP_TEAM, ...TEAM_MEMBERS]

export const ORG_ROLES = ALL_TEAM.map(({ name, role }) => ({ name, role }))
