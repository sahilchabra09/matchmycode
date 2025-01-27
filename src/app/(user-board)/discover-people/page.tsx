import { PeopleFeed } from "@/components/PeopleFeed"

export default async function PeopleFeedPage() {
  const data = await fetchUsers()
  return <PeopleFeed users={data} />
}

async function fetchUsers() {
  try {
    const response = await fetch("https://match-my-code.up.railway.app/user/post_user_details/user/search_users", {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }
    return response.json()
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

