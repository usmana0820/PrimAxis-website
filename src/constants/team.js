export const COMPANY_STATS = [
  { value: '7', label: 'Core Team Members' },
  { value: '4', label: 'Leadership Roles' },
  { value: '50+', label: 'Projects Delivered' },
]
export const LEADERSHIP_TEAM = [
 {
  name: 'Zoha Mahmood',
  role: 'Chief Executive Officer (CEO)',
  bio: 'Leads company vision, business strategy, operations, client relationships, organizational growth, and overall direction.',
  focus: 'Vision, Strategy & Operations',
  gradient: 'from-[#4F46E5] to-[#06B6D4]',
  initials: 'ZM',
  themeId: 'ceo',
},
{
  name: 'Usmana Zulfiqar',
  role: 'Chief Technology Officer (CTO)',
  bio: 'Leads technology vision, software engineering, web and mobile development, system architecture, backend solutions, and innovation.',
  focus: 'Technology & Engineering',
  gradient: 'from-[#06B6D4] to-[#355C7D]',
  initials: 'UZ',
  themeId: 'cto',
},
{
  name: 'Manahil Tehseen',
  role: 'Chief Business Officer (CBO)',
  bio: 'Leads business strategy, Zoho ERP and CRM consulting, requirements analysis, solution planning, and process optimization.',
  focus: 'Business & Zoho Consulting',
  gradient: 'from-[#06B6D4] to-[#355C7D]',
  initials: 'MT',
  themeId: 'cbo',
},
{
  name: 'Zark Mahmood',
  role: 'Head of Digital Marketing',
  bio: 'Leads digital marketing, brand development, SEO strategy, social campaigns, content planning, advertising, and growth.',
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
  bio: 'Develops AI applications, intelligent automation, machine learning models, chatbot systems, AI integrations, and innovative solutions.',
  focus: 'AI & Intelligent Automation',
  gradient: 'from-violet-500 to-purple-600',
  initials: 'AQ',
  themeId: 'ai',
},
{
  name: 'Sammia Muzaffar',
  role: 'UI/UX Designer',
  bio: 'Creates user experiences, interface designs, wireframes, prototypes, design systems, responsive layouts, and digital experiences.',
  focus: 'Design & User Experience',
  gradient: 'from-fuchsia-500 to-pink-600',
  initials: 'SM',
  themeId: 'design',
},
{
  name: 'Ramsha Tehseen',
  role: 'Sales & Business Development Executive',
  bio: 'Handles client acquisition, business development, sales strategy, partnership growth, customer relations, and market expansion.',
  focus: 'Sales & Business Development',
  gradient: 'from-emerald-500 to-teal-600',
  initials: 'RT',
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
