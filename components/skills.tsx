"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Skills() {
  const ref = useRef(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [])

  if (!data) return null

  return (
    <section
      id="skills"
      className="section-container bg-gradient-to-b from-background/90 via-background/95 to-background"
    >
      <h2 className="section-title">My Skills</h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-16">
        <motion.div
          ref={ref}
          className="bg-card/50 p-8 rounded-xl border border-border backdrop-blur-sm"
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true,amount: 0.2 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-gradient">Technical Skills</h3>
          <div className="space-y-6">
            {data.skills.technical.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true,amount: 0.2 }}
                    whileInView={{ width: `${skill.level}%` }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-card/50 p-8 rounded-xl border border-border backdrop-blur-sm"
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true,amount: 0.2 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-gradient">Professional Skills</h3>

          <div className="grid grid-cols-2 gap-6">
            {data.skills.professional.map((skill, index) => (
              <div key={index} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="8"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    ></circle>
                    <motion.circle
                      className="text-gradient-to-r from-purple-600 to-pink-500 stroke-purple-600"
                      strokeWidth="8"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      viewport={{ once: true,amount: 0.2 }}
                      whileInView={{ strokeDashoffset: 251.2 - (251.2 * skill.value) / 100 }}
                      transition={{ duration: 2, delay: 0.5 + index * 0.2 }}
                    ></motion.circle>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-xl font-bold">{skill.value}%</span>
                  </div>
                </div>
                <h4 className="font-medium">{skill.name}</h4>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

