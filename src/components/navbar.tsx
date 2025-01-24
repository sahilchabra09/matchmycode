"use client"
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarHome() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText }
  ]

  return <NavBar items={navItems} />
}

// "use client"

// import React from "react"
// import { FloatingNav } from "@/components/ui/floating-navbar"
// import { Home, MessageSquare, User } from "lucide-react"

// export function NavBarHome() {
//   const navItems = [
//     {
//       name: "Home",
//       link: "/",
//       icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
//     },
//     {
//       name: "About",
//       link: "/about",
//       icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
//     },
//     {
//       name: "Contact",
//       link: "/contact",
//       icon: <MessageSquare className="h-4 w-4 text-neutral-500 dark:text-white" />,
//     },
//   ]

//   return (
//     <div className="relative w-full">
//       <FloatingNav navItems={navItems} />
//     </div>
//   )
// }