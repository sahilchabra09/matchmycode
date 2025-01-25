import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/janedoe/ecommerce",
    live: "https://ecommerce-demo.com",
  },
  {
    title: "Task Management App",
    description: "A productivity app built with Vue.js and Firebase",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Vue.js", "Firebase", "Vuex"],
    github: "https://github.com/janedoe/task-manager",
    live: "https://task-manager-demo.com",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather information using OpenWeatherMap API",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["JavaScript", "API", "CSS Grid"],
    github: "https://github.com/janedoe/weather-dashboard",
    live: "https://weather-dashboard-demo.com",
  },
]

export default function ProjectSection() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Card key={index} className="overflow-hidden bg-neutral-900 border-neutral-800 transition-all hover:scale-105">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle className="text-gray-100">{project.title}</CardTitle>
            <CardDescription className="text-gray-400">{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="bg-gray-800 text-gray-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

