'use client'
import React from 'react';
// import ExpectationSection from '@components/authorized/ExpectationSection';
import Hero from '@/components/authorized/Hero';
import AppliedJobs from '@/components/authorized/Talent/AppliedJobs';
import ExpectationSection from '@/components/authorized/Talent/ExpectationSection';
import SavedJobs from '@/components/authorized/Talent/SavedJobs';

export default function HomePage() {
  return (
    <div className='main'>
      <Hero />
      <ExpectationSection/>
      <SavedJobs/>
      <AppliedJobs/>
    </div>
  )
}
