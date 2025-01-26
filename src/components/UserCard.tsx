import Link from "next/link"
import type { User } from "@/types/types"
import { Briefcase, Globe, LinkIcon } from "lucide-react"

export function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl shadow-lg hover:bg-neutral-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/user/${user.clerkId}`} className="block mb-4">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-neutral-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-neutral-400">{user.email}</p>
          </div>
        </div>
      </Link>
      {user.bio && <p className="mb-4 text-neutral-300">{user.bio}</p>}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span key={index} className="bg-neutral-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Interests</h3>
        <p className="text-neutral-300">{user.interests}</p>
      </div>
      {user.ongoing_project_links.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Ongoing Projects
          </h3>
          <ul className="list-disc list-inside text-neutral-300">
            {user.ongoing_project_links.map((link, index) => (
              <li key={index}>
                <Link href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Project {index + 1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {user.portfolio_links.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Portfolio
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.portfolio_links.map((link, index) => (
              <Link
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Link {index + 1}
              </Link>
            ))}
          </div>
        </div>
      )}
      {user.socials.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Socials</h3>
          <div className="flex flex-wrap gap-2">
            {user.socials.map((link, index) => (
              <Link
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center"
              >
                <LinkIcon className="w-4 h-4 mr-1" />
                Social {index + 1}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

