"use client"
import React from 'react';
import JobHero from '@/components/authorized/JobHero';
import JobGrid from '@/components/authorized/JobGrid';

export default function JobListingsPage() {

  return (
    <div className="job__page">
      {/* <JobHero/> */}
      <JobGrid/>
    </div>
  );
}
