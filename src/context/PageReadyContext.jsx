import { createContext, useContext } from 'react'

export const PageReadyContext = createContext(true)

export function usePageReady() {
  return useContext(PageReadyContext)
}

export function PageReadyProvider({ ready, children }) {
  return (
    <PageReadyContext.Provider value={ready}>
      {children}
    </PageReadyContext.Provider>
  )
}
