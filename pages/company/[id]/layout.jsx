import React from "react";
import Footer from "@/components/unauthorized/Footer";
import UnauthorizedHeader from '@/components/unauthorized/Header'

export default function CompaniesLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <UnauthorizedHeader />
        <main className="main flex-1 justify-center items-center">
          {children}
        </main>
      <Footer />
    </div>
  );
}
