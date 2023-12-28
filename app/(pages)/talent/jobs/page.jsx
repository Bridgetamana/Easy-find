// "use client";

import React from 'react';
import JobHero from '@/components/authorized/JobHero';
import JobGrid from '@/components/authorized/JobGrid';
import JobDetails from '@/components/authorized/JobDetails';
import './style.scss';

export default function JobListingsPage() {

  return (
    <div className="job__page">
      <JobHero/>
      <div className="job__grid">
        <JobGrid/>
        <JobDetails/>
      </div>
    </div>
  );
}
