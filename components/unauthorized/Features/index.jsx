import React from "react";
import styles from "./style.module.scss";
import { ArrowUpOnSquareIcon, DocumentCheckIcon, DocumentTextIcon } from "@heroicons/react/20/solid";

const features = [
  {
    description: "Sign up and create your talent account.",
    name: "Step 1",
    icon: DocumentCheckIcon,
  },
  {
    description: "Upload your resume to showcase your skills and experience.",
    name: "Step 2",
    icon: ArrowUpOnSquareIcon,
  },
  {
    description: "Browse through job listings and find your dream job.",
    name: "Step 3",
    icon: DocumentTextIcon,
  },
];

export default function TalentFeatures() {
  return (
    <section className={styles.talentFeatures__section}>
      <div className={styles.features__container}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>How EasyFind Works</h2>
          <h3 className={styles.section__subtitle}>Explore what you can do as a new talent in the rising.</h3>
        </div>
        <div className={styles.features__cards}>
            <div className={styles.card}>
          <div className={styles.features__card}>
              <div className={styles.title}>
                <span className={styles.text__title}>Step</span>
                <h4 className={styles.number__title}>1</h4>
              </div>
              <p className={styles.card__description}>
                Sign up and create your talent account.
              </p>
            </div>
          </div>
            <div className={styles.card}>
          <div className={styles.features__card}>
              <div className={styles.title}>
                <span className={styles.text__title}>Step</span>
                <h4 className={styles.number__title}>2</h4>
              </div>
              <p className={styles.card__description}>
                Upload your resume to showcase your skills and experience.
              </p>
            </div>
          </div>
            <div className={styles.card}>
          <div className={styles.features__card}>
              <div className={styles.title}>
                <span className={styles.text__title}>Step</span>
                <h4 className={styles.number__title}>3</h4>
              </div>
              <p className={styles.card__description}>
                Browse through job listings and find your dream job.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}