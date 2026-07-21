import {
  EMPTY_PROJECT,
  PROJECT_CATEGORIES,
  PROJECT_INDUSTRIES,
} from '../constants/cmsOptions'
import { hydrateImpactFields } from './impactMetrics'
import { parseMultilineList } from './multilineList'

function asString(value) {
  return value == null ? '' : String(value)
}

function asStringArray(value) {
  if (Array.isArray(value)) return value.map((item) => String(item ?? '').trim()).filter(Boolean)
  if (value == null || value === '') return []
  if (typeof value === 'string') return parseMultilineList(value)
  return []
}

function asTeamMembers(value) {
  if (!Array.isArray(value)) return []
  return value
    .map((member) => ({
      role: asString(member?.role) || 'Developer',
      name: asString(member?.name).trim(),
    }))
    .filter((member) => member.name)
}

/** Normalize Firestore / legacy project docs for the admin form. */
export function sanitizeAdminProjectForm(data) {
  if (!data) return { ...EMPTY_PROJECT, featured: false }

  let impact
  try {
    impact = hydrateImpactFields(data)
  } catch {
    impact = { businessImpact: asString(data.businessImpact), impactMetrics: [] }
  }

  const service = Array.isArray(data.service)
    ? data.service.map((line) => String(line ?? '').trim()).filter(Boolean).join('\n')
    : asString(data.service)

  return {
    ...EMPTY_PROJECT,
    featured: false,
    ...data,
    title: asString(data.title),
    slug: asString(data.slug),
    category: PROJECT_CATEGORIES.includes(data.category) ? data.category : EMPTY_PROJECT.category,
    industry: PROJECT_INDUSTRIES.includes(data.industry) ? data.industry : EMPTY_PROJECT.industry,
    status: data.status === 'published' ? 'published' : 'draft',
    projectStatus: data.projectStatus === 'ongoing' ? 'ongoing' : 'completed',
    client: asString(data.client),
    service,
    duration: asString(data.duration),
    shortDescription: asString(data.shortDescription || data.description),
    fullDescription: asString(data.fullDescription || data.summary || data.shortDescription),
    problemStatement: asString(data.problemStatement || data.challenges || data.challenge),
    solution: asString(data.solution),
    result: asString(data.result),
    businessImpact: asString(impact.businessImpact),
    impactMetrics: Array.isArray(impact.impactMetrics)
      ? impact.impactMetrics.map((metric) => ({
          value: metric?.value ?? '',
          statement: asString(metric?.statement || metric?.label),
        }))
      : [],
    technologies: asStringArray(data.technologies || data.tech),
    features: asStringArray(data.features),
    teamMembers: asTeamMembers(data.teamMembers),
    coverImage: asString(data.coverImage),
    galleryImages: Array.isArray(data.galleryImages) && data.galleryImages.length
      ? data.galleryImages.map((url) => String(url || ''))
      : ['', '', ''],
    liveDemoUrl: asString(data.liveDemoUrl),
    githubUrl: asString(data.githubUrl),
    seoTitle: asString(data.seoTitle || data.title),
    seoDescription: asString(data.seoDescription || data.shortDescription),
    featured: Boolean(data.featured),
  }
}
