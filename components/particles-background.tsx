"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "next-themes"
import { Container, ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine"

export default function ParticlesBackground() {
  const [init, setInit] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])


  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const particlesOptions: ISourceOptions = useMemo(() => ({
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        }
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: theme === "dark" ? "#8B5CF6" : "#6D28D9",
      },
      links: {
        color: theme === "dark" ? "#8B5CF6" : "#6D28D9",
        distance: 150,
        enable: false,
        opacity: theme === "dark" ? 1 : 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true
        },
        value: 100
      },
      opacity: {
        value: theme === "dark" ? 1 : 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), [])

  if (!init) return null

  return (
    <div className="particles-container">
      <Particles id="tsparticles" 
      particlesLoaded={particlesLoaded}
      options={particlesOptions} />
    </div>
  )
}

