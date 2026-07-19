import { useEffect, useState } from 'react'
import { CASE_STUDIES } from '../constants/caseStudies'
import { firebaseReady } from '../lib/firebase'
import { fetchPublishedProjects } from '../services/projects'
import { mergePublishedProjects } from '../utils/projectAdapter'

function getPortfolioProjects(cmsProjects = []) {
  return mergePublishedProjects(cmsProjects, CASE_STUDIES)
}

export function usePublishedProjects() {
  const [projects, setProjects] = useState(() => getPortfolioProjects())
  const [loading, setLoading] = useState(Boolean(firebaseReady))

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false)
      return
    }

    fetchPublishedProjects()
      .then((data) => {
        setProjects(getPortfolioProjects(data))
      })
      .catch(() => {
        setProjects(getPortfolioProjects())
      })
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}
