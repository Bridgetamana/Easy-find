import React from 'react'
import Footer from '@/components/unauthorized/Footer'
import  UnauthorizedHeader  from '@/components/unauthorized/Header'

export default function BlogLayout( { children }) {
  return (
    <div>
      <UnauthorizedHeader />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
