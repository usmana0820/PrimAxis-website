import { useEffect, useState } from 'react'
import { CASE_STUDIES } from '../constants/caseStudies'
import { firebaseReady } from '../lib/firebase'
import { fetchPublishedProjects } from '../services/projects'
import { mergePublishedProjects, normalizeProject, sortProjectsFeaturedFirst } from '../utils/projectAdapter'

export function usePublishedProjects() {
  const [projects, setProjects] = useState(() => sortProjectsFeaturedFirst(CASE_STUDIES.map(normalizeProject)))
  const [loading, setLoading] = useState(Boolean(firebaseReady))

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false)
      return
    }

    fetchPublishedProjects()
      .then((data) => {
        setProjects(mergePublishedProjects(data, CASE_STUDIES))
      })
      .catch(() => {
        setProjects(sortProjectsFeaturedFirst(CASE_STUDIES.map(normalizeProject)))
      })
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}
