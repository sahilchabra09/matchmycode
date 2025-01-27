"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  CalendarClock,
  Terminal,
  Trophy,
  User,
  Wallet,
  Rocket,
  AlertTriangle,
  Users,
  UserPlus,
} from "lucide-react"
import { CreateTeamDialog } from "@/components/create-team-dialog"
import { JoinTeamDialog } from "@/components/join-team-dialog"

interface Hackathon {
  id: number
  title: string
  end_date: string
  start_date: string
  location: string
  mode: string
  organiser_clerkId: string
  prize_money: number
  registration_deadline: string
}

export default function HackathonFeed() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://match-my-code.up.railway.app/user/post_user_details/hackathon/public_hackathons", {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true", // Bypass ngrok warning
          },
        })

        const text = await response.text()
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${text}`)
        }

        try {
          const data = JSON.parse(text)
          setHackathons(data)
        } catch (parseError) {
          if (parseError instanceof Error) {
            throw new Error(`Invalid JSON response: ${parseError.message}`)
          } else {
            throw new Error("Invalid JSON response")
          }
        }

        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred")
        }
        setLoading(false)
        console.error("Fetch error:", error)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="w-full py-20 bg-black text-white text-center">Loading...</div>
  }

  if (error) {
    return <div className="w-full py-20 bg-black text-white text-center">Error: {error}</div>
  }

  return (
    <div className="w-full py-20 bg-black text-white">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start px-4">
            <div>
              <Badge variant="outline" className="bg-neutral-800 text-neutral-300">
                Hackathons
              </Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Ongoing Challenges
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-neutral-400 text-left">
                Join the most innovative competitions in tech
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {hackathons.map((hackathon) => {
              const currentDate = new Date()
              const startDate = new Date(hackathon.start_date)
              const endDate = new Date(hackathon.end_date)
              let status: string

              if (currentDate < startDate) {
                status = "upcoming"
              } else if (currentDate >= startDate && currentDate <= endDate) {
                status = "active"
              } else {
                status = "expired"
              }

              return (
                <Card
                  key={hackathon.id}
                  className="bg-neutral-900 border-neutral-800 rounded-xl h-full p-6 flex flex-col justify-between transition-all hover:border-neutral-700"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      <Trophy className="w-8 h-8 stroke-[1px] text-yellow-500" />
                      <Badge
                        className={
                          status === "active"
                            ? "bg-green-900/20 text-green-400"
                            : status === "upcoming"
                              ? "bg-yellow-900/20 text-yellow-400"
                              : "bg-red-900/20 text-red-400"
                        }
                      >
                        {status}
                      </Badge>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl tracking-tight font-medium">{hackathon.title}</h3>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{hackathon.organiser_clerkId}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Wallet className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">${hackathon.prize_money.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">{hackathon.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <CalendarClock className="w-4 h-4 text-green-400" />
                        <span className="text-sm">{formatDate(hackathon.start_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Terminal className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{formatDate(hackathon.registration_deadline)}</span>
                      </div>
                    </div>
                  </div>

                  {(status === "active" || status === "upcoming") && (
                    <div className="flex gap-2 mt-6">
                      <CreateTeamDialog hackathonId={hackathon.id} />
                      <JoinTeamDialog hackathonId={hackathon.id} />
                    </div>
                  )}

                  {status === "expired" && (
                    <button
                      className="w-full mt-6 py-3 rounded-lg font-medium text-sm bg-neutral-800 cursor-not-allowed text-neutral-500"
                      disabled
                    >
                      Registration Closed
                    </button>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
