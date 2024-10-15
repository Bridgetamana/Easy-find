import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { addJobPost } from "@/firebaseConfig/companyStore";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./style.module.scss";

const JobPostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCoverLetterRequired, setIsCoverLetterRequired] = useState(false);
  const [isError, setIsError] = useState(false);

  const initialFormData = {
    jobTitle: "",
    jobDescription: "",
    location: "",
    industry: "",
    requirements: EditorState.createEmpty(),
    benefits: EditorState.createEmpty(),
    salaryMin: "",
    salaryMax: "",
    salaryType: "",
    employmentType: "",
    jobLevel: "",
    educationExperience: EditorState.createEmpty(),
    experience: "",
    deadline: "",
    coverLetterRequired: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    // Convert the EditorState fields to HTML
    const cleanFormData = {
      title: formData.jobTitle,
      description: formData.jobDescription,
      datePosted: formatDate(new Date()), // Format the date to YYYY-MM-DD
      deadline: formatDate(new Date(formData.deadline)), // Format the deadline date to YYYY-MM-DD
      industry: formData.industry,
      jobLevel: formData.jobLevel,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
      jobType: formData.employmentType,
      location: formData.location,
      requirements: formData.requirements,
      benefits: formData.benefits,
      educationExperience: formData.educationExperience,
      experience: formData.experience,
      deadline: formatDate(new Date(formData.deadline)),
      createdAt: new Date(),
      active: true,
      inactive: false,
      saved: true,
      seen: true,
      applied: true,
      isCoverLetterRequired: isCoverLetterRequired    
    };

    setIsLoading(true);
    setIsSuccess(false);

    try {
      // Save job post to the company's collection in Firebase
      await addJobPost(user.uid, cleanFormData);

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData(initialFormData); 
      }, 1000);
    } catch (error) {
      console.error("Error saving job post:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCoverLetterToggle = () => {
    setIsCoverLetterRequired(!isCoverLetterRequired);
  };

  const handleEditorChange = (field, editorState) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: editorState,
    }));
  };

  // Function to format the date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <section className={styles.jobPostings__section}>
      <div className={styles.jobPosting__container}>
        <div className={styles.section__header}>
          <h2 className={styles.section__title}>Job Postings</h2>
          <p className={styles.section__subtitle}>
            Share the details of your job advert.
          </p>
        </div>
        <form className={styles.jobPosting__form} onSubmit={handleSaveClick}>
          <div className={styles.input__wrap}>
            <label htmlFor="job-title">Job Title:</label>
            <input
              type="text"
              className={styles.input__field}
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter the job title"
              required
            />
          </div>
          <div className={styles.input__wrap}>
            <label htmlFor="job-description">Job Description:</label>
            <textarea
              name="jobDescription"
              className={styles.text__field}
              cols="30"
              rows="10"
              value={formData.jobDescription}
              onChange={handleChange}
              required
              placeholder="Describe the job in detail"
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="requirements">Requirements:</label>
            <Editor
              name="requirements"
              editorState={formData.requirements}
              onEditorStateChange={(editorState) =>
                handleEditorChange("requirements", editorState)
              }
              wrapperClassName={styles.wrapperClassName}
              editorClassName={styles.editorClassName}
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="benefits">Benefits:</label>
            <Editor
              name="benefits"
              editorState={formData.benefits}
              onEditorStateChange={(editorState) =>
                handleEditorChange("benefits", editorState)
              }
              required
              wrapperClassName={styles.wrapperClassName}
              editorClassName={styles.editorClassName}
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="education-experience">
              Education & Experience:
            </label>
            <Editor
              name="educationExperience"
              editorState={formData.educationExperience}
              onEditorStateChange={(editorState) =>
                handleEditorChange("educationExperience", editorState)
              }
              required
              wrapperClassName={styles.wrapperClassName}
              editorClassName={styles.editorClassName}
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="industry">Industry:</label>
            <input
              type="text"
              className={styles.input__field}
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g. Software Development"
              required
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              className={styles.input__field}
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Lagos, Nigeria"
              required
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              className={styles.input__field}
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              required
              placeholder="Minimum Salary"
            />
            <input
              type="number"
              className={styles.input__field}
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              required
              placeholder="Maximum Salary"
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="salary-type">Salary Type:</label>
            <select
              className={styles.select__field}
              id="salary-type"
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
              required
            >
              <option value="">Select Salary Type</option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="employment-type">Employment Type:</label>
            <select
              className={styles.select__field}
              id="employment-type"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
            >
              <option value="">Select Employment Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="experience-level">Experience Level:</label>
            <select
              className={styles.select__field}
              id="experience-level"
              name="jobLevel"
              value={formData.jobLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select Experience Level</option>
              <option value="entry-level">Entry Level</option>
              <option value="mid-level">Mid Level</option>
              <option value="senior-level">Senior Level</option>
            </select>
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="experience">Years of Experience:</label>
            <input
              type="number"
              min={0}
              className={styles.input__field}
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of Experience"
              required
            />
          </div>

          <div className={styles.input__wrap}>
            <label htmlFor="deadline">Deadline:</label>
            <input
              type="date"
              className={styles.input__field}
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              placeholder="Deadline"
              required
            />
          </div>

          <div className={styles.toggle__wrap}>
            <label
              htmlFor="cover-letter-toggle"
              className={styles.toggle__label}
            >
              Require Cover Letter:
            </label>
            <input
              type="checkbox"
              id="cover-letter-toggle"
              checked={isCoverLetterRequired}
              onChange={handleCoverLetterToggle}
              className={styles.toggle__input}
            />
          </div>

          <button
            type="submit"
            className={styles.submit__button}
          >
            {
              isLoading
                ? "Creating Job Post..." 
                : isSuccess
                ? "Job Posted" 
                : "Create Job Post"
            }
          </button>
        </form>
      </div>
    </section>
  );
};

export default JobPostForm;
