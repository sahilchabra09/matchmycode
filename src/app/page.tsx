import { CarouselDemo } from "@/components/features";
import { NavBarHome } from "@/components/navbar";
import { AnimatedTestimonialsHome} from "@/components/testimonials";
import { ThemeProvider } from "@/components/theme-provider";
import { Header1 } from "@/components/ui/header";
import { Button } from "@/components/ui/moving-border";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    <NavBarHome/>
 <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          MatchMyCode <br />
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          A simple and easy way to match your code with the best People
          available on the internet.
        </p>
        <div className="flex justify-center mt-10">
      <Button>Get Started</Button>
    </div>
      </div>
    </div>
    <CarouselDemo/>
    <AnimatedTestimonialsHome/>


    </ThemeProvider>
  );
}
