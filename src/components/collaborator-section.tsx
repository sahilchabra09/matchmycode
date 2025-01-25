import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const collaborators = [
  {
    name: "Alice Johnson",
    role: "UX Designer",
    projectRole: "Design Lead",
    avatar: "/placeholder.svg?height=80&width=80",
    projects: [
      { name: "E-commerce Platform", role: "Lead Designer" },
      { name: "Task Management App", role: "UI/UX Consultant" },
    ],
  },
  {
    name: "Bob Smith",
    role: "Backend Developer",
    projectRole: "Technical Lead",
    avatar: "/placeholder.svg?height=80&width=80",
    projects: [
      { name: "E-commerce Platform", role: "Backend Architect" },
      { name: "Weather Dashboard", role: "API Integration Specialist" },
    ],
  },
  {
    name: "Carol Williams",
    role: "Project Manager",
    projectRole: "Mentor",
    avatar: "/placeholder.svg?height=80&width=80",
    projects: [
      { name: "Task Management App", role: "Project Coordinator" },
      { name: "Hackathon: AI Chatbot", role: "Team Leader" },
    ],
  },
]

export default function CollaboratorSection() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {collaborators.map((collaborator, index) => (
        <Card key={index} className="bg-neutral-900 border-neutral-800 overflow-hidden transition-all hover:scale-105">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-gray-700">
              <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
              <AvatarFallback>
                {collaborator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-gray-100">{collaborator.name}</CardTitle>
              <CardDescription className="text-gray-400">{collaborator.role}</CardDescription>
              <Badge variant="secondary" className="mt-2 bg-gray-800 text-gray-200">
                {collaborator.projectRole}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Project History:</h4>
            <ul className="space-y-2">
              {collaborator.projects.map((project, projectIndex) => (
                <li key={projectIndex} className="flex justify-between items-center">
                  <span className="text-gray-300">{project.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {project.role}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

