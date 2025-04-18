"use client";

import { navItems } from "@/data";
import Link from "next/link";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Blog from "@/components/Blog";
import WhatsAppButton from "@/components/WhatsAppButton";
import Pricing from "@/components/Pricing";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Link 
        href="/" 
        className="fixed top-10 left-10 z-[5001]"
      >
        <div 
          className="px-4 py-2 border border-white/[0.2] rounded-lg bg-black/20 
          hover:bg-black/30 transition-colors backdrop-blur-sm"
        >
          <span className="text-white font-bold text-lg">
            HackInversion
          </span>
        </div>
      </Link>

      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        {/* <RecentProjects /> */}
        <Experience />
        <Pricing />
        <Approach />
        <Blog />
        <Clients />
        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
};

export default Home;
