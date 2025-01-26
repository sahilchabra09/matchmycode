"use client";

import { CreateHackathonDialog } from "@/components/create-hackathon";

export default function HackathonsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hackathons</h1>
      <p className="mb-6 text-lg">
        Create and manage hackathons to connect with developers and showcase your innovative ideas.
      </p>
      {/* WILL BE ADDED TO ORGANISER DASHBOARD
       */}
      <CreateHackathonDialog />
    </div>
  );
}
