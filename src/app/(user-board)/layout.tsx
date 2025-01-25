import FloatingDockDemo from "@/components/floating-bar";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen flex flex-col">
        <main className="flex-grow overflow-auto">
          {children}
        </main>
        <div className="fixed bottom-0 w-full">
          <FloatingDockDemo />
        </div>
      </div>
    </>
  );
}