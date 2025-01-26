import { FeatureSteps } from "@/components/feature-section"

const features = [
  // { 
  //   step: 'Step 1', 
  //   title: 'Discover Your Potential',
  //   content: 'Kickstart your journey by identifying key skills and foundational knowledge.', 
  //   image: 'https://images.unsplash.com/photo-1584697964153-4cdecb234a15?q=80&w=2070&auto=format&fit=crop' 
  // },
  { 
    step: 'Step 2',
    title: 'Learn and Grow',
    content: 'Expand your expertise with in-depth learning and skill-building exercises.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: 'Step 3',
    title: 'Collaborate and Innovate',
    content: 'Work with teams to apply your skills and create impactful projects.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop'
  },
  // { 
  //   step: 'Step 4',
  //   title: 'Showcase Your Achievements',
  //   content: 'Build a portfolio of projects to demonstrate your capabilities to the world.',
  //   image: 'https://images.unsplash.com/photo-1527251066635-ec6a4903f7d2?q=80&w=2070&auto=format&fit=crop'
  // },
];

export function FeatureSection() {
  return (
      <FeatureSteps 
        features={features}
        title="Your Journey Starts Here"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
      />
  )
}