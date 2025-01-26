"use client"

import React, { useEffect, useState } from "react"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MessageCircle,
  Phone,
  LogOut
} from "lucide-react"

import ProjectSection from "./project-section"
import SkillChart from "./skill-chart"

import Link from "next/link"
import MyReview from "./Myreview"

interface UserDetails {
  clerkId: string
  interests: string[]
  ongoing_project_links: string[]
  portfolio_links: string[]
  skills: string[]
  socials: string[]
  tags: string[]
}

export default function MyProfile() {
  const { user } = useUser()
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  // Fetch extended user details from your backend
  useEffect(() => {
    if (!user?.id) return
  
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(
          `https://pleasant-mullet-unified.ngrok-free.app/user/get_user_details_dashboard/${user.id}`,
          {
            headers: {
              // Add header to skip ngrok browser warning
              'ngrok-skip-browser-warning': 'true'
            }
          }
        )
        
        if (!res.ok) {
          console.error("Failed to fetch user details", res.status)
          return
        }
        
        const text = await res.text() // First get response as text
        let data;
        
        try {
          data = JSON.parse(text) // Try to parse manually
        } catch (error) {
          console.error("Failed to parse JSON:", text)
          return
        }
        
        // Convert stringified fields to arrays
        const processedData = {
          ...data,
          interests: data.interests ? data.interests.replace(/[{}]/g, '').split(',') : [],
          skills: data.skills || [],
          socials: data.socials || [],
          tags: data.tags || []
        }
        
        setUserDetails(processedData)
      } catch (error) {
        console.error("Error fetching user details:", error)
      }
    }
  
    fetchUserDetails()
  }, [user?.id])

  // Prepare name, email, phone from Clerk
  const fullName = user?.fullName || "No name"
  const emailAddress = user?.primaryEmailAddress?.emailAddress
  const phoneNumber = user?.primaryPhoneNumber?.phoneNumber
  const profileImageUrl = user?.imageUrl // Clerk user’s avatar

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {/* Avatar from Clerk */}
          <Avatar className="w-40 h-40 border-4 border-gray-800 shadow-lg rounded-full overflow-hidden">
            <AvatarImage
              src={profileImageUrl || "/placeholder.svg?height=160&width=160"}
              alt="Profile picture"
            />
            <AvatarFallback>
              {/* Fallback can be user’s initials or something else */}
              {fullName
                .split(" ")
                .map((part) => part[0]?.toUpperCase())
                .join("") || "?"}
            </AvatarFallback>
          </Avatar>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{fullName}</h1>

            {/* Tags (or fallback to “Full Stack Developer”) */}
            <div className="inline-block px-3 py-1 mb-4 bg-gray-800 rounded-full text-sm font-medium">
              {userDetails?.tags && userDetails.tags.length > 0
                ? userDetails.tags.join(", ")
                : "Full Stack Developer"}
            </div>

            {/* Interests as a short description (or fallback text) */}
            <p className="mb-6 text-gray-300 max-w-2xl">
              {userDetails?.interests && userDetails.interests.length > 0
                ? userDetails.interests.join(", ")
                : "Passionate about creating beautiful and functional web applications. Always learning new technologies."}
            </p>

            {/* Action Buttons (unchanged) */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <Link href={`/edit-profile`}>
              <Button variant="outline" className="rounded-full">
                Edit Profile
              </Button>
              </Link>
              <Button variant="outline" className="rounded-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <SignOutButton>
              <Button variant="outline" className="rounded-full">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              </SignOutButton>
            </div>

            {/* Socials: show first few as icons or dynamically loop them */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              {/* Example: if userDetails.socials is not empty, show them.
                  This keeps icons for GitHub / LinkedIn / Twitter.
                  In practice, you might want more dynamic or robust logic. */}
              {userDetails?.socials && userDetails.socials[0] && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  <Github className="w-4 h-4 mr-2" />
                  {userDetails.socials[0]}
                </Badge>
              )}
              {userDetails?.socials && userDetails.socials[1] && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  <Linkedin className="w-4 h-4 mr-2" />
                  {userDetails.socials[1]}
                </Badge>
              )}
              {userDetails?.socials && userDetails.socials[2] && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  <Twitter className="w-4 h-4 mr-2" />
                  {userDetails.socials[2]}
                </Badge>
              )}
            </div>

            {/* Email & Phone from Clerk */}
            <div className="flex flex-col items-center md:items-start gap-2 text-sm text-gray-400">
              {emailAddress && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {emailAddress}
                </div>
              )}
              {phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {phoneNumber}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs (Projects, Skills, Collaborators) - leave them alone */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-neutral-800 rounded-full p-1">
            <TabsTrigger value="projects" className="rounded-full">
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="rounded-full">
              Skills
            </TabsTrigger>
            <TabsTrigger value="collaborators" className="rounded-full">
              Collaborators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {/* <ProjectSection /> */}
          </TabsContent>

          <TabsContent value="skills">
            <Card className=" border-gray-800">
              <CardContent className="pt-6">
                <SkillChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Reviews">
          <Card className=" border-gray-800">
              <CardContent className="pt-6">
                <MyReview />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
