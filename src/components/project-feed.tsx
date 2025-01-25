"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Check, Users, Calendar, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Enhanced mock data for projects
const projectsData = [
  {
    id: 1,
    title: "AI-Powered Chat Application",
    description:
      "Developing a chat application with AI capabilities for smart responses and language translation. This project aims to revolutionize online communication by integrating advanced natural language processing.",
    owner: "Alice Johnson",
    tags: ["AI", "NLP", "React", "Node.js"],
    collaborators: 3,
    duration: "3 months",
    skillsRequired: ["Machine Learning", "Full-Stack Development", "API Integration"],
    goals: "Create a user-friendly chat interface with AI-driven responses and real-time translation features.",
  },
  {
    id: 2,
    title: "Blockchain-based Voting System",
    description:
      "Creating a secure and transparent voting system using blockchain technology. This project seeks to enhance the integrity of digital voting processes for various applications.",
    owner: "Bob Smith",
    tags: ["Blockchain", "Ethereum", "Smart Contracts"],
    collaborators: 2,
    duration: "6 months",
    skillsRequired: ["Blockchain Development", "Cryptography", "UI/UX Design"],
    goals:
      "Develop a tamper-proof, auditable voting system that can be deployed for organizational or governmental use.",
  },
  {
    id: 3,
    title: "AR Navigation App",
    description:
      "Building an augmented reality app for indoor navigation in large buildings. This innovative project combines AR technology with precise indoor mapping to guide users through complex structures.",
    owner: "Carol Williams",
    tags: ["AR", "iOS", "Android", "Unity"],
    collaborators: 4,
    duration: "4 months",
    skillsRequired: ["AR Development", "3D Modeling", "Mobile App Development"],
    goals:
      "Create an intuitive AR app that overlays directional information on real-world environments for seamless navigation.",
  },
]

export default function ProjectFeed() {
  const [projects, setProjects] = useState(projectsData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { toast } = useToast()
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)
  const [showRejectionScreen, setShowRejectionScreen] = useState(false)

  const removeProject = useCallback(() => {
    setProjects((prev) => prev.slice(1))
  }, [])

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (projects.length > 0) {
        const project = projects[0]
        if (direction === "right") {
          setShowSuccessScreen(true)
          setTimeout(() => {
            setShowSuccessScreen(false)
            removeProject()
          }, 1500)
        } else {
          setShowRejectionScreen(true)
          setTimeout(() => {
            setShowRejectionScreen(false)
            removeProject()
          }, 1500)
        }
      }
    },
    [projects, removeProject],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleSwipe("left")
      } else if (event.key === "ArrowRight") {
        handleSwipe("right")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleSwipe])

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Project Feed</h1>
      <div className="max-w-md mx-auto relative">
        <AnimatePresence>
          {projects.length > 0 && !showSuccessScreen && !showRejectionScreen && (
            <motion.div
              key={projects[0].id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 300, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  handleSwipe("left")
                } else if (swipe > swipeConfidenceThreshold) {
                  handleSwipe("right")
                }
              }}
            >
              <ProjectCard project={projects[0]} onSwipe={handleSwipe} />
            </motion.div>
          )}
          {showSuccessScreen && <SuccessScreen project={projects[0]} />}
          {showRejectionScreen && <RejectionScreen project={projects[0]} />}
        </AnimatePresence>
        {projects.length === 0 && (
          <div className="text-center text-neutral-800 mt-8">No more projects available. Check back later!</div>
        )}
      </div>
    </div>
  )
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

interface ProjectCardProps {
  project: {
    title: string
    description: string
    owner: string
    tags: string[]
    collaborators: number
    duration: string
    skillsRequired: string[]
    goals: string
  }
  onSwipe: (direction: "left" | "right") => void
}

function ProjectCard({ project, onSwipe }: ProjectCardProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
        <CardDescription className="text-neutral-400">{project.owner}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-200">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>Collaborators: {project.collaborators}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Duration: {project.duration}</span>
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            <span>Goals: {project.goals}</span>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-gray-300 font-semibold mb-2">Skills Required:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {project.skillsRequired.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-red-900 hover:bg-red-800"
          onClick={() => onSwipe("left")}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-green-900 hover:bg-green-800"
          onClick={() => onSwipe("right")}
        >
          <Check className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function SuccessScreen({ project }: { project: ProjectCardProps["project"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-green-900 p-6 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Collaboration Request Sent!</h2>
      <p className="mb-2">You've requested to collaborate on:</p>
      <p className="text-xl font-semibold mb-4">{project.title}</p>
      <p>The project owner will be notified of your interest.</p>
    </motion.div>
  )
}

function RejectionScreen({ project }: { project: ProjectCardProps["project"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-red-900 p-6 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Project Skipped</h2>
      <p className="mb-2">You've passed on:</p>
      <p className="text-xl font-semibold mb-4">{project.title}</p>
      <p>Don't worry, there are more projects to explore!</p>
    </motion.div>
  )
}

