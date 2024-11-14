import React from 'react'
import Footer from '@/components/unauthorized/Footer'
import BlogHeader from '../../components/unauthorized/BlogHeader'
import UnauthorizedHeader from '@/components/unauthorized/Header'

export default function BlogLayout( { children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <UnauthorizedHeader />
      <main className="main flex-1 justify-center items-center">{children}</main>
      <Footer />
    </div>
  )
}
