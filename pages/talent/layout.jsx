import React from "react";
import Footer from "@/components/authorized/Footer";
import TalentHeader from "@/components/authorized/TalentComponents/TalentHeader";

export default function TalentLayout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <TalentHeader />
      <main className="main flex-1 justify-center items-center">{children}</main>
      <Footer />
    </div>
  );
}
