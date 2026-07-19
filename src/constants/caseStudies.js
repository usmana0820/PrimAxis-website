/** Demo portfolio card only — add real projects through the admin CMS. */
export const SAMPLE_PORTFOLIO_PROJECT = {
  slug: 'real-estate-crm-management-system',
  title: 'Real Estate CRM Management System',
  category: 'Web Application',
  industry: 'Real Estate',
  featured: true,
  projectStatus: 'completed',
  client: 'Urban Estate Developers',
  shortDescription:
    'A modern CRM platform for real estate agencies to manage leads, properties, sales, and customer relationships efficiently.',
  fullDescription:
    'PrimeAxis Technologies developed a custom Real Estate CRM system to streamline property listings, automate lead management, track sales activities, and improve communication between agents and clients. The platform provides centralized data management, real-time reporting, and workflow automation to increase operational efficiency and boost sales performance.',
  problemStatement:
    'The client relied on spreadsheets and manual processes to manage property listings and customer leads. This caused duplicate records, delayed follow-ups, poor communication, and limited visibility into sales performance.',
  solution:
    'PrimeAxis Technologies designed and developed a centralized Real Estate CRM with automated lead assignment, property management, customer tracking, sales reporting, role-based access control, and real-time dashboards. The system significantly improved operational efficiency and customer engagement.',
  result: '35% increase in lead conversion',
  businessImpact:
    'The CRM improved sales efficiency, reduced manual work, and gave leadership real-time visibility into performance.',
  impactMetrics: [
    { label: 'Increase in Lead Conversion', value: 35, suffix: '%' },
    { label: 'Reduction in Manual Work', value: 60, suffix: '%' },
    { label: 'Faster Lead Response Time', value: 2.4, suffix: 'x' },
    { label: 'Sales Team Productivity', value: 45, suffix: '%' },
    { label: 'Reporting Accuracy', value: 80, suffix: '%' },
    { label: 'Customer Follow-up Rate', value: 50, suffix: '%' },
  ],
  features: [
    'Property Management',
    'Lead Management',
    'Customer Management',
    'Sales Dashboard',
    'Role Based Access',
    'Reports & Analytics',
    'Task Management',
    'Document Upload',
    'Email Notifications',
    'Search & Filters',
    'Responsive Design',
    'Activity Logs',
  ],
  technologies: ['React', 'Tailwind CSS', 'Django', 'Python', 'PostgreSQL', 'Firebase'],
  duration: '5 Months',
  service:
    'Business Analysis\nUI/UX Design\nFrontend Development\nBackend Development\nCRM Development\nDatabase Design\nAPI Integration\nDeployment\nTesting\nTechnical Support',
  teamMembers: [
    { role: 'Developer', name: 'Usmana Zulfiqar' },
    { role: 'Business Analyst', name: 'Manahil Tehseen' },
    { role: 'Marketing Specialist', name: 'Zoha Mahmood' },
  ],
  coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=960&h=600&fit=crop&q=80',
  galleryImages: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=960&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=960&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=960&h=600&fit=crop&q=80',
  ],
  seoTitle: 'Real Estate CRM Management System | PrimeAxis Technologies',
  seoDescription:
    'Custom Real Estate CRM developed by PrimeAxis Technologies featuring lead management, property listings, sales automation, analytics, and workflow optimization for real estate businesses.',
  gradient: 'from-[#355C7D] to-[#06B6D4]',
  preview: 'crm',
  publishedAt: 'March 2026',
  readTime: '7 min read',
}

/** Static sample shown when no CMS project replaces it by slug. */
export const CASE_STUDIES = [SAMPLE_PORTFOLIO_PROJECT]

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES.find((study) => study.slug === slug)
}

export function getCaseStudyUrl(slug) {
  return `/case-studies/${slug}`
}
