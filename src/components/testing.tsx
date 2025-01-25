"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Mail, Phone } from "lucide-react";

import ProjectSection from "./project-section";
import SkillChart from "./skill-chart";
import CollaboratorSection from "./collaborator-section";

const dummyUserDetails = {
  clerkId: "123456",
  interests: ["Web Development", "Design", "Open Source"],
  ongoing_project_links: ["https://github.com/example/project1", "https://github.com/example/project2"],
  portfolio_links: ["https://portfolio.example.com"],
  skills: ["React", "Node.js", "Tailwind CSS"],
  socials: ["github.com/example", "linkedin.com/in/example", "twitter.com/example"],
  tags: ["Full Stack Developer", "UI/UX Designer"],
};

export default function MyProfile() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(dummyUserDetails);

  const fullName = user?.fullName || "John Doe";
  const emailAddress = user?.primaryEmailAddress?.emailAddress || "johndoe@example.com";
  const phoneNumber = user?.primaryPhoneNumber?.phoneNumber || "123-456-7890";
  const profileImageUrl = user?.imageUrl || "/placeholder.svg?height=160&width=160";

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <Avatar className="w-40 h-40 border-4 border-gray-800 shadow-lg rounded-full overflow-hidden">
            <AvatarImage src={profileImageUrl} alt="Profile picture" />
            <AvatarFallback>
              {fullName
                .split(" ")
                .map((part) => part[0]?.toUpperCase())
                .join("") || "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{fullName}</h1>
            <div className="inline-block px-3 py-1 mb-4 bg-gray-800 rounded-full text-sm font-medium">
              {userDetails.tags.join(", ")}
            </div>
            <p className="mb-6 text-gray-300 max-w-2xl">
              {userDetails.interests.join(", ")}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <Button variant="outline" className="rounded-full">
                Edit Profile
              </Button>
              <Button variant="outline" className="rounded-full">
                Settings
              </Button>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              {userDetails.socials.map((social, index) => (
                <Badge key={index} variant="secondary" className="rounded-full px-3 py-1">
                  {index === 0 && <Github className="w-4 h-4 mr-2" />}
                  {index === 1 && <Linkedin className="w-4 h-4 mr-2" />}
                  {index === 2 && <Twitter className="w-4 h-4 mr-2" />}
                  {social}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {emailAddress}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {phoneNumber}
              </div>
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
  );
}
