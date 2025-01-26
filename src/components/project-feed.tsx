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
import { X, Check, Calendar, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Swiping sensitivity constants
const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

interface FeedProject {
  id: number
  title: string
  short_description?: string
  big_description?: string
  tags: string[] // Make tags required and always an array
  skills_required: string[] | undefined
  goals?: string
  duration?: string
  clerkId?: string
  name?: string
}

export default function ProjectFeed() {
  const { toast } = useToast()

  // 1. All hooks at the top:
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<FeedProject[]>([])
  const [exitX, setExitX] = useState(0)
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)
  const [showRejectionScreen, setShowRejectionScreen] = useState(false)

  // 2. useEffect to fetch data
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const response = await fetch(
          "https://pleasant-mullet-unified.ngrok-free.app/projects/feed_projects",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const text = await response.text()

        if (!text) {
          setProjects([])
          return
        }

        try {
          const data = JSON.parse(text)
          if (Array.isArray(data)) {
            setProjects(data)
          } else {
            setProjects([])
          }
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError)
          setProjects([])
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // 3. Helper to remove the first project from the list
  const removeProject = useCallback(() => {
    setProjects((prev) => prev.slice(1))
  }, [])

  // 4. Swiping logic
  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (projects.length > 0) {
        setExitX(direction === "left" ? -300 : 300)

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
    [projects, removeProject]
  )

  // 5. Keyboard arrows
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

  // 6. Now do the loading check
  if (loading) {
    return <div className="text-center p-4">Loading projects...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Project Feed</h1>
      <div className="max-w-md mx-auto relative">
        <AnimatePresence>
          {projects.length > 0 && !showSuccessScreen && !showRejectionScreen && (
            <motion.div
              key={projects[0].id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
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

          {showSuccessScreen && <SuccessScreen project={projects[0]} />}
          {showRejectionScreen && <RejectionScreen project={projects[0]} />}
        </AnimatePresence>

        {projects.length === 0 &&
          !showSuccessScreen &&
          !showRejectionScreen && (
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

function ProjectCard({
  project,
  onSwipe,
}: {
  project: FeedProject
  onSwipe: (direction: "left" | "right") => void
}) {
  // Add safety checks for arrays
  const tags = Array.isArray(project.tags) ? project.tags : []
  const skills = Array.isArray(project.skills_required) ? project.skills_required : []
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
        <CardDescription className="text-neutral-400">
          Owned by: {project.clerkId || project.name || "Unknown"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-300 mb-4">
          {project.short_description || project.big_description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
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

        {project.skills_required && project.skills_required.length > 0 && (
          <div className="mt-4">
            <h4 className="text-gray-300 font-semibold mb-2">
              Skills Required:
            </h4>
            <ul className="list-disc list-inside text-gray-400">
              {Array.isArray(project.skills_required) && project.skills_required.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
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

/* ------------------------------------------------- */
/* Success Screen (Right Swipe)                      */
/* ------------------------------------------------- */

function SuccessScreen({ project }: { project: FeedProject | undefined }) {
  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-green-900 p-6 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Collaboration Request Sent!</h2>
      <p className="mb-2">You&apos;ve requested to collaborate on:</p>
      <p className="text-xl font-semibold mb-4">{project.title}</p>
      <p>The project owner will be notified of your interest.</p>
    </motion.div>
  )
}

/* ------------------------------------------------- */
/* Rejection Screen (Left Swipe)                     */
/* ------------------------------------------------- */

function RejectionScreen({ project }: { project: FeedProject | undefined }) {
  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-red-900 p-6 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Project Skipped</h2>
      <p className="mb-2">You&apos;ve passed on:</p>
      <p className="text-xl font-semibold mb-4">{project.title}</p>
      <p>Don&apos;t worry, there are more projects to explore!</p>
    </motion.div>
  )
}
