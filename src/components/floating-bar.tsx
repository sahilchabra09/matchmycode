"use client"

import React from "react"
import { FloatingDock } from "@/components/ui/floating-dock"
import { IconHome, IconUsers, IconUser, IconPlus, IconCode } from "@tabler/icons-react"

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: "/home",
    },
    {
      title: "Team",
      icon: <IconUsers className="h-full w-full text-neutral-300" />,
      href: "/team",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-full w-full text-neutral-300" />,
      href: "/my-profile",
    },
    {
      title: "Add",
      icon: <IconPlus className="h-full w-full text-neutral-300" />,
      href: "/add",
    },
    {
      title: "Code",
      icon: <IconCode className="h-full w-full text-neutral-300" />,
      href: "/code",
    },
  ]

  return (
    <div className="flex items-end justify-center  w-full">
      <FloatingDock items={links} className="mb-8" />
    </div>
  )
}

