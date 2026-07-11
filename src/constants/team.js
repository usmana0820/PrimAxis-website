export const COMPANY_STATS = [
  { value: '25+', label: 'Team Members' },
  { value: '6', label: 'Departments' },
  { value: '1', label: 'Office — Lahore' },
]

export const LEADERSHIP = [
  {
    name: 'Usman Ali',
    role: 'Chief Executive Officer',
    department: 'Leadership',
    bio: 'Leads PrimeAxis strategy, client partnerships, and delivery excellence across Zoho, web, mobile, and AI projects.',
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    initials: 'UA',
  },
  {
    name: 'Sarah Malik',
    role: 'Head of Technology',
    department: 'Leadership',
    bio: 'Oversees architecture, engineering standards, and scalable solution design for enterprise and startup clients.',
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    initials: 'SM',
  },
  {
    name: 'Ahmed Khan',
    role: 'Director of Operations',
    department: 'Leadership',
    bio: 'Manages project delivery, Zoho implementations, and client success across multiple industries.',
    gradient: 'from-[#06B6D4] to-[#355C7D]',
    initials: 'AK',
  },
]

export const DEPARTMENTS = [
  {
    id: 'development',
    name: 'Software Development',
    head: 'Engineering Lead',
    summary: 'Full-stack web, mobile apps, APIs, and custom enterprise software using modern frameworks.',
    responsibilities: ['React & Next.js applications', 'Flutter & React Native apps', 'Backend APIs & integrations', 'Code review & best practices'],
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    icon: 'code',
  },
  {
    id: 'zoho',
    name: 'Zoho & ERP',
    head: 'Zoho Practice Lead',
    summary: 'End-to-end Zoho CRM, ERP, inventory, and workflow automation for SMEs and enterprises.',
    responsibilities: ['Zoho CRM & ERP setup', 'Custom functions & Deluge', 'Third-party integrations', 'Training & go-live support'],
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    icon: 'erp',
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    head: 'Design Lead',
    summary: 'User-centered interfaces, wireframes, prototypes, and brand-consistent digital experiences.',
    responsibilities: ['Wireframes & prototypes', 'Design systems', 'Mobile & web UI', 'Usability testing'],
    gradient: 'from-violet-500 to-purple-600',
    icon: 'design',
  },
  {
    id: 'qa',
    name: 'Quality Assurance',
    head: 'QA Manager',
    summary: 'Manual and automated testing to ensure secure, reliable, and performance-ready releases.',
    responsibilities: ['Functional & regression testing', 'Security checks', 'Performance testing', 'UAT coordination'],
    gradient: 'from-emerald-500 to-teal-600',
    icon: 'qa',
  },
  {
    id: 'support',
    name: 'Support & Maintenance',
    head: 'Support Lead',
    summary: 'Post-launch monitoring, bug fixes, updates, and long-term client success.',
    responsibilities: ['24/7 ticket handling', 'SLA-based support', 'System monitoring', 'Feature enhancements'],
    gradient: 'from-sky-500 to-[#4F46E5]',
    icon: 'support',
  },
  {
    id: 'consulting',
    name: 'Sales & Consulting',
    head: 'Business Consultant',
    summary: 'Discovery, requirements analysis, proposals, and digital transformation advisory.',
    responsibilities: ['Client discovery calls', 'Scope & estimation', 'Solution architecture', 'Account management'],
    gradient: 'from-rose-500 to-orange-500',
    icon: 'consulting',
  },
]

export const TEAM_PREVIEW = DEPARTMENTS.slice(0, 4)

export function getDepartmentById(id) {
  return DEPARTMENTS.find((dept) => dept.id === id)
}
