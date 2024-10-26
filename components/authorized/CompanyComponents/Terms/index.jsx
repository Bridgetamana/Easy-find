import React from 'react'
import styles from './style.module.scss'

export default function CompanyTerms() {
  return (
    <div className={styles.terms__container}>
        <h1 className={styles.terms__header}>Terms and Conditions</h1>
        <ol className={styles.terms__list}>
            <li className={styles.terms__item}>
                <strong>Purpose:</strong> These terms and conditions ("Terms") govern your use of <span className={styles.platform__text}>EasyFind</span> a company seeking to post job listings. By posting a job listing on the platform, you agree to be bound by these Terms.
            </li>
            <li className={styles.terms__item}>
                <strong>Job Listings:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>You agree to provide accurate and up-to-date information in your job listings.</li>
                    <li className={styles.terms__item}>You are responsible for any costs associated with processing applications or conducting interviews.</li>
                    <li className={styles.terms__item}>We reserve the right to remove or modify any job listing that violates our terms or is deemed inappropriate.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>Payment:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>You may be required to pay a fee for posting job listings on the platform.</li>
                    <li className={styles.terms__item}>Payment terms will be communicated to you upon registration or when you post your first job listing.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>User Data:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>We may collect and process your company's information and the information of job applicants who apply to your listings.</li>
                    <li className={styles.terms__item}>We will handle this data in accordance with our Privacy Policy.</li>
                </ul>
            </li>
            <li className={styles.terms__item}>
                <strong>Disclaimer:</strong>
                <ul className={styles.unordered__list}>
                    <li className={styles.terms__item}>We do not guarantee the quality or suitability of job applicants.</li>
                    <li className={styles.terms__item}>We are not responsible for any disputes or legal issues that may arise between you and job applicants.</li>
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
        <p className={styles.terms__accept}>By posting a job listing on EasyFind, you agree to these Terms and Conditions.</p>
    </div>
  )
}
