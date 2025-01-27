"use client"; // If you're using the Next.js App Router, ensure client-side usage

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function UserDetailsForm() {
  const { user } = useUser();

  // Local state for form inputs
  // Existing fields
  const [interests, setInterests] = useState("");
  const [ongoingProjectLinks, setOngoingProjectLinks] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [skills, setSkills] = useState("");
  const [socials, setSocials] = useState("");
  const [tags, setTags] = useState("");

  // New fields from the updated JSON
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [stateLocation, setStateLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare body data for POST request
    const data = {
      clerkId: user?.id || "",
      bio,
      city,
      country,
      state: stateLocation,
      interests: interests.split(",").map((i) => i.trim()),
      ongoing_project_links: ongoingProjectLinks.split(",").map((link) => link.trim()),
      portfolio_links: portfolioLinks.split(",").map((link) => link.trim()),
      skills: skills.split(",").map((s) => s.trim()),
      socials: socials.split(",").map((s) => s.trim()),
      tags: tags.split(",").map((t) => t.trim()),
    };

    try {
      const response = await fetch("https://match-my-code.up.railway.app/user/post_user_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Failed to submit user details");
      } else {
        console.log("User details submitted successfully!");
        // Optionally clear the form or show a success message
      }
    } catch (error) {
      console.error("Error submitting user details:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <motion.div
        className="max-w-md w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Update Your Details</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Clerk ID (read-only) */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Clerk ID:</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
              value={user?.id || ""}
              readOnly
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Bio:</label>
            <textarea
              placeholder="Tell us a bit about yourself..."
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 text-sm font-semibold">City:</label>
            <input
              type="text"
              placeholder="e.g. San Francisco"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-2 text-sm font-semibold">State:</label>
            <input
              type="text"
              placeholder="e.g. California"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={stateLocation}
              onChange={(e) => setStateLocation(e.target.value)}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Country:</label>
            <input
              type="text"
              placeholder="e.g. United States"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Interests:</label>
            <input
              type="text"
              placeholder="e.g. Coding, Music, Art"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
            <small className="text-gray-400">Separate multiple entries with commas</small>
          </div>

          {/* Ongoing Project Links */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Ongoing Project Links:</label>
            <input
              type="text"
              placeholder="e.g. http://github.com/my-project, http://mywebsite.com"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ongoingProjectLinks}
              onChange={(e) => setOngoingProjectLinks(e.target.value)}
            />
            <small className="text-gray-400">Separate links with commas</small>
          </div>

          {/* Portfolio Links */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Portfolio Links:</label>
            <input
              type="text"
              placeholder="e.g. http://portfolio.me, http://behance.net/mywork"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={portfolioLinks}
              onChange={(e) => setPortfolioLinks(e.target.value)}
            />
            <small className="text-gray-400">Separate links with commas</small>
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Skills:</label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, Design"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <small className="text-gray-400">Separate multiple skills with commas</small>
          </div>

          {/* Socials */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Socials:</label>
            <input
              type="text"
              placeholder="e.g. Twitter, LinkedIn, Instagram"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={socials}
              onChange={(e) => setSocials(e.target.value)}
            />
            <small className="text-gray-400">Separate multiple socials with commas</small>
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Tags:</label>
            <input
              type="text"
              placeholder="e.g. Developer, Designer"
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <small className="text-gray-400">Separate multiple tags with commas</small>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-500 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
