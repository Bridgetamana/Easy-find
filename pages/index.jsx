"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UnauthorizedHeader from "@/components/unauthorized/Header";
import Hero from "@/components/unauthorized/Hero";
import TargetAudience from "@/components/unauthorized/TargetAudience";
import TalentFeatures from "@/components/unauthorized/Features";
import TestimonialsSection from "@/components/unauthorized/Testimonials";
import CallToAction from "@/components/unauthorized/CallToAction";
import Footer from "@/components/unauthorized/Footer";
import BlogExerpts from "@/components/unauthorized/BlogExerpts";
import TrustedCompanies from "@/components/unauthorized/TrustedCompanies";
import TalentCTA from "@/components/unauthorized/CallToAction/TalentCTA";

export default function Home() {
  return (
    <div className="app">
      <div className="main bg-white">
        <div className="hero__main">
          <UnauthorizedHeader />
          <Hero />
        </div>
        <TargetAudience />
        <TalentCTA />
        <TrustedCompanies />
        <BlogExerpts />
        {/* <TalentFeatures /> */}
        {/* <AboutBlog /> */}
        {/* <BrowseJobs /> */}
        <TestimonialsSection />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
