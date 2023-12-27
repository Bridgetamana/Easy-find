'use client'
import React from 'react';
// import ExpectationSection from '@components/authorized/ExpectationSection';
import Hero from '@/components/authorized/Hero';
import AppliedJobs from '@/components/authorized/TalentComponents/AppliedJobs';
import ExpectationSection from '@/components/authorized/TalentComponents/ExpectationSection';
import SavedJobs from '@/components/authorized/TalentComponents/SavedJobs';
import UserName from '@/components/authorized/TalentComponents/UserName';

export default function HomePage() {
  return (
    <div className='main'>
      <UserName />
      <Hero />
      <ExpectationSection/>
      <SavedJobs/>
      <AppliedJobs/>
    </div>
  )
}
