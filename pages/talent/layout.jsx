import React from "react";
import Footer from "@/components/authorized/Footer";
import TalentHeader from "@/components/authorized/TalentComponents/TalentHeader";
import styles from '../../../styles/global.scss'

export const metadata = {
  title: "EasyFind",
  description: "Hire the best talent or get hired for your dream job",
  keywords: "hire, talents, jobs, remote, nigeria, africa, easyfind, easy, find",
};

export default function TalentLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.app}>
          <TalentHeader />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
