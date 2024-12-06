import React from 'react'
import Footer from '@/components/unauthorized/Footer'
import Header from '@/components/unauthorized/Header'
import { useRouter } from 'next/router';

export default function BlogLayout( { children }) {
  const router = useRouter();
  const isTalentPath = router.pathname.startsWith('/talent');
  const isCompanyPath = router.pathname.startsWith('/company');

  const headerType = isTalentPath
    ? 'talent'
    : isCompanyPath
    ? 'company'
    : 'default';


  return (
    <div className='flex flex-col min-h-screen'>
      {/* <BlogHeader type={headerType}/> */}
      <Header />
      <main className="main flex-1 justify-center items-center">{children}</main>
      <Footer />
    </div>
  )
}
