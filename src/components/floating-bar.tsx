"use client"

import React from "react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { IconHome, IconUsers, IconUser, IconPlus, IconCode, IconSchool, IconMapPin } from "@tabler/icons-react"

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: "/home",
    },
    {
      title: "Discover People",
      icon: <IconUsers className="h-full w-full text-neutral-300" />,
      href: "/discover-people",
    },
    {
      title: "Discover Projects",
      icon: <IconCode className="h-full w-full text-neutral-300" />,
      href: "/project-feed",
    },
    {
      title: "Add",
      icon: <IconPlus className="h-full w-full text-neutral-300" />,
      href: "/add",
    },
  
    {
      title: "Find Hackathons",
      icon: <IconMapPin className="h-full w-full text-neutral-300" />, // Icon for hackathons
      href: "/hackathons",
    },
    {
      title: "Find Mentor",
      icon: <IconSchool className="h-full w-full text-neutral-300" />,
      href: "/mentors",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-full w-full text-neutral-300" />,
      href: "/my-profile",
    },
  ]

  return (
    <div className="flex items-end justify-center  w-full">
      <FloatingDock items={links} className="mb-8" />
    </div>
  )
}

