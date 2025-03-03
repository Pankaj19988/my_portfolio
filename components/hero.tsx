"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [data, setData] = useState(null)

  useEffect(() => {
    setMounted(true)
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [])

  if (!mounted || !data) return null

  return (
    <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background dark:from-purple-900/20 dark:via-background dark:to-background"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 z-10"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="block">Hello, I'm</span>
          <span className="text-gradient">{data.personalInfo.name}</span>
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl mb-8 h-12">
          <TypeAnimation
            sequence={[
              data.personalInfo.title,
              1000,
              "Creating Digital Experiences",
              1000,
              "Turning Ideas Into Reality",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
            className="text-gradient"
          />
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">{data.personalInfo.description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-6 rounded-full text-lg border-0"
          >
            <a href="#projects">View My Work</a>
          </Button>
          <Button
            variant="outline"
            className="border-purple-600 dark:text-white hover:bg-purple-900/20 px-8 py-6 rounded-full text-lg text-purple-600"
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown size={32} />
        </a>
      </motion.div>
    </section>
  )
}

