"use client"

import { AnimatedTestimonialsHome } from "@/components/Animated-testimonials"
import { FeatureSection } from "@/components/features"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/moving-border"
import { Spotlight } from "@/components/ui/Spotlight"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative overflow-hidden min-h-screen flex items-center">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold bg-clip-text p-8 text-transparent bg-gradient-to-b from-white to-gray-400 mb-6">
                  MatchMyCode
                </h1>
                <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                  Find your perfect hackathon team with skill-based matchmaking, portfolio showcases, and mentor
                  endorsements.
                </p>
                <Link href="/sign-in">
                <Button
                  borderRadius="1.75rem"
                  className="text-lg px-8 py-4 relative overflow-hidden 
                    bg-gradient-to-br from-black via-zinc-900 to-black
                    border border-gray-700/50 hover:border-blue-400/30
                    shadow-[0_0_15px_-3px_rgba(96,165,250,0.1)]
                    hover:shadow-[0_0_25px_-3px_rgba(96,165,250,0.2)]
                    transition-all duration-300 group"
              
                >
                  Login/Signup
                </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Core Features Section */}
          <section className="py-24 md:py-32 bg-black bg-grid-white/[0.02] relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
              >
               Your Journey Starts Here
              </motion.h2>
              <FeatureSection />
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 md:py-32 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
              >
                What Users Are Saying
              </motion.h2>
              <AnimatedTestimonialsHome />
            </div>
          </section>

          
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

