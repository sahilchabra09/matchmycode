"use client"
import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Loader2 } from "lucide-react"

interface JoinTeamDialogProps {
  hackathonId: number
}

export function JoinTeamDialog({ hackathonId }: JoinTeamDialogProps) {
  const [teamCode, setTeamCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { userId } = useAuth()

  const handleJoinTeam = async () => {
    if (!userId) {
      setError("User not authenticated")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://pleasant-mullet-unified.ngrok-free.app/registration/join_team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: userId,
          hackathon_id: hackathonId,
          team_code: teamCode,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to join team")
      }

      // Handle success (e.g., show a success message, close the dialog)
      console.log("Joined team successfully")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex-1 py-3 rounded-lg font-medium text-sm bg-blue-800/30 hover:bg-blue-800/40 text-blue-400"
        >
          <Users className="w-4 h-4 mr-2" />
          Join Team
        </Button>
      </DialogTrigger>

      <DialogContent className="border-neutral-800 bg-neutral-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join an Existing Team</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter the team code to join an existing team for this hackathon.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <Input
            placeholder="Enter team code"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            onClick={() => setTeamCode("")}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleJoinTeam}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading || !teamCode.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Team"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

