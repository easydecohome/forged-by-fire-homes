import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Models from './components/Models'
import Craft from './components/Craft'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import UrgencyBanner from './components/UrgencyBanner'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <UrgencyBanner />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Models />
        <Craft />
        <Process />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
