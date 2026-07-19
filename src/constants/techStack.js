export const TECH_STACK = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Bootstrap', icon: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B' },
  { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Swift', icon: 'https://cdn.simpleicons.org/swift/F05138' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/000000' },
  { name: 'MERN Stack', icon: 'https://cdn.simpleicons.org/express/000000' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Zoho CRM', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Zoho ERP', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Zoho Creator', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Zoho Books', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Zoho Analytics', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Zoho Flow', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Zoho Desk', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Deluge', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'Zoho API', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
]

/** Flat list for admin checkboxes and CMS validation */
export const TECH_STACK_OPTIONS = TECH_STACK.map((tech) => tech.name)

/** Grouped options shown in admin project form */
export const TECH_ADMIN_GROUPS = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    label: 'Mobile',
    items: ['Flutter', 'React Native', 'Kotlin', 'Java', 'Swift'],
  },
  {
    label: 'Backend',
    items: ['Python', 'Django', 'Node.js', 'Express.js', 'MERN Stack'],
  },
  {
    label: 'Database',
    items: ['PostgreSQL', 'SQL', 'MongoDB'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['Firebase', 'AWS', 'GitHub'],
  },
  {
    label: 'Zoho Platform',
    items: [
      'Zoho CRM',
      'Zoho ERP',
      'Zoho Creator',
      'Zoho Books',
      'Zoho Analytics',
      'Zoho Flow',
      'Zoho Desk',
      'Deluge',
      'Zoho API',
    ],
  },
]

export const TECH_CATEGORIES = [
  {
    category: 'Frontend',
    description: 'Modern interfaces built for speed and usability.',
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    items: ['React', 'Next.js', 'TypeScript', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    category: 'Mobile',
    description: 'Cross-platform apps for iOS and Android.',
    gradient: 'from-[#06B6D4] to-[#355C7D]',
    items: ['Flutter', 'React Native', 'Kotlin', 'Java', 'Swift'],
  },
  {
    category: 'Backend',
    description: 'Robust server-side architecture and APIs.',
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    items: ['Python', 'Django', 'Node.js', 'Express.js', 'MERN Stack'],
  },
  {
    category: 'Database',
    description: 'Reliable data storage and management.',
    gradient: 'from-emerald-500 to-teal-600',
    items: ['PostgreSQL', 'SQL', 'MongoDB'],
  },
  {
    category: 'Cloud',
    description: 'Scalable infrastructure and deployment.',
    gradient: 'from-sky-500 to-[#4F46E5]',
    items: ['Firebase', 'AWS', 'GitHub'],
  },
  {
    category: 'Zoho & CRM',
    description: 'Zoho CRM, ERP, automation, and enterprise integrations.',
    gradient: 'from-rose-500 to-orange-500',
    items: [
      'Zoho CRM',
      'Zoho ERP',
      'Zoho Creator',
      'Zoho Books',
      'Zoho Analytics',
      'Zoho Flow',
      'Zoho Desk',
      'Deluge',
      'Zoho API',
    ],
  },
]

export const HERO_FLOAT_TECH = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', style: 'hero-float-1' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20', style: 'hero-float-2' },
  { name: 'Zoho CRM', icon: 'https://cdn.simpleicons.org/zoho/E42527', style: 'hero-float-3' },
  { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B', style: 'hero-float-4' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28', style: 'hero-float-5' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff', style: 'hero-float-6' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', style: 'hero-float-7' },
  { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF', style: 'hero-float-8' },
  { name: 'AI Solutions', label: 'AI Solutions', style: 'hero-float-9' },
]

export function getTechByName(name) {
  return TECH_STACK.find((t) => t.name === name)
}

export function getTechIcon(name) {
  return getTechByName(name)?.icon ?? ''
}
