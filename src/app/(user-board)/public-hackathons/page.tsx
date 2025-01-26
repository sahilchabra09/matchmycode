"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/hs_ui/button"
import { 
  MapPin, 
  CalendarClock, 
  Terminal, 
  Trophy, 
  User, 
  Wallet,
  Rocket,
  AlertTriangle
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/hs_ui/dialog"

const hackathonsData = [
  {
    id: 5,
    title: "Global AI Challenge",
    end_date: "2025-01-26T02:35:00",
    start_date: "2025-01-26T02:30:00",
    location: "Online",
    mode: "online",
    organiser: "Tech Innovators Inc.",
    prize_money: 5000,
    registration_deadline: "2025-01-26T02:25:00",
    status: "active"
  },
  {
    id: 6,
    title: "Blockchain Hackathon",
    end_date: "2025-02-15T18:00:00",
    start_date: "2025-02-10T09:00:00",
    location: "New York, USA",
    mode: "hybrid",
    organiser: "Crypto Foundation",
    prize_money: 10000,
    registration_deadline: "2025-02-05T23:59:00",
    status: "upcoming"
  },
  // ... (keep other hackathon entries but ensure unique IDs)
]

interface Hackathon {
  id: number
  title: string
  end_date: string
  start_date: string
  location: string
  mode: string
  organiser: string
  prize_money: number
  registration_deadline: string
  status: string
}

function RegistrationDialog({ 
  hackathonId,
  userStartId 
}: { 
  hackathonId: number 
  userStartId: string 
}) {
  const handleConfirm = async () => {
    try {
      const response = await fetch(
        `/hackathon/${hackathonId}/register_for_hackathon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_startId: userStartId })
        }
      )

      if (!response.ok) throw new Error('Registration failed')
      // Add success handling here
    } catch (error) {
      console.error("Registration error:", error)
      // Add error handling here
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full mt-6 py-3 rounded-lg font-medium text-sm bg-green-800/30 hover:bg-green-800/40 text-green-400"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Join Challenge →
        </Button>
      </DialogTrigger>
      
      <DialogContent className="border-neutral-800 bg-neutral-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Registration</DialogTitle>
          <DialogDescription className="text-neutral-400">
            You're about to register for this hackathon
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-2 text-sm">
          <p className="flex items-center gap-2 text-neutral-300">
            <User className="w-4 h-4" />
            User ID: {userStartId}
          </p>
          <p className="flex items-center gap-2 text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            This action cannot be undone
          </p>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleConfirm}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Confirm Registration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function HackathonFeed() {
  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

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
            {hackathonsData.map((hackathon) => (
              <Card 
                key={hackathon.id}
                className="bg-neutral-900 border-neutral-800 rounded-xl h-full p-6 flex flex-col justify-between transition-all hover:border-neutral-700"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <Trophy className="w-8 h-8 stroke-[1px] text-yellow-500" />
                    <Badge className={
                      hackathon.status === 'active' ? 'bg-green-900/20 text-green-400' :
                      hackathon.status === 'upcoming' ? 'bg-yellow-900/20 text-yellow-400' :
                      'bg-red-900/20 text-red-400'
                    }>
                      {hackathon.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl tracking-tight font-medium">
                      {hackathon.title}
                    </h3>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{hackathon.organiser}</span>
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

                {hackathon.status === 'active' ? (
                  <RegistrationDialog 
                    hackathonId={hackathon.id}
                    userStartId="user_123abc" // Replace with actual user ID
                  />
                ) : (
                  <button 
                    className="w-full mt-6 py-3 rounded-lg font-medium text-sm bg-neutral-800 cursor-not-allowed text-neutral-500"
                    disabled
                  >
                    Registration Closed
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}