import React from "react";
import Footer from "@/components/authorized/Footer";
import TalentHeader from "@/components/authorized/TalentComponents/TalentHeader";
import styles from "./style.module.scss";


export default function TalentLayout({ children }) {
  return (
    <div className={styles.app}>
      <TalentHeader />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
