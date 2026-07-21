import { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageUpload from '../../components/admin/ImageUpload'
import ProjectGalleryPicker from '../../components/admin/ProjectGalleryPicker'
import BusinessImpactEditor from '../../components/admin/BusinessImpactEditor'
import PortfolioCard from '../../components/PortfolioCard'
import { normalizeProject } from '../../utils/projectAdapter'
import { estimateImagePayloadBytes, getImageStorageMode } from '../../lib/projectImages'
import { formatMultilineList, mergeMultilineList, parseMultilineList } from '../../utils/multilineList'
import { normalizeExternalUrl } from '../../utils/url'
import { MAX_IMPACT_METRICS } from '../../utils/impactMetrics'
import { sanitizeAdminProjectForm } from '../../utils/projectForm'
import {
  EMPTY_PROJECT,
  PROJECT_CATEGORIES,
  PROJECT_INDUSTRIES,
  DELIVERY_STATUSES,
  TECH_ADMIN_GROUPS,
  TEAM_ROLES,
  slugify,
} from '../../constants/cmsOptions'
import { canManageProject, createProject, fetchProjectById, updateProject, deleteProject } from '../../services/projects'
import { useAuth } from '../../context/useAuth'

function FormSection({ number, title, children, className = '' }) {
  return (
    <section className={`admin-form-card ${className}`}>
      <div className="admin-form-card-head">
        <span className="admin-form-badge">{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function AdminProjectForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [form, setForm] = useState({ ...EMPTY_PROJECT, featured: false })
  const [featureBulkInput, setFeatureBulkInput] = useState('')
  const [teamRole, setTeamRole] = useState(TEAM_ROLES[0])
  const [teamName, setTeamName] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const canDelete = isEdit && canManageProject(form, user?.uid)

  useEffect(() => {
    if (!isEdit) return

    if (!user?.uid) {
      if (!authLoading) setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    fetchProjectById(id)
      .then((data) => {
        if (!data) throw new Error('Project not found')
        if (data.createdBy && data.createdBy !== user.uid) {
          throw new Error('You can only edit projects you created.')
        }
        setForm(sanitizeAdminProjectForm(data))
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, isEdit, user?.uid, authLoading])

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const toggleTech = (tech) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }))
  }

  const addFeaturesFromBulk = () => {
    const parsed = parseMultilineList(featureBulkInput)
    if (!parsed.length) return
    setForm((prev) => ({
      ...prev,
      features: mergeMultilineList(prev.features, featureBulkInput),
    }))
    setFeatureBulkInput('')
  }

  const removeFeature = (index) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
  }

  const addTeamMember = () => {
    if (!teamName.trim()) return
    setForm((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { role: teamRole, name: teamName.trim() }],
    }))
    setTeamName('')
  }

  const removeTeamMember = (index) => {
    setForm((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }))
  }

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: isEdit ? prev.slug : slugify(value),
      seoTitle: prev.seoTitle || value,
    }))
  }

  const save = async (status) => {
    if (!form.title.trim()) {
      setError('Project title is required')
      return
    }

    setSaving(true)
    setError('')

    const payload = {
      ...form,
      status,
      slug: form.slug || slugify(form.title),
      galleryImages: form.galleryImages.filter(Boolean),
      liveDemoUrl: normalizeExternalUrl(form.liveDemoUrl),
      githubUrl: normalizeExternalUrl(form.githubUrl),
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.shortDescription,
      businessImpact: String(form.businessImpact || '').trim(),
      impactMetrics: (form.impactMetrics || [])
        .slice(0, MAX_IMPACT_METRICS)
        .map((metric) => ({
          value: metric.value === '' || metric.value == null ? '' : Number(metric.value),
          statement: String(metric.statement ?? metric.label ?? '').trim(),
        }))
        .filter(
          (metric) =>
            metric.statement &&
            metric.value !== '' &&
            metric.value != null &&
            !Number.isNaN(Number(metric.value))
        ),
    }

    delete payload.id
    delete payload.createdBy
    delete payload.createdAt
    delete payload.updatedAt
    delete payload.publishedAt

    try {
      if (isEdit) {
        if (form.createdBy && form.createdBy !== user.uid) {
          throw new Error('You can only edit projects you created.')
        }
        await updateProject(id, payload)
      } else {
        await createProject(payload, user.uid)
      }
      navigate('/admin/projects')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!isEdit || !canDelete) return

    const statusLabel = form.status === 'published' ? 'published' : 'draft'
    const confirmed = window.confirm(
      `Delete "${form.title}"?\n\nThis ${statusLabel} project will be removed permanently from the admin, portfolio, and case studies. This cannot be undone.`
    )
    if (!confirmed) return

    setDeleting(true)
    setError('')
    try {
      await deleteProject(id)
      navigate('/admin/projects')
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const previewUrl = form.slug ? `/case-studies/${form.slug}` : null

  const cardPreview = useMemo(
    () =>
      normalizeProject({
        ...form,
        status: 'published',
        fromCms: true,
      }),
    [form]
  )

  if (loading) {
    return <div className="admin-page admin-page-wide"><p>Loading project…</p></div>
  }

  if (isEdit && error && !form.title) {
    return (
      <div className="admin-page admin-page-wide">
        <header className="admin-page-hero">
          <div>
            <h1>Edit Project</h1>
            <p className="admin-form-error">{error}</p>
          </div>
          <Link to="/admin/projects" className="admin-btn admin-btn-outline">← All Projects</Link>
        </header>
      </div>
    )
  }

  return (
    <div className="admin-form-page">
      <header className="admin-page-hero">
        <div>
          <h1>{isEdit ? 'Edit Project' : 'Add New Project'}</h1>
          <p>Fill in project details — images upload to Cloudinary, URLs save in Firestore.</p>
        </div>
        <div className="admin-page-hero-actions">
          {isEdit && canDelete && (
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              disabled={saving || deleting}
              onClick={handleDelete}
            >
              {deleting ? 'Deleting…' : 'Delete Project'}
            </button>
          )}
          <Link to="/admin/projects" className="admin-btn admin-btn-outline">← All Projects</Link>
        </div>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      <form className="admin-form-layout" onSubmit={(e) => e.preventDefault()}>
        <div className="admin-form-columns">
          <FormSection number={1} title="Project Information">
            <label className="admin-label">
              Project Title
              <input className="admin-input" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
            </label>
            <label className="admin-label">
              Project Slug
              <input className="admin-input" value={form.slug} onChange={(e) => update('slug', slugify(e.target.value))} />
            </label>
            <div className="admin-form-row">
              <label className="admin-label">
                Project Category
                <select className="admin-input" value={form.category} onChange={(e) => update('category', e.target.value)}>
                  {PROJECT_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label className="admin-label">
                Client Industry
                <select className="admin-input" value={form.industry} onChange={(e) => update('industry', e.target.value)}>
                  {PROJECT_INDUSTRIES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <div className="admin-form-row">
              <label className="admin-label">
                Client Name
                <input className="admin-input" value={form.client} onChange={(e) => update('client', e.target.value)} />
              </label>
              <label className="admin-label">
                Project Status
                <select className="admin-input" value={form.projectStatus} onChange={(e) => update('projectStatus', e.target.value)}>
                  {DELIVERY_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>
            </div>
            <label className="admin-toggle-row">
              <span>Featured Project</span>
              <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
            </label>
            <div className="admin-subsection admin-subsection-compact">
              <h3>Project Links <span className="admin-optional-tag">Optional</span></h3>
              <p className="admin-field-hint">
                Add live production and GitHub URLs — they appear on portfolio cards and the case study page.
              </p>
              <div className="admin-form-row">
                <label className="admin-label">
                  Live Production URL
                  <input
                    className="admin-input"
                    type="url"
                    inputMode="url"
                    value={form.liveDemoUrl || ''}
                    onChange={(e) => update('liveDemoUrl', e.target.value)}
                    placeholder="https://yourproject.com"
                  />
                </label>
                <label className="admin-label">
                  GitHub Repository URL
                  <input
                    className="admin-input"
                    type="url"
                    inputMode="url"
                    value={form.githubUrl || ''}
                    onChange={(e) => update('githubUrl', e.target.value)}
                    placeholder="https://github.com/org/repo"
                  />
                </label>
              </div>
            </div>
          </FormSection>

          <FormSection number={2} title="Short Overview">
            <label className="admin-label">
              Short Description
              <textarea className="admin-input admin-textarea" rows={2} maxLength={120} value={form.shortDescription} onChange={(e) => update('shortDescription', e.target.value)} />
              <span className="admin-char-count">{form.shortDescription.length}/120</span>
            </label>
            <label className="admin-label">
              Project Summary
              <textarea className="admin-input admin-textarea" rows={4} maxLength={500} value={form.fullDescription} onChange={(e) => update('fullDescription', e.target.value)} />
              <span className="admin-char-count">{form.fullDescription.length}/500</span>
            </label>
          </FormSection>

          <FormSection number={3} title="Project Details" className="admin-form-card-wide">
            <div className="admin-form-row">
              <label className="admin-label">
                Challenge
                <span className="admin-field-hint">Keep this to one or two short lines.</span>
                <textarea className="admin-input admin-textarea" rows={2} maxLength={320} value={form.problemStatement} onChange={(e) => update('problemStatement', e.target.value)} />
              </label>
              <label className="admin-label">
                Solution
                <span className="admin-field-hint">Keep this to one or two short lines.</span>
                <textarea className="admin-input admin-textarea" rows={2} maxLength={320} value={form.solution} onChange={(e) => update('solution', e.target.value)} />
              </label>
            </div>
            <label className="admin-label">
              Key Result
              <span className="admin-field-hint">One headline outcome, e.g. 35% increase in lead conversion.</span>
              <input className="admin-input" value={form.result} onChange={(e) => update('result', e.target.value)} placeholder="e.g. 35% increase in lead conversion" />
            </label>
            <BusinessImpactEditor
              summary={form.businessImpact}
              onSummaryChange={(value) => update('businessImpact', value)}
              metrics={form.impactMetrics || []}
              onChange={(impactMetrics) => update('impactMetrics', impactMetrics)}
            />

            <div className="admin-subsection">
              <h3>Key Features</h3>
              <p className="admin-field-hint">
                Enter one feature per line. Blank lines are ignored — paste or type several lines, then click Add Features.
              </p>
              <label className="admin-label">
                Add features (one per line)
                <textarea
                  className="admin-input admin-textarea"
                  rows={5}
                  value={featureBulkInput}
                  onChange={(e) => setFeatureBulkInput(e.target.value)}
                  placeholder={'Property Management\nLead Management\n\nUI/UX Design\nSales Dashboard'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault()
                      addFeaturesFromBulk()
                    }
                  }}
                />
              </label>
              <div className="admin-inline-add">
                <button type="button" className="admin-btn admin-btn-outline" onClick={addFeaturesFromBulk}>
                  + Add Features
                </button>
                <span className="admin-char-count">
                  {parseMultilineList(featureBulkInput).length > 0
                    ? `${parseMultilineList(featureBulkInput).length} feature(s) ready to add`
                    : 'Tip: Ctrl+Enter to add quickly'}
                </span>
              </div>
              <label className="admin-label admin-label-spaced">
                All features ({form.features.length})
                <textarea
                  className="admin-input admin-textarea"
                  rows={6}
                  value={formatMultilineList(form.features)}
                  onChange={(e) => update('features', parseMultilineList(e.target.value))}
                  placeholder="One feature per line"
                />
              </label>
              {form.features.length > 0 && (
                <ul className="admin-chip-list">
                  {form.features.map((feature, index) => (
                    <li key={`${feature}-${index}`}>
                      {feature}
                      <button type="button" onClick={() => removeFeature(index)} aria-label="Remove">×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="admin-subsection">
              <h3>Technologies Used</h3>
              <p className="admin-muted admin-tech-picker-hint">
                Select all technologies used in this project, including mobile, cloud, and Zoho platform tools.
              </p>
              {TECH_ADMIN_GROUPS.map((group) => (
                <div key={group.label} className="admin-tech-group">
                  <h4 className="admin-tech-group-label">{group.label}</h4>
                  <div className="admin-check-grid">
                    {group.items.map((tech) => (
                      <label key={tech} className="admin-check-item">
                        <input
                          type="checkbox"
                          checked={form.technologies.includes(tech)}
                          onChange={() => toggleTech(tech)}
                        />
                        {tech}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-form-row">
              <label className="admin-label">
                Project Duration
                <input className="admin-input" value={form.duration} onChange={(e) => update('duration', e.target.value)} placeholder="e.g. 5 Months" />
              </label>
              <label className="admin-label">
                Services Delivered (one per line)
                <textarea
                  className="admin-input admin-textarea"
                  rows={4}
                  value={form.service}
                  onChange={(e) => update('service', e.target.value)}
                  placeholder={'Business Analysis\nUI/UX Design\nFrontend Development'}
                />
              </label>
            </div>

            <div className="admin-subsection">
              <h3>Team Members</h3>
              <div className="admin-inline-add">
                <select className="admin-input" value={teamRole} onChange={(e) => setTeamRole(e.target.value)}>
                  {TEAM_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
                <input className="admin-input" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Name" />
                <button type="button" className="admin-btn admin-btn-outline" onClick={addTeamMember}>Add</button>
              </div>
              <ul className="admin-chip-list">
                {form.teamMembers.map((member, index) => (
                  <li key={`${member.name}-${index}`}>{member.role}: {member.name}<button type="button" onClick={() => removeTeamMember(index)} aria-label="Remove">×</button></li>
                ))}
              </ul>
            </div>
          </FormSection>

          <FormSection number={4} title="Image Upload" className="admin-form-card-wide">
            {getImageStorageMode() === 'local' ? (
              <p className="admin-upload-info">
                Gallery pick works without Cloudinary — photos are auto-compressed and saved in your project.
                Optional: add Cloudinary to <code>.env.local</code> for CDN hosting.
              </p>
            ) : (
              <p className="admin-upload-info admin-upload-info-ok">
                Cloudinary connected — images upload to CDN automatically.
              </p>
            )}

            {estimateImagePayloadBytes(form.coverImage, form.galleryImages) > 850_000 && (
              <p className="admin-form-error">
                Total image size is large. Remove some gallery photos or add Cloudinary for better storage.
              </p>
            )}

            <ProjectGalleryPicker
              coverImage={form.coverImage}
              galleryImages={form.galleryImages}
              onApply={({ coverImage, galleryImages }) => {
                setForm((prev) => ({ ...prev, coverImage, galleryImages }))
              }}
            />

            <p className="admin-upload-section-hint">
              First selected photo becomes the cover (if empty). The rest fill gallery slots automatically.
            </p>

            <div className="admin-upload-grid">
              <ImageUpload label="Cover Image" value={form.coverImage} onChange={(url) => update('coverImage', url)} variant="compact" />
              {form.galleryImages.map((url, index) => (
                <ImageUpload
                  key={`gallery-${index}`}
                  label={`Gallery ${index + 1}`}
                  value={url}
                  variant="compact"
                  onChange={(next) => {
                    const gallery = [...form.galleryImages]
                    gallery[index] = next
                    update('galleryImages', gallery)
                  }}
                />
              ))}
            </div>
            {(form.coverImage || form.galleryImages.some(Boolean)) && (
              <div className="admin-image-preview-row">
                {[form.coverImage, ...form.galleryImages.filter(Boolean)].map((url) => (
                  <img key={url} src={url} alt="Preview" />
                ))}
              </div>
            )}
          </FormSection>

          <FormSection number={5} title="SEO">
            <label className="admin-label">
              Meta Title
              <input className="admin-input" value={form.seoTitle} onChange={(e) => update('seoTitle', e.target.value)} />
            </label>
            <label className="admin-label">
              Meta Description
              <textarea className="admin-input admin-textarea" rows={2} value={form.seoDescription} onChange={(e) => update('seoDescription', e.target.value)} />
            </label>
          </FormSection>

          <FormSection number={6} title="Portfolio Card Preview" className="admin-form-card-wide">
            <p className="admin-upload-section-hint">
              Card preview shows a short summary only — full project details appear on the case study page after publishing.
            </p>
            <div className="admin-live-card-preview">
              <PortfolioCard item={cardPreview} compact />
            </div>
          </FormSection>

          {isEdit && canDelete && (
            <FormSection number={7} title="Delete Project" className="admin-form-card-wide admin-form-danger-zone">
              <p className="admin-danger-zone-text">
                Permanently remove this project from the CMS, portfolio, and case studies.
                {form.status === 'published' && ' This project is currently published on the live site.'}
              </p>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                disabled={saving || deleting}
                onClick={handleDelete}
              >
                {deleting ? 'Deleting…' : 'Delete Project'}
              </button>
            </FormSection>
          )}
        </div>

        <div className="admin-form-footer">
          {isEdit && canDelete && (
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              disabled={saving || deleting}
              onClick={handleDelete}
            >
              {deleting ? 'Deleting…' : 'Delete Project'}
            </button>
          )}
          <div className="admin-form-footer-right">
            <button type="button" className="admin-btn admin-btn-outline" disabled={saving || deleting} onClick={() => save('draft')}>
              Save Draft
            </button>
            {previewUrl && (
              <a href={previewUrl} target="_blank" rel="noreferrer" className="admin-btn admin-btn-outline">
                Preview Project
              </a>
            )}
            <button type="button" className="admin-btn admin-btn-primary" disabled={saving || deleting} onClick={() => save('published')}>
              {saving ? 'Saving…' : 'Publish Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
