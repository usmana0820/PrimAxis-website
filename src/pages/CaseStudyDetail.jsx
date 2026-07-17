import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppChat from '../components/WhatsAppChat'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import { getCaseStudyBySlug, getCaseStudyUrl } from '../constants/caseStudies'
import { firebaseReady } from '../lib/firebase'
import { fetchPublishedProjectBySlug } from '../services/projects'
import { normalizeProject } from '../utils/projectAdapter'
import PreviewHeroBackground from '../components/PreviewHeroBackground'
import PreviewHeroAside from '../components/PreviewHeroAside'
import PreviewFinalCTA from '../components/PreviewFinalCTA'
import { usePublishedProjects } from '../hooks/usePublishedProjects'

const WORKFLOW_STEPS = [
  { label: 'Discovery', icon: '🔍' },
  { label: 'Planning', icon: '📐' },
  { label: 'UI/UX Design', icon: '🎨' },
  { label: 'Development', icon: '💻' },
  { label: 'Testing & QA', icon: '🧪' },
  { label: 'Deployment', icon: '🚀' },
  { label: 'Support', icon: '🛟' },
]

const FEATURE_ICONS = ['🏠', '👥', '📊', '🔐', '📧', '🔍', '⚡', '📱', '🌐', '💡', '📈', '🛠️']
const SERVICE_ICONS = ['📊', '🎨', '💻', '☁️', '🔧', '📋', '🧪', '🚀']
const CHALLENGE_BORDERS = ['rose', 'amber', 'cyan', 'indigo']

const FRONTEND_KEYS = ['react', 'vue', 'angular', 'tailwind', 'typescript', 'javascript', 'next', 'flutter', 'html', 'css', 'vite']
const BACKEND_KEYS = ['django', 'python', 'node', 'express', 'firebase', 'postgresql', 'mysql', 'api', 'laravel', 'php', 'java', 'spring']

function parseMultilineBullets(text) {
  if (!text) return []
  return String(text)
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function splitSentences(text) {
  if (!text) return []
  const lines = parseMultilineBullets(text)
  if (lines.length > 1) return lines
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10)
}

function splitChallengePoints(text) {
  const lines = parseMultilineBullets(text)
  if (lines.length > 1) return lines.slice(0, 8)
  return splitSentences(text).slice(0, 8)
}

function parseChallengeItems(text) {
  return splitChallengePoints(text).map((point) => {
    const colon = point.indexOf(':')
    if (colon > 0 && colon < 60) {
      return { title: point.slice(0, colon).trim(), desc: point.slice(colon + 1).trim() }
    }
    const words = point.split(/\s+/)
    if (words.length > 6) {
      return { title: words.slice(0, 4).join(' '), desc: words.slice(4).join(' ') }
    }
    return { title: point, desc: '' }
  })
}

function parseDurationMonths(duration) {
  if (!duration) return '—'
  const match = String(duration).match(/(\d+)/)
  return match ? match[1] : duration
}

function formatCompletedShort(publishedAt) {
  if (!publishedAt || publishedAt === 'Recently') return '—'
  const parts = publishedAt.split(' ')
  if (parts.length >= 2) {
    const monthMap = {
      january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
      july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
    }
    const mm = monthMap[parts[0].toLowerCase()] || '01'
    const yy = String(parts[1]).slice(-2)
    return `${mm}.${yy}`
  }
  return publishedAt
}

function groupTechStack(techList) {
  const groups = { frontend: [], backend: [], other: [] }
  ;(techList || []).forEach((t) => {
    const lower = t.toLowerCase()
    if (FRONTEND_KEYS.some((k) => lower.includes(k))) groups.frontend.push(t)
    else if (BACKEND_KEYS.some((k) => lower.includes(k))) groups.backend.push(t)
    else groups.other.push(t)
  })
  return [
    { label: 'Frontend', tone: 'primary', items: groups.frontend },
    { label: 'Backend', tone: 'secondary', items: groups.backend },
    { label: 'Database & Cloud', tone: 'accent', items: groups.other },
  ].filter((g) => g.items.length)
}

function parseImpactKpis(outcomes, result) {
  const source = [...(outcomes || []), ...(result ? [result] : [])]
  const items = []

  source.forEach((text, i) => {
    const pct = text.match(/(\d+)\s*%/)
    if (pct) {
      items.push({
        variant: i % 2 === 0 ? 'a' : 'b',
        value: pct[1],
        suffix: '%',
        label: text.replace(/\d+\s*%\s*/i, '').replace(/^increase in\s*/i, '').replace(/^reduction in\s*/i, '').trim() || text,
      })
      return
    }
    const mult = text.match(/([\d.]+)\s*[×x]/i)
    if (mult) {
      items.push({ variant: 'plain', value: `${mult[1]}x`, suffix: '', label: text.replace(/[\d.]+\s*[×x]\s*/i, '').trim() || text })
      return
    }
    items.push({ variant: i % 2 === 0 ? 'a' : 'b', value: null, suffix: '', label: text })
  })

  if (items.length) return items.slice(0, 3)

  return [
    { variant: 'a', value: '35', suffix: '%', label: 'Increase in Lead Conversion' },
    { variant: 'b', value: '60', suffix: '%', label: 'Reduction in Manual Work' },
    { variant: 'plain', value: '2.4x', suffix: '', label: 'Faster Response Times' },
  ]
}

function buildSolutionSteps(study) {
  const fromFeatures = (study.features || []).slice(0, 4).map((f) => ({
    title: f,
    desc: '',
  }))
  if (fromFeatures.length >= 2) return fromFeatures

  const sentences = splitSentences(study.solution)
  if (sentences.length >= 2) {
    return sentences.slice(0, 4).map((s) => {
      const words = s.split(/\s+/)
      return {
        title: words.slice(0, 5).join(' '),
        desc: words.length > 5 ? words.slice(5).join(' ') : '',
      }
    })
  }

  return [{ title: 'Unified Platform', desc: study.solution || '' }]
}

function SectionIntro({ label, title, subtitle, center = true }) {
  return (
    <header className={`cs-preview-section-intro${center ? '' : ' cs-preview-section-intro-left'}`}>
      {label && <span className="cs-preview-label">{label}</span>}
      <h2 className="cs-preview-section-head">{title}</h2>
      {subtitle && <p className="cs-preview-section-sub">{subtitle}</p>}
    </header>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const staticStudy = getCaseStudyBySlug(slug)
  const [study, setStudy] = useState(() => (staticStudy ? normalizeProject(staticStudy) : null))
  const [loading, setLoading] = useState(Boolean(firebaseReady && !staticStudy))
  const { projects } = usePublishedProjects()

  useEffect(() => {
    if (!slug || !firebaseReady) {
      setLoading(false)
      return
    }
    fetchPublishedProjectBySlug(slug)
      .then((data) => {
        if (data) setStudy(normalizeProject(data))
        else if (!staticStudy) setStudy(null)
      })
      .catch(() => { if (!staticStudy) setStudy(null) })
      .finally(() => setLoading(false))
  }, [slug, staticStudy])

  useEffect(() => {
    if (!study) return
    document.title = study.seoTitle || `${study.title} | PrimeAxis Technologies`
    const meta = document.querySelector('meta[name="description"]')
    if (meta && study.seoDescription) {
      meta.setAttribute('content', study.seoDescription)
    }
  }, [study])

  const related = useMemo(
    () => projects.filter((p) => p.slug !== slug).slice(0, 3),
    [projects, slug]
  )

  const challengeItems = useMemo(
    () => parseChallengeItems(study?.challenge),
    [study]
  )

  const objectiveBullets = useMemo(() => {
    if (!study) return []
    const fromFeatures = (study.features || []).slice(0, 4)
    if (fromFeatures.length >= 2) return fromFeatures
    return splitChallengePoints(study.solution).slice(0, 4)
  }, [study])

  const techGroups = useMemo(() => groupTechStack(study?.tech), [study])
  const impactKpis = useMemo(
    () => parseImpactKpis(study?.outcomes, study?.result),
    [study]
  )
  const solutionSteps = useMemo(
    () => (study ? buildSolutionSteps(study) : []),
    [study]
  )

  if (loading) {
    return (
      <div className="cs-preview-page">
        <Navbar isSubpage />
        <div className="cs-preview-loading">Loading project showcase…</div>
        <Footer />
      </div>
    )
  }

  if (!study) return <NotFound />

  const features = study.features?.length ? study.features : study.outcomes?.slice(0, 8) || []
  const statusLabel = study.projectStatus === 'ongoing' ? 'Ongoing' : 'Completed'
  const isLive = study.projectStatus !== 'ongoing' && (study.liveDemoUrl || study.projectStatus === 'completed')
  const heroImage = study.coverImage || study.galleryImages?.[0] || ''
  const solutionImage = study.galleryImages?.[0] || study.coverImage || heroImage
  const teamSize = study.teamMembers?.length || 'PrimeAxis'
  const executiveSummary = study.fullDescription || study.summary || study.description
  const clientGoals = study.challenge
    ? splitSentences(study.challenge)[0] || study.challenge
    : executiveSummary
  const businessReq = study.challenge || study.fullDescription
  const functionalReq = study.solution
  const expectedOutcome = study.result || study.outcomes?.[0] || study.businessImpact?.split('\n')[0] || ''

  return (
    <div className="cs-preview-page">
      <Navbar isSubpage />

      {/* Hero Banner */}
      <section className="cs-preview-hero theme-dark bg-hero-premium">
        <PreviewHeroBackground coverImage={heroImage || undefined} />

        <div className="cs-preview-hero-inner">
          <Reveal variant="slide-top">
            <Link to="/portfolio" className="cs-preview-back">← Back to Portfolio</Link>
          </Reveal>

          <div className="cs-preview-hero-grid">
            <Reveal variant="slide-top">
              <div>
                {(study.featured || study.fromCms) && (
                  <div className="cs-preview-featured-badge">
                    <span className="cs-preview-featured-dot" aria-hidden="true" />
                    {study.featured ? 'FEATURED PROJECT' : 'CASE STUDY'}
                  </div>
                )}

                <h1 className="cs-preview-hero-title">{study.title}</h1>

                <div className="cs-preview-hero-tags">
                  <span className="cs-preview-hero-tag">{study.industry}</span>
                  <span className="cs-preview-hero-tag">{study.category || 'Web Application'}</span>
                  <span className="cs-preview-hero-tag cs-preview-hero-tag-status">{statusLabel}</span>
                </div>

                <dl className="cs-preview-hero-meta">
                  {study.client && (
                    <div>
                      <dt>Client</dt>
                      <dd>{study.client}</dd>
                    </div>
                  )}
                  {study.duration && (
                    <div>
                      <dt>Duration</dt>
                      <dd>{study.duration}</dd>
                    </div>
                  )}
                  {study.publishedAt && (
                    <div>
                      <dt>Completed</dt>
                      <dd>{study.publishedAt}</dd>
                    </div>
                  )}
                </dl>

                <div className="cs-preview-hero-actions">
                  {study.liveDemoUrl ? (
                    <a
                      href={study.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-preview-btn-white"
                    >
                      🚀 Live Site
                    </a>
                  ) : (
                    <a href="/#contact" className="cs-preview-btn-white">🚀 Start a Project</a>
                  )}
                  {study.githubUrl && (
                    <a
                      href={study.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-preview-btn-outline"
                    >
                      GitHub Repo
                    </a>
                  )}
                  <a href="/#contact" className="cs-preview-btn-outline">✉️ Contact Us</a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} variant="scale">
              <PreviewHeroAside
                stats={[
                  {
                    value: parseDurationMonths(study.duration),
                    label: 'Months',
                    sub: 'Project Duration',
                  },
                  {
                    value: isLive ? '✓' : '…',
                    label: isLive ? 'Live' : 'In Progress',
                    sub: 'Status',
                    live: isLive,
                  },
                  {
                    value: typeof teamSize === 'number' ? teamSize : teamSize,
                    label: typeof teamSize === 'number' ? 'Experts' : 'Team',
                    sub: 'Team Size',
                  },
                  {
                    value: formatCompletedShort(study.publishedAt),
                    label: study.publishedAt?.split(' ')[1] || 'Year',
                    sub: 'Completed',
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>

        {study.tech?.length > 0 && (
          <div className="cs-preview-tech-bar">
            {study.tech.slice(0, 6).map((tag) => (
              <span key={tag} className="cs-preview-tech-chip">{tag}</span>
            ))}
          </div>
        )}
      </section>

      {/* Project Overview */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro label="The Story" title="Project Overview" />
          </Reveal>

          <div className="cs-preview-cards-3">
            <Reveal>
              <article className="cs-preview-card">
                <div className="cs-preview-card-head">
                  <span className="cs-preview-card-icon cs-preview-card-icon-primary" aria-hidden="true">📄</span>
                  <h3 className="cs-preview-card-title">Executive Summary</h3>
                </div>
                <p className="cs-preview-card-text">{executiveSummary}</p>
              </article>
            </Reveal>

            <Reveal delay={60}>
              <article className="cs-preview-card">
                <div className="cs-preview-card-head">
                  <span className="cs-preview-card-icon cs-preview-card-icon-secondary" aria-hidden="true">🎯</span>
                  <h3 className="cs-preview-card-title">Project Objectives</h3>
                </div>
                {objectiveBullets.length > 0 ? (
                  <ul className="cs-preview-list">
                    {objectiveBullets.map((item) => (
                      <li key={item}>
                        <span className="cs-preview-list-arrow" aria-hidden="true">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="cs-preview-card-text">{study.solution}</p>
                )}
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="cs-preview-card">
                <div className="cs-preview-card-head">
                  <span className="cs-preview-card-icon cs-preview-card-icon-accent" aria-hidden="true">🚩</span>
                  <h3 className="cs-preview-card-title">Client Goals</h3>
                </div>
                <p className="cs-preview-card-text">{clientGoals}</p>
              </article>
            </Reveal>
          </div>

          <div className="cs-preview-cards-2">
            <Reveal>
              <article className="cs-preview-card">
                <h3 className="cs-preview-card-title">📋 Business Requirements</h3>
                <p className="cs-preview-card-text cs-preview-card-text-spaced">{businessReq}</p>
              </article>
            </Reveal>
            <Reveal delay={60}>
              <article className="cs-preview-card">
                <h3 className="cs-preview-card-title">⚙️ Functional Requirements</h3>
                <p className="cs-preview-card-text cs-preview-card-text-spaced">{functionalReq}</p>
              </article>
            </Reveal>
          </div>

          {expectedOutcome && (
            <Reveal delay={80}>
              <div className="cs-preview-outcome-banner">
                <h3>Expected Outcome</h3>
                <p>{expectedOutcome}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Business Challenges */}
      {challengeItems.length > 0 && (
        <section className="cs-preview-section">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro
                title="Business Challenges"
                subtitle="The obstacles that shaped our approach"
              />
            </Reveal>

            <div className="cs-preview-challenge-grid">
              {challengeItems.slice(0, 4).map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <article className={`cs-preview-challenge-item cs-preview-challenge-item-${CHALLENGE_BORDERS[i % CHALLENGE_BORDERS.length]}`}>
                    <h4>{item.title}</h4>
                    {item.desc && <p>{item.desc}</p>}
                  </article>
                </Reveal>
              ))}
            </div>

            {study.client && (
              <Reveal delay={100}>
                <blockquote className="cs-preview-quote">
                  &ldquo;We needed a unified system to replace fragmented tools and improve how our team serves customers.&rdquo;
                  <cite>— {study.client}</cite>
                </blockquote>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Our Solution */}
      {study.solution && (
        <section className="cs-preview-section cs-preview-section-muted">
          <div className="cs-preview-container">
            <div className="cs-preview-solution-grid">
              {solutionImage && (
                <Reveal variant="scale">
                  <div className="cs-preview-solution-image">
                    <img src={solutionImage} alt={`${study.title} solution preview`} />
                  </div>
                </Reveal>
              )}

              <div>
                <Reveal>
                  <span className="cs-preview-pill">Our Approach</span>
                  <h2 className="cs-preview-section-head cs-preview-solution-title">How we solved it</h2>
                  <p className="cs-preview-solution-lead">{study.solution}</p>
                </Reveal>

                <div className="cs-preview-solution-steps">
                  {solutionSteps.map((step, i) => (
                    <Reveal key={step.title} delay={i * 60}>
                      <div className="cs-preview-solution-step">
                        <span className="cs-preview-step-num">{i + 1}</span>
                        <div>
                          <h4>{step.title}</h4>
                          {step.desc && <p>{step.desc}</p>}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <section className="cs-preview-section">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro title="Key Features" />
            </Reveal>
            <div className="cs-preview-features-grid">
              {features.map((feature, i) => (
                <Reveal key={feature} delay={(i % 4) * 40} variant="scale">
                  <article className="cs-preview-feature-card">
                    <div className="cs-preview-feature-icon" aria-hidden="true">
                      {FEATURE_ICONS[i % FEATURE_ICONS.length]}
                    </div>
                    <h4>{feature}</h4>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technology Stack */}
      {study.tech?.length > 0 && (
        <section className="cs-preview-section cs-preview-section-muted">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro title="Technology Stack" />
            </Reveal>
            <div className="cs-preview-tech-groups">
              {(techGroups.length ? techGroups : [{ label: 'Technologies', tone: 'primary', items: study.tech }]).map((group, gi) => (
                <Reveal key={group.label} delay={gi * 60}>
                  <div>
                    <div className={`cs-preview-tech-group-label cs-preview-tech-group-label-${group.tone}`}>
                      {group.label}
                    </div>
                    <div className="cs-preview-tech-pills">
                      {group.items.map((item) => (
                        <span key={item} className="cs-preview-tech-pill">{item}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {study.galleryImages?.length > 0 && (
        <section className="cs-preview-section">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro title="Project Gallery" />
            </Reveal>
            <div className="cs-preview-gallery-grid">
              {study.galleryImages.map((img, i) => (
                <Reveal key={img} delay={i * 50} variant="scale">
                  <img src={img} alt={`${study.title} screenshot ${i + 1}`} loading="lazy" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Development Process */}
      <section className="cs-preview-section cs-preview-section-muted">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro title="Development Process" />
          </Reveal>
          <div className="cs-preview-process-row">
            {WORKFLOW_STEPS.map((step, i) => (
              <Reveal key={step.label} delay={i * 35}>
                <div className="cs-preview-process-item">
                  <div className="cs-preview-process-icon" aria-hidden="true">{step.icon}</div>
                  <span>{step.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="cs-preview-section">
        <div className="cs-preview-container">
          <Reveal>
            <SectionIntro title="Business Impact" />
          </Reveal>
          <div className="cs-preview-kpi-grid">
            {impactKpis.map((kpi, i) => (
              <Reveal key={kpi.label} delay={i * 60} variant="scale">
                <article className={`cs-preview-kpi-card cs-preview-kpi-card-${kpi.variant}`}>
                  {kpi.value && (
                    <>
                      <div className="cs-preview-kpi-value">{kpi.value}</div>
                      {kpi.suffix && <div className="cs-preview-kpi-suffix">{kpi.suffix}</div>}
                    </>
                  )}
                  <div className="cs-preview-kpi-label">{kpi.label}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Delivered */}
      {study.services?.length > 0 && (
        <section className="cs-preview-section cs-preview-section-muted">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro title="Services Delivered" />
            </Reveal>
            <div className="cs-preview-services-grid">
              {study.services.map((service, i) => (
                <Reveal key={service} delay={(i % 4) * 40}>
                  <div className="cs-preview-service-card">
                    <span className="cs-preview-service-icon" aria-hidden="true">
                      {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                    </span>
                    <span>{service}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our Team */}
      {study.teamMembers?.length > 0 && (
        <section className="cs-preview-section">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro title="Our Team" />
            </Reveal>
            <div className="cs-preview-team-grid">
              {study.teamMembers.map((member, i) => (
                <Reveal key={`${member.name}-${member.role}`} delay={i * 60} variant="scale">
                  <article className="cs-preview-team-card">
                    <div className="cs-preview-team-avatar">
                      {member.image ? (
                        <img src={member.image} alt={member.name} />
                      ) : (
                        member.name?.[0] || '?'
                      )}
                    </div>
                    <div className="cs-preview-team-body">
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                      {member.bio && <p className="cs-preview-team-bio">{member.bio}</p>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="cs-preview-section cs-preview-section-muted">
          <div className="cs-preview-container">
            <Reveal>
              <SectionIntro title="Related Projects" center={false} />
            </Reveal>
            <div className="cs-preview-related-grid">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 70} variant="scale">
                  <Link to={getCaseStudyUrl(item.slug)} className="cs-preview-related-card">
                    <div className="cs-preview-related-media">
                      {item.coverImage ? (
                        <img src={item.coverImage} alt={item.title} loading="lazy" />
                      ) : (
                        <div className={`cs-preview-related-fallback bg-gradient-to-br ${item.gradient}`} />
                      )}
                    </div>
                    <div className="cs-preview-related-body">
                      <span>{item.industry}</span>
                      <h4>{item.title}</h4>
                      <span className="cs-preview-related-link">View Case Study →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <PreviewFinalCTA
        secondaryLabel="Schedule Consultation"
        secondaryHref="/#contact"
      />

      <Footer />
      <WhatsAppChat />
    </div>
  )
}
