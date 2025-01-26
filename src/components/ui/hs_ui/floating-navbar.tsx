"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()

  const [visible, setVisible] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const currentScroll = scrollYProgress.get()
      const direction = currentScroll - lastScroll

      if (currentScroll < 0.05) {
        setVisible(true) // Keep visible at the very top
      } else if (direction > 0) {
        setVisible(false) // Scrolling down
      } else {
        setVisible(true) // Scrolling up
      }

      setLastScroll(currentScroll)
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -5,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-gray-800 rounded-full bg-black/90 text-gray-300 shadow-md px-4 py-2 items-center justify-center space-x-4",
          "dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-200",
          className,
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-sm transition-colors duration-150 ease-in-out hover:text-white",
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </Link>
        ))}
        <button className="text-sm bg-gray-800 text-white px-3 py-1.5 rounded-full transition-colors duration-150 ease-in-out hover:bg-gray-700">
          <span>Login</span>
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

