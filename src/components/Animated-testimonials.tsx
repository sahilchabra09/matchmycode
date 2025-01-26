import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsHome() {
  const testimonials = [
    {
      quote:
        "Crafting an intuitive experience for users has always been my goal. This project allowed us to bring our creative vision to life.",
      name: "Harnoor Singh Arora",
      designation: "UI/UX Designer",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },{
      quote:
        "Designing the user interface for this platform was a rewarding challenge. Seeing how it has positively impacted users is truly fulfilling.",
      name: "Sahil Chabra",
      designation: "UI/UX Designer",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ,
    },
    
    {
      quote:
        "Developing the backend systems for this platform was an incredible experience. It's amazing to see our work come to life.",
      name: "Ashwath Peterson",
      designation: "Backend Developer",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Building a scalable and efficient backend was both challenging and rewarding. I'm proud of what we've accomplished together.",
      name: "Tushar Dhingra",
      designation: "Backend Developer",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
