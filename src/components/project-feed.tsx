"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Check, Users, Calendar, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Swiping sensitivity constants
const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function ProjectFeed() {
  const { toast } = useToast()

  // Projects state
  const [projects, setProjects] = useState<any[]>([])
  // Track the exit direction so the card animates left or right properly
  const [exitX, setExitX] = useState(0)

  // Screens
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)
  const [showRejectionScreen, setShowRejectionScreen] = useState(false)

  // --- Fetch data from your API on mount ---
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("https://pleasant-mullet-unified.ngrok-free.app/projects/feed_projects")
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()
        setProjects(data) // data should be an array of projects
      } catch (error) {
        console.error(error)
      }
    }
    fetchProjects()
  }, [])

  // Helper to remove the first project from the list
  const removeProject = useCallback(() => {
    setProjects((prev) => prev.slice(1))
  }, [])

  // Handle swipes or arrow-key logic
  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (projects.length > 0) {
        // Set exit direction so the card animates properly
        setExitX(direction === "left" ? -300 : 300)

        if (direction === "right") {
          // "Accept" flow
          setShowSuccessScreen(true)
          setTimeout(() => {
            setShowSuccessScreen(false)
            removeProject()
          }, 1500)
        } else {
          // "Reject" flow
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

  // Listen for left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleSwipe("left")
      } else if (event.key === "ArrowRight") {
        handleSwipe("right")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleSwipe])

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Project Feed</h1>
      <div className="max-w-md mx-auto relative">
        <AnimatePresence>
          {/* Show the top card if we have projects and aren't in success/rejection screens */}
          {projects.length > 0 && !showSuccessScreen && !showRejectionScreen && (
            <motion.div
              key={projects[0].id}
              // Appear
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              // Exit to left or right, based on exitX state
              exit={{
                opacity: 0,
                x: exitX,
                transition: { duration: 0.2 },
              }}
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

          {/* Success screen (Right swipe) */}
          {showSuccessScreen && <SuccessScreen project={projects[0]} />}

          {/* Rejection screen (Left swipe) */}
          {showRejectionScreen && <RejectionScreen project={projects[0]} />}
        </AnimatePresence>

        {/* No more projects */}
        {projects.length === 0 && !showSuccessScreen && !showRejectionScreen && (
          <div className="text-center text-neutral-500 mt-8">
            No more projects available. Check back later!
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------- */
/* Project Card Component                            */
/* ------------------------------------------------- */

interface FeedProject {
  id: number
  title: string
  short_description?: string
  big_description?: string
  tags?: string[]
  skills_required?: string[]
  goals?: string
  duration?: string
  clerkId?: string
  name?: string
  // Add additional fields if needed
}

interface ProjectCardProps {
  project: FeedProject
  onSwipe: (direction: "left" | "right") => void
}

function ProjectCard({ project, onSwipe }: ProjectCardProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        {/* Title */}
        <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
        {/* “Owner” substitute – you could use clerkId, name, or remove entirely */}
        <CardDescription className="text-neutral-400">
          Owned by: {project.clerkId || project.name || "Unknown"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Display short_description or big_description */}
        <p className="text-gray-300 mb-4">
          {project.short_description || project.big_description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-800 text-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Duration / Goals (if available) */}
        <div className="space-y-2 text-sm text-gray-400">
          {project.duration && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Duration: {project.duration}</span>
            </div>
          )}
          {project.goals && (
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-2" />
              <span>Goals: {project.goals}</span>
            </div>
          )}
        </div>

        {/* Skills Required */}
        {project.skills_required && project.skills_required.length > 0 && (
          <div className="mt-4">
            <h4 className="text-gray-300 font-semibold mb-2">
              Skills Required:
            </h4>
            <ul className="list-disc list-inside text-gray-400">
              {project.skills_required.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {/* Left (Reject) */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-red-900 hover:bg-red-800"
          onClick={() => onSwipe("left")}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Right (Accept) */}
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

/* ------------------------------------------------- */
/* Success Screen (Right Swipe)                      */
/* ------------------------------------------------- */

function SuccessScreen({ project }: { project: FeedProject }) {
  if (!project) return null
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

/* ------------------------------------------------- */
/* Rejection Screen (Left Swipe)                     */
/* ------------------------------------------------- */

function RejectionScreen({ project }: { project: FeedProject }) {
  if (!project) return null
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
