import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Project {
  big_description: string
  clerkId: string
  duration: string
  goals: string
  id: number
  name: string
  progress: number
  project_links: string[]
  project_status: string
  short_description: string
  skills_required: string[]
  tags: string[]
  title: string
}

export default function ProjectSection({ clerkId }: { clerkId: string }) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`https://match-my-code.up.railway.app/projects/get_user_projects/${clerkId}`)
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    }

    fetchProjects()
  }, [clerkId])

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden bg-neutral-900 border-neutral-800 transition-all hover:scale-105">
          <Image
            src={"/placeholder.svg"}
            alt={project.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle className="text-gray-100">{project.title}</CardTitle>
            <CardDescription className="text-gray-400">{project.short_description}</CardDescription>
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
            {project.project_links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                {link.includes('github') ? (
                  <Github className="w-5 h-5" />
                ) : (
                  <ExternalLink className="w-5 h-5" />
                )}
              </a>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}