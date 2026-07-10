export const TECH_STACK = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B' },
  { name: 'Kotlin', icon: 'https://cdn.simpleicons.org/kotlin/7F52FF' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'MERN Stack', icon: 'https://cdn.simpleicons.org/express/000000' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Zoho CRM', icon: 'https://cdn.simpleicons.org/zoho/E42527' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
]

export const TECH_CATEGORIES = [
  {
    category: 'Frontend',
    description: 'Modern interfaces built for speed and usability.',
    gradient: 'from-[#355C7D] to-[#4F46E5]',
    items: ['React', 'Next.js', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    category: 'Mobile',
    description: 'Cross-platform apps for iOS and Android.',
    gradient: 'from-[#06B6D4] to-[#355C7D]',
    items: ['Flutter', 'React Native', 'Kotlin', 'Java'],
  },
  {
    category: 'Backend',
    description: 'Robust server-side architecture and APIs.',
    gradient: 'from-[#4F46E5] to-[#06B6D4]',
    items: ['Python', 'Django', 'Node.js', 'MERN Stack'],
  },
  {
    category: 'Database',
    description: 'Reliable data storage and management.',
    gradient: 'from-emerald-500 to-teal-600',
    items: ['PostgreSQL', 'SQL'],
  },
  {
    category: 'Cloud',
    description: 'Scalable infrastructure and deployment.',
    gradient: 'from-sky-500 to-[#4F46E5]',
    items: ['Firebase', 'AWS'],
  },
  {
    category: 'CRM',
    description: 'Enterprise customer relationship platforms.',
    gradient: 'from-rose-500 to-orange-500',
    items: ['Zoho CRM'],
  },
]

export const HERO_FLOAT_TECH = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', style: 'hero-float-1' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20', style: 'hero-float-2' },
  { name: 'Zoho', icon: 'https://cdn.simpleicons.org/zoho/E42527', style: 'hero-float-3' },
  { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B', style: 'hero-float-4' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg', style: 'hero-float-5' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff', style: 'hero-float-6' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', style: 'hero-float-7' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933', style: 'hero-float-8' },
  { name: 'AI Solutions', label: 'AI Solutions', style: 'hero-float-9' },
]

export function getTechByName(name) {
  return TECH_STACK.find((t) => t.name === name)
}

export function getTechIcon(name) {
  return getTechByName(name)?.icon ?? ''
}
