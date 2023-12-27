import React from "react";

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
    <section className="appliedCandidates__section">
      <div className="appliedCandidates__container">
        <div className="section__header">
          <h2 className="section__title">Applied Candidates</h2>
        </div>
        <div className="section__body">
          {candidates.length > 0 ? (
            <ul className="candidate__list">
              {candidates.map((candidate) => (
                <li key={candidate.id} className="candidate__item">
                  <h4 className="candidate__name">{candidate.name}</h4>
                  <p className="candidate__email">{candidate.email}</p>
                  <a
                    href={candidate.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="candidate__resume"
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
