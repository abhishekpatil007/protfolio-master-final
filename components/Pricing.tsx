"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/MovingBorders";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pricing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const packages = [
    {
      title: "Starter",
      price: "Starts from ₹20,000",
      description: "Perfect for personal portfolios, landing pages, or startup MVPs.",
      features: [
        "1-2 page responsive website",
        "Built with React / Next.js",
        "Basic SEO setup",
        "Contact form integration",
        "Deployed and hosted"
      ],
      delivery: "3-5 days",
      className: "md:col-span-2"
    },
    {
      title: "Professional",
      price: "Starts from ₹40,000",
      description: "Ideal for businesses and startups that want performance and style.",
      features: [
        "3-5 page modern responsive site",
        "Custom design with Tailwind + Framer Motion",
        "Optimized for speed, SEO, and conversions",
        "Blog or services page included",
        "Contact/social integrations"
      ],
      delivery: "7-10 days",
      className: "md:col-span-2"
    },
    {
      title: "Premium Web App",
      price: "₹60,000 – ₹1,00,000+",
      description: "For serious businesses looking to build powerful web apps.",
      features: [
        "Full-stack web app",
        "Admin dashboard",
        "Authentication + APIs",
        "Payment gateway integration",
        "Deployed with CI/CD setup"
      ],
      delivery: "2-4 weeks",
      className: "md:col-span-2"
    }
  ];

  const addons = [
    { name: "Blog/Content System", price: "₹5,000 – ₹15,000" },
    { name: "Reservation/Booking System", price: "₹20,000 +" },
    { name: "Payment Gateway", price: "₹5,000 – ₹10,000" },
    { name: "WhatsApp or Live Chat Setup", price: "₹2,000 – ₹5,000" },
    { name: "Monthly Maintenance", price: "₹3,000 – ₹7,000" },
    { name: "Hosting & Domain Setup", price: "₹2,000 – ₹4,000" },
    { name: "Figma to React Code", price: "₹15,000 – ₹30,000" },
    { name: "SEO Optimization", price: "₹5,000 – ₹10,000" }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + packages.length) % packages.length);
  };

  return (
    <section id="pricing" className="py-20 w-full">
      <h1 className="heading">
        Web Development <span className="text-purple">Packages</span>
      </h1>

      <p className="text-center text-white-100 mt-4 mb-10 max-w-3xl mx-auto">
        Whether you're launching your personal brand, scaling your business, or building a full-blown web app — I've got you covered.
      </p>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-5xl px-4">
          <div className="flex flex-col items-center">
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <button
                className="absolute left-0 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => paginate(-1)}
              >
                <FaChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 40,
                        mass: 0.8
                      },
                      opacity: { 
                        duration: 0.2,
                        ease: "easeInOut"
                      },
                      scale: {
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        mass: 0.8
                      }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="w-full"
                  >
                    <Button
                      duration={Math.floor(Math.random() * 10000) + 10000}
                      borderRadius="1.75rem"
                      style={{
                        background: "rgb(4,7,29)",
                        backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                        borderRadius: `calc(1.75rem * 0.96)`,
                      }}
                      className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800 w-full"
                    >
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">{packages[currentIndex].title}</h2>
                        <p className="text-xl text-purple mb-4">{packages[currentIndex].price}</p>
                        <p className="text-white-100 mb-4">{packages[currentIndex].description}</p>
                        <ul className="space-y-2 mb-4">
                          {packages[currentIndex].features.map((feature, i) => (
                            <li key={i} className="flex items-center text-white-100">
                              <span className="mr-2">✅</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <p className="text-white-100">⏱️ Delivery: {packages[currentIndex].delivery}</p>
                      </div>
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                className="absolute right-0 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => paginate(1)}
              >
                <FaChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {packages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-purple" : "bg-gray-500"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <div className="mt-16 w-full">
              <h2 className="text-2xl font-bold text-center mb-8">✨ Add-ons</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {addons.map((addon, index) => (
                  <Button
                    key={index}
                    duration={Math.floor(Math.random() * 10000) + 10000}
                    borderRadius="1.75rem"
                    style={{
                      background: "rgb(4,7,29)",
                      backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                      borderRadius: `calc(1.75rem * 0.96)`,
                    }}
                    className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">{addon.name}</h3>
                      <p className="text-purple">{addon.price}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center max-w-2xl mx-auto">
              <p className="text-xl mb-4">💬 Need something custom?</p>
              <p className="text-white-100 mb-6">
                Let's talk. I'll tailor a solution to your exact needs — just{" "}
                <a href="#contact" className="text-purple hover:underline">
                  Contact Me
                </a>{" "}
                or{" "}
                <a href="#contact" className="text-purple hover:underline">
                  Book a Free Call
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 