import {
  buildImpactKpis,
  hydrateImpactFields,
  impactMetricsToOutcomes,
  normalizeImpactMetrics,
} from './impactMetrics'

const DEFAULT_GRADIENT = 'from-[#355C7D] to-[#4F46E5]'

const PREVIEW_BY_CATEGORY = {
  'Mobile App': 'mobile',
  'Web Application': 'web',
  'Zoho CRM': 'crm',
  'Zoho ERP': 'erp',
  AI: 'analytics',
  SaaS: 'dashboard',
  'UI/UX': 'web',
}

const CATEGORY_BY_PREVIEW = {
  crm: 'Zoho CRM',
  erp: 'Zoho ERP',
  mobile: 'Mobile App',
  analytics: 'AI',
  dashboard: 'SaaS',
  web: 'Web Application',
}

function inferCategory(project) {
  if (project.category) return project.category
  const preview = project.preview || PREVIEW_BY_CATEGORY[project.category] || 'web'
  return CATEGORY_BY_PREVIEW[preview] || 'Web Application'
}

function formatPublishedAt(value) {
  if (!value) return 'Recently'
  if (typeof value === 'string') return value
  if (value?.toDate) {
    return value.toDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  return 'Recently'
}

function parseOutcomes(project) {
  if (Array.isArray(project.outcomes) && project.outcomes.length) return project.outcomes
  const metrics = normalizeImpactMetrics(project.impactMetrics)
  if (metrics.length) return impactMetricsToOutcomes(metrics)
  if (!project.businessImpact) return []
  return project.businessImpact
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseServices(service) {
  if (!service) return []
  if (Array.isArray(service)) return service.filter(Boolean)
  return service
    .split(/\n|,/)
    .map((line) => line.trim())
    .filter(Boolean)
}

export function sortProjectsFeaturedFirst(projects) {
  return [...projects].sort((a, b) => {
    if (Boolean(b.featured) !== Boolean(a.featured)) {
      return Number(b.featured) - Number(a.featured)
    }
    return 0
  })
}

export function normalizeProject(project) {
  if (!project) return null

  const preview = project.preview || PREVIEW_BY_CATEGORY[project.category] || 'web'
  const shortDescription = project.shortDescription || project.description || ''
  const fullDescription = project.fullDescription || project.summary || shortDescription
  const impact = hydrateImpactFields(project)
  const outcomes = parseOutcomes({ ...project, impactMetrics: impact.metrics })

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    industry: project.industry || 'Other',
    tech: project.technologies || project.tech || [],
    description: shortDescription,
    summary: fullDescription,
    gradient: project.gradient || DEFAULT_GRADIENT,
    preview,
    client: project.client || '',
    service: project.service || '',
    services: parseServices(project.services || project.service),
    result: project.result || '',
    publishedAt: formatPublishedAt(project.publishedAt),
    readTime: project.readTime || '5 min read',
    challenge: project.problemStatement || project.challenges || project.challenge || '',
    solution: project.solution || '',
    outcomes,
    businessImpact: impact.summary || project.businessImpact || '',
    impactMetrics: impact.metrics,
    impactKpis: buildImpactKpis(impact.metrics, {
      result: project.result,
      outcomes,
    }),
    coverImage: project.coverImage || '',
    galleryImages: project.galleryImages || [],
    features: project.features || [],
    teamMembers: project.teamMembers || [],
    category: inferCategory({ ...project, preview }),
    duration: project.duration || '',
    projectStatus: project.projectStatus || 'completed',
    fullDescription,
    shortDescription,
    liveDemoUrl: project.liveDemoUrl || '',
    githubUrl: project.githubUrl || '',
    featured: Boolean(project.featured),
    fromCms: Boolean(project.fromCms),
    isSample: Boolean(project.isSample),
    seoTitle: project.seoTitle || project.title || '',
    seoDescription: project.seoDescription || shortDescription || '',
  }
}

export function mergePublishedProjects(firestoreProjects, staticProjects) {
  const normalizedFirestore = firestoreProjects.map((p) => ({
    ...normalizeProject(p),
    fromCms: true,
  }))
  const slugs = new Set(normalizedFirestore.map((p) => p.slug))
  const staticOnly = staticProjects
    .filter((p) => !slugs.has(p.slug))
    .map((p) => ({ ...normalizeProject(p), fromCms: false, isSample: true }))
  return sortProjectsFeaturedFirst([...normalizedFirestore, ...staticOnly])
}

export function getProjectFilterOptions(projects) {
  const industries = [...new Set(projects.map((p) => p.industry).filter(Boolean))].sort()
  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))].sort()
  return { industries, categories }
}
