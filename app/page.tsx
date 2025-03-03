import { ThemeToggle } from "@/components/theme-toggle"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ParticlesBackground from "@/components/particles-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <ThemeToggle />
      <ParticlesBackground />
      <div className="relative z-10">
        <Hero />
        <div>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>
    </main>
  )
}

