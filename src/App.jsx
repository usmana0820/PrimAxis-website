import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import OurTeam from './components/OurTeam'
import Services from './components/Services'
import WhyChoose from './components/WhyChoose'
import Industries from './components/Industries'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import SectionDivider from './components/SectionDivider'
import WhatsAppChat from './components/WhatsAppChat'
import { PageReadyProvider } from './context/PageReadyContext'

function App() {
  const [loading, setLoading] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800)
    const hideTimer = setTimeout(() => setLoading(false), 2400)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <PageReadyProvider ready={!loading}>
      {loading && <LoadingScreen fading={fading} />}
      <div className={`min-h-screen bg-background text-text ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Navbar />
        <main>
          <Hero />
          <SectionDivider variant="navy-cyan" />
          <About />
          <SectionDivider variant="cyan-indigo" index={1} />
          <OurTeam />
          <SectionDivider variant="indigo-teal" index={2} />
          <Services />
          <SectionDivider variant="teal-navy" index={3} />
          <WhyChoose />
          <SectionDivider variant="tri-blend" index={4} />
          <Industries />
          <SectionDivider variant="warm-cool" index={5} />
          <Process />
          <SectionDivider variant="navy-cyan" index={6} />
          <Portfolio />
          <SectionDivider variant="indigo-teal" index={8} />
          <Stats />
          <SectionDivider variant="teal-navy" index={9} />
          <Testimonials />
          <SectionDivider variant="tri-blend" index={10} />
          <FAQ />
          <SectionDivider variant="warm-cool" index={11} />
          <CTA />
          <SectionDivider variant="navy-cyan" index={12} />
          <Contact />
        </main>
        <Footer />
      </div>
      {!loading && <WhatsAppChat />}
    </PageReadyProvider>
  )
}

export default App
