"use client"

import { useState } from "react"
import type { User } from "@/types/types"
import { UserCard } from "./UserCard"
import { Search } from "lucide-react"

export function PeopleFeed({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.interests.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen  text-neutral-100 p-4 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Find People</h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name, skills, or interests"
            className="w-full p-4 pr-12 bg-neutral-800 border border-neutral-700 rounded-full text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all duration-300 ease-in-out"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </div>
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] pr-4 -mr-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.clerkId} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

