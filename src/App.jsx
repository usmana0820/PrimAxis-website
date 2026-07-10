import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedTech from './components/TrustedTech'
import About from './components/About'
import Services from './components/Services'
import WhyChoose from './components/WhyChoose'
import Industries from './components/Industries'
import Process from './components/Process'
import Technologies from './components/Technologies'
import Portfolio from './components/Portfolio'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main>
        <Hero />
        <TrustedTech />
        <About />
        <Services />
        <WhyChoose />
        <Industries />
        <Process />
        <Technologies />
        <Portfolio />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
