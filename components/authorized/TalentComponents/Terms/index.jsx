import React from 'react'
import styles from './style.module.scss'

export default function TalentTerms() {
  return (
    <div className={styles.terms__container}>
        <h1 className={styles.terms__header}>Terms and Conditions</h1>
        <ol className={styles.terms__list}>
            <li className={styles.terms__item}>
                <strong>Purpose:</strong> These terms and conditions ("Terms") govern your use of <span className={styles.platform__text}>EasyFind</span> as a job seeker. By accessing or using the platform, you agree to be bound by these Terms.
            </li>
            <li className={styles.terms__item}>
                <strong>User Conduct:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>You agree to use the platform in a lawful, ethical, and respectful manner.</li>
                    <li className={styles.terms__item}>You will not engage in any activities that may harm or disrupt the platform or other users.</li>
                    <li className={styles.terms__item}>You will not use the platform to distribute spam, unsolicited commercial messages, or harmful content.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>Job Listings:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>Job listings are provided by third-party employers and may be subject to change.</li>
                    <li className={styles.terms__item}>We do not guarantee the accuracy or completeness of job listings.</li>
                    <li className={styles.terms__item}>You are responsible for verifying the legitimacy of job offers and conducting your own due diligence.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>Privacy:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>We collect and process your personal information in accordance with our Privacy Policy.</li>
                    <li className={styles.terms__item}>You consent to the collection and use of your personal information as described in the Privacy Policy.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>Disclaimer:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>We make no warranties or representations regarding the platform or the job listings.</li>
                    <li className={styles.terms__item}>We are not responsible for any damages or losses arising from your use of the platform.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>Termination:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>We may terminate your access to the platform at any time, for any reason, without notice.</li>
                    <li className={styles.terms__item}>You may terminate your use of the platform at any time.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>Governing Law:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</li>
                </ul>
            </li>
        </ol>
        <p className={styles.terms__accept}>By using EasyFind, you agree to these Terms and Conditions.</p>
    </div>
  )
}
