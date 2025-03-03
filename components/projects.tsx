"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const ref = useRef(null)
  const [data, setData] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [])

  if (!data) return null

  return (
    <section
      id="projects"
      className="section-container bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      <h2 className="section-title">My Projects</h2>

      <div ref={ref} className="grid md:grid-cols-2 gap-8 mt-16">
        {data.projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card group cursor-pointer bg-card/50 backdrop-blur-sm border border-border"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedProject(project)}
            viewport={{ once: true,amount: 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="relative overflow-hidden h-64">
              <Image
                src={project.image || "/images/placeholder-project.jpeg"}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <div className="flex gap-4 justify-end">
                   {project.liveUrl && <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <ExternalLink size={20} />
                    </a>}
                    {project.githubUrl && <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card p-2 rounded-full hover:bg-muted transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} />
                    </a>}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gradient">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              {selectedProject?.shortDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
           {selectedProject?.image && <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
              <Image
                src={selectedProject?.image || "/placeholder.svg"}
                alt={selectedProject?.title || "Project"}
                fill
                className="object-cover"
              />
            </div>}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Overview</h3>
                <p className="text-muted-foreground">{selectedProject?.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {selectedProject?.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Technologies Used</h3>
                <div className="space-y-3">
                  {selectedProject?.technologies.frontend && (
                    <div>
                      <h4 className="font-semibold">Frontend:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProject.technologies.frontend.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-purple-500/10 text-purple-500 border-purple-500/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject?.technologies.backend && (
                    <div>
                      <h4 className="font-semibold">Backend:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProject.technologies.backend.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-pink-500/10 text-pink-500 border-pink-500/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject?.technologies.deployment && (
                    <div>
                      <h4 className="font-semibold">Deployment:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProject.technologies.deployment.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject?.technologies.apis && (
                    <div>
                      <h4 className="font-semibold">APIs:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedProject.technologies.apis.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-green-500/10 text-green-500 border-green-500/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {selectedProject?.images?.length > 0 && <div>
                <h3 className="text-xl font-bold mb-2">Additional Images</h3>
                <div className="grid grid-cols-2 gap-8">
                  {selectedProject?.images?.map((img:string,idx:number) => <a className="flex justify-center bg-gray-800/40 rounded-lg w-full h-72 relative" href={img || "/images/placeholder-project.jpeg"} target="_blank">
                    <Image
                    src={img || "/images/placeholder-project.jpeg"}
                    alt={`Project image ${idx}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                  </a>)}
                </div>
              </div>}
              <div className="flex gap-4 pt-4">
                {selectedProject?.liveUrl && <a
                  href={selectedProject?.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  View Live
                </a>}
                
                {selectedProject?.githubUrl && <a
                  href={selectedProject?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card hover:bg-muted text-foreground px-4 py-2 rounded-md flex items-center gap-2 border border-border"
                >
                  <Github size={16} />
                  View Code
                </a>}
                
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

