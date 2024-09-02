import React from "react";
import Footer from "@/components/authorized/Footer";
import TalentHeader from "@/components/authorized/TalentComponents/TalentHeader";

export default function TalentLayout({ children }) {
  return (
    <div>
      <TalentHeader />
      <main className='main'>{children}</main>
      <Footer />
    </div>
  );
}
