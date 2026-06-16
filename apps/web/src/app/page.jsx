"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/nevisense/LoadingScreen";
import Navbar from "@/components/nevisense/Navbar";
import HeroSection from "@/components/nevisense/HeroSection";
import {
  ChallengeSection,
  WhatItDoesSection,
  IndependenceSection,
  BiomarkersSection,
  BeyondNavigationSection,
  HealthInsightsSection,
  WhoItServesSection,
} from "@/components/nevisense/ContentSections";
import {
  VisionSection,
  InvestorSection,
  FinalSection,
} from "@/components/nevisense/FinalSections";

export default function NeviSensePage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
          backgroundColor: "#FAFAF9",
        }}
      >
        <Navbar />
        <HeroSection scrollY={scrollY} />
        <ChallengeSection />
        <WhatItDoesSection />
        <IndependenceSection />
        <BiomarkersSection />
        <BeyondNavigationSection />
        <HealthInsightsSection />
        <WhoItServesSection />
        <VisionSection />
        <InvestorSection />
        <FinalSection />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
        }

        html {
          font-family: 'Inter', system-ui, sans-serif;
          scroll-behavior: smooth;
        }

        body {
          background-color: #FAFAF9;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::-webkit-scrollbar {
          width: 3px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #C41E3A;
          border-radius: 2px;
        }

        @keyframes scrollLine {
          0% { top: -100%; height: 100%; }
          100% { top: 100%; height: 100%; }
        }

        input::placeholder {
          color: rgba(255,255,255,0.2) !important;
        }

        @media (max-width: 768px) {
          nav .hidden-mobile {
            display: none !important;
          }
          nav .show-mobile {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          nav .show-mobile {
            display: none !important;
          }
          nav .hidden-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
