"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Mail, MessageCircle, Star } from "lucide-react"
import ProjectSection from "./project-section"
import SkillChart from "./skill-chart"
import CollaboratorSection from "./Myreview"

interface UserData {
  average_rating: string
  bio: string
  interests: string
  name: string
  ongoing_project_links: string[]
  portfolio_links: string[]
  skills: string[]
  socials: string[]
  tags: string[]
  verified: boolean
}

export default function Profile() {
  const { user: currentUser } = useUser()
  const params = useParams()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const viewedUserId = Array.isArray(params.clerkId) ? params.clerkId[0] : params.clerkId

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data
        const profileRes = await fetch(
          `https://pleasant-mullet-unified.ngrok-free.app/user/get_user_details_dashboard/12345`,
          { headers: { 'ngrok-skip-browser-warning': 'true' } }
        )
        if (!profileRes.ok) throw new Error("Failed to fetch profile")
        const profileData = await profileRes.json()
        
        // Process interests
        const processedData = {
          ...profileData,
          interests: profileData.interests
            ? profileData.interests.replace(/[{}"]/g, '').split(',').map((i: string) => i.trim())
            : []
        }
        
        setUserData(processedData)

        // Fetch following status
        if (currentUser?.id) {
          const followRes = await fetch(
            `https://pleasant-mullet-unified.ngrok-free.app/follow/users/${currentUser.id}/following`,
            { headers: { 'ngrok-skip-browser-warning': 'true' } }
          )
          if (!followRes.ok) throw new Error("Failed to fetch following status")
          const { following } = await followRes.json()
          setIsFollowing(following.includes(viewedUserId))
        }
      } catch (err) {
        console.error(err)
        setError("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [viewedUserId, currentUser?.id])

  const handleFollow = async () => {
    if (!currentUser?.id) return

    try {
      const endpoint = isFollowing ? "/follow/unfollow" : "/follow/follow"
      const res = await fetch(
        `https://pleasant-mullet-unified.ngrok-free.app${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({
            follower_clerk_id: currentUser.id,
            followed_clerk_id: viewedUserId
          })
        }
      )

      if (!res.ok) throw new Error(`Failed to ${isFollowing ? "unfollow" : "follow"}`)
      setIsFollowing(!isFollowing)
    } catch (err) {
      console.error(err)
      setError(`Failed to ${isFollowing ? "unfollow" : "follow"}`)
    }
  }

  if (loading) return <div className="text-gray-400 text-center p-8">Loading profile...</div>
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>
  if (!userData) return <div className="text-gray-400 text-center p-8">Profile not found</div>

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <Avatar className="w-40 h-40 border-4 border-gray-800 shadow-lg rounded-full overflow-hidden">
            <AvatarImage src="/placeholder.svg?height=160&width=160" alt="Profile picture" />
            <AvatarFallback>
              {userData.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
            
            <div className="inline-block px-3 py-1 mb-4 bg-gray-800 rounded-full text-sm font-medium">
              {userData.tags.join(", ") || "Developer"}
            </div>

            <p className="mb-6 text-gray-300 max-w-2xl">
              {userData.bio || "Passionate about creating amazing projects and collaborating with others."}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={handleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" className="rounded-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              {userData.socials.map((social, index) => {
                let Icon = Github
                if (social.includes("twitter")) Icon = Twitter
                if (social.includes("linkedin")) Icon = Linkedin
                if (social.includes("instagram")) Icon = Star // Replace with actual Instagram icon

                return (
                  <Badge key={index} variant="secondary" className="rounded-full px-3 py-1">
                    <Icon className="w-4 h-4 mr-2" />
                    {social.split("/").pop()}
                  </Badge>
                )
              })}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4" />
              {currentUser?.primaryEmailAddress?.emailAddress}
            </div>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-neutral-800 rounded-full p-1">
            <TabsTrigger value="projects" className="rounded-full">
              Projects ({userData.ongoing_project_links.length})
            </TabsTrigger>
            <TabsTrigger value="skills" className="rounded-full">
              Skills ({userData.skills.length})
            </TabsTrigger>
            <TabsTrigger value="collaborators" className="rounded-full">
              Collaborators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            
          </TabsContent>

          <TabsContent value="skills">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <SkillChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaborators">
            <CollaboratorSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}