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
import { UserPlus, Loader2 } from "lucide-react"

interface CreateTeamDialogProps {
  hackathonId: number
}

export function CreateTeamDialog({ hackathonId }: CreateTeamDialogProps) {
  const [teamName, setTeamName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { userId } = useAuth()

  const handleCreateTeam = async () => {
    if (!userId) {
      setError("User not authenticated")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://match-my-code.up.railway.app/registration/create_team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: userId,
          hackathon_id: hackathonId,
          team_name: teamName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create team")
      }

      // Handle success (e.g., show a success message, close the dialog)
      console.log("Team created successfully")
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
          className="flex-1 py-3 rounded-lg font-medium text-sm bg-green-800/30 hover:bg-green-800/40 text-green-400"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </DialogTrigger>

      <DialogContent className="border-neutral-800 bg-neutral-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a New Team</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter your team name to create a new team for this hackathon.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <Input
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            onClick={() => setTeamName("")}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleCreateTeam}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading || !teamName.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Team"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

