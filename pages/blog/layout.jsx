import React from 'react'
import Footer from '@/components/unauthorized/Footer'
import BlogHeader from '../../components/unauthorized/BlogHeader'

export default function BlogLayout( { children }) {
  return (
    <div>
      <BlogHeader />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
