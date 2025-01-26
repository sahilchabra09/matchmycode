
import React, { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Trophy } from "lucide-react"

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
            opacity: 0,
            y: -20,
          }}
          animate={{
            y: visible ? 0 : -20,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "flex max-w-fit fixed top-6 inset-x-0 mx-auto rounded-full",
            "bg-gradient-to-r from-black/90 via-black/80 to-black/90 backdrop-blur-lg",
            "border border-gray-900/50 shadow-2xl shadow-black/50",
            "px-6 py-3 items-center justify-center space-x-6",
            "text-gray-300 z-50 hover:text-white transition-all",
            "group/navbar", // Group for parent hover effects
            className
          )}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover/navbar:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at center, rgba(59,130,246,0.15) 0%, transparent 80%)`,
            }}
          />
          
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            initial={false}
            animate={{
              border: "1px solid rgba(63,63,70,0.2)",
            }}
            whileHover={{
              border: "1px solid rgba(63,63,70,0.5)",
            }}
            transition={{ duration: 0.3 }}
          />
  
          {navItems.map((navItem, idx) => (
            <motion.div
              key={`link-${idx}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                href={navItem.link}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors",
                  "hover:text-white hover:font-bold relative px-3 py-1.5 rounded-full"
                )}
              >
                {/* Icon with animated underline */}
                {navItem.icon && (
                  <motion.span
                    className="text-white"
                    whileHover={{ scale: 1.2 }}
                  >
                    {navItem.icon}
                  </motion.span>
                )}
                
                <motion.span
                  className="hidden sm:block relative"
                  initial={false}
                  animate={{ opacity: 1 }}
                  whileHover={{
                    transition: { staggerChildren: 0.1 },
                  }}
                >
                  {navItem.name}
                  {/* Animated underline */}
                  <motion.span
                    className="absolute left-0 -bottom-1 w-full h-px bg-white"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            </motion.div>
          ))}
  
          
        </motion.div>
      </AnimatePresence>
    )
  }