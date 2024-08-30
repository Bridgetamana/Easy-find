import React from "react";
import styles from "./style.module.scss";

export default function AppliedCandidates() {
  // Mock data for applied candidates
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      resume: "https://example.com/resume-johndoe.pdf",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      resume: "https://example.com/resume-janesmith.pdf",
    },
    // Add more candidates as needed
  ];

  return (
    <section className={styles.appliedCandidates__section}>
      <div className={styles.appliedCandidates__container}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Applied Candidates</h2>
        </div>
        <div className={styles.section__body}>
          {candidates.length > 0 ? (
            <ul className={styles.candidate__list}>
              {candidates.map((candidate) => (
                <li key={candidate.id} className={styles.candidate__item}>
                  <h4 className={styles.candidate__name}>{candidate.name}</h4>
                  <p className={styles.candidate__email}>{candidate.email}</p>
                  <a
                    href={candidate.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.candidate__resume}
                  >
                    View Resume
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No candidates have applied to this job yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
