"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Mail, MessageCircle } from "lucide-react"
import ProjectSection from "./project-section"
import SkillChart from "./skill-chart"
import CollaboratorSection from "./collaborator-section"

export default function Profile() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <Avatar className="w-40 h-40 border-4 border-gray-800 shadow-lg rounded-full overflow-hidden">
            <AvatarImage src="/placeholder.svg?height=160&width=160" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Jane Doe</h1>
            <div className="inline-block px-3 py-1 mb-4 bg-gray-800 rounded-full text-sm font-medium">
              Full Stack Developer
            </div>
            <p className="mb-6 text-gray-300 max-w-2xl">
              Passionate about creating beautiful and functional web applications. Always learning and exploring new
              technologies to push the boundaries of what's possible on the web.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <Button variant="outline" className="rounded-full">
                Follow
              </Button>
              <Button variant="outline" className="rounded-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                <Github className="w-4 h-4 mr-2" />
                github.com/janedoe
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                <Linkedin className="w-4 h-4 mr-2" />
                linkedin.com/in/janedoe
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                <Twitter className="w-4 h-4 mr-2" />
                @janedoe
              </Badge>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4" />
              jane.doe@example.com
            </div>
          </div>
        </div>

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
            <ProjectSection />
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

