"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState, useEffect } from "react";

export function UserSearch() {
  const placeholders = [
    "Search for user by skills",
    "Search for user by interests",
    "Search for user by tags",
  ];

  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    const input = e.currentTarget.querySelector("input")?.value || "";

    try {
      const params = new URLSearchParams();
      const activePlaceholder = placeholders[currentPlaceholderIndex].toLowerCase();

      if (activePlaceholder.includes("skills")) params.set("skills", input);
      else if (activePlaceholder.includes("interests")) params.set("interests", input);
      else if (activePlaceholder.includes("tags")) params.set("tags", input);

      const response = await fetch(
        `https://pleasant-mullet-unified.ngrok-free.app/user/search_users?${params}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search failed:", error);
      setError(error instanceof Error ? error.message : "Failed to search users");
    } finally {
      setIsLoading(false);
    }
};

  const parseArray = (str: string) => {
    try {
      return JSON.parse(str.replace(/{/g, "[").replace(/}/g, "]"));
    } catch {
      return str.replace(/[{}"]/g, "").split(",");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-20">
    <div className="w-full max-w-2xl fixed top-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={() => {}}
        onSubmit={onSubmit}
      />
    </div>

    {error && (
      <div className="mt-24 text-red-500">
        Error: {error}
      </div>
    )}

      {isLoading && <p className="mt-24 text-gray-500">Searching users...</p>}

      {!isLoading && searchResults.length > 0 && (
        <div className="w-full max-w-3xl mt-24 space-y-4">
          {searchResults.map((user) => (
            <div
              key={user.clerkId}
              className="p-6 bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <p className="text-white mb-4">{user.email}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-white">Skills</h4>
                  <ul className="list-disc list-inside">
                    {user.skills.map((skill: string, i: number) => (
                      <li key={i} className="text-white">{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white">Tags</h4>
                  <ul className="list-disc list-inside">
                    {user.tags.map((tag: string, i: number) => (
                      <li key={i} className="text-white">{tag}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white">Interests</h4>
                  <ul className="list-disc list-inside">
                    {parseArray(user.interests).map((interest: string, i: number) => (
                      <li key={i} className="text-white">{interest}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {user.portfolio_links?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-white">Portfolio</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.portfolio_links.map((link: string, i: number) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {new URL(link).hostname}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}