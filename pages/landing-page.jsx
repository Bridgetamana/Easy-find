"use client";
import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UnauthorizedHeader from "@/components/unauthorized/Header";
import Hero from "@/components/unauthorized/Hero";
import TargetAudience from "@/components/unauthorized/TargetAudience";
import JobGrid from "@/components/authorized/JobGrid";
import TalentFeatures from "@/components/unauthorized/Features";
import BrowseJobs from "@/components/unauthorized/Jobs";
import TestimonialsSection from "@/components/unauthorized/Testimonials";
import CallToAction from "@/components/unauthorized/CallToAction";
import Footer from "@/components/unauthorized/Footer";

export default function LandingPage() {
  return (
    <div className="main">
      <div className="hero__main">
        <UnauthorizedHeader />
       <Hero />
      </div>
      <TargetAudience />
      {/* <TalentFeatures /> */}
      <JobGrid />
      {/* <BrowseJobs /> */}
      <CallToAction />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}



