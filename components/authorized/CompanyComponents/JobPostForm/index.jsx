import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router"; 
import { addJobPost } from "@/firebaseConfig/companyStore";
import { EditorState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import styles from "./style.module.scss";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const JobPostForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null); 
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCoverLetterRequired, setIsCoverLetterRequired] = useState(false);
  const [isError, setIsError] = useState(false);

  const initialFormData = {
    jobTitle: "",
    jobDescription: "",
    location: "",
    industry: "",
    requirements: EditorState.createEmpty(),
    responsibilities: EditorState.createEmpty(),
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

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (
      Number(formData.salaryMin) > Number(formData.salaryMax) ||
      Number(formData.salaryMin) == Number(formData.salaryMax)
    ) {
      await showAlert(
        {
          type: "error",
          title: "Validation Error",
          message: "Minimum salary cannot be greater than the maximum salary.",
          showCloseButton: true,
          timeout: 3000,
        },
        setAlert
      );
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      await showAlert(
        {
          type: "error",
          title: "Authentication Error",
          message: "Please log in to create a job post",
          showCloseButton: true,
          timeout: 3000,
        },
        setAlert
      );
      return;
    }

    // Convert the EditorState fields to HTML
    const cleanFormData = {
      title: formData.jobTitle,
      description: formData.jobDescription,
      deadline: formatDate(new Date(formData.deadline)), // Format the deadline date to YYYY-MM-DD
      industry: formData.industry,
      jobLevel: formData.jobLevel,
      salaryMin: formatNumberWithCommas(formData.salaryMin),
      salaryMax: formatNumberWithCommas(formData.salaryMax),
      jobType: formData.employmentType,
      location: formData.location,
      requirements: draftToHtml(convertToRaw(formData.requirements.getCurrentContent())),
      responsibilities: draftToHtml(convertToRaw(formData.responsibilities.getCurrentContent())),
      benefits: draftToHtml(convertToRaw(formData.benefits.getCurrentContent())),
      educationExperience: draftToHtml(convertToRaw(formData.educationExperience.getCurrentContent())),
      experience: formData.experience,
      createdAt: new Date(),
      active: true,
      isCoverLetterRequired: isCoverLetterRequired,
    };

    setIsLoading(true);

    try {
      // Save job post to the company's collection in Firebase
      await addJobPost(user.uid, cleanFormData);

      await showAlert(
        {
          type: "success",
          title: "Success",
          message: "Job post created successfully!",
          showCloseButton: false,
          timeout: 2000,
        },
        setAlert
      );

      setFormData(initialFormData);
      router.push("/company/jobs");
    } catch (error) {
      console.error("Error saving job post:", error);
      await showAlert(
        {
          type: "error",
          title: "Error",
          message: "Failed to create job post. Please try again.",
          showCloseButton: true,
          timeout: 2000,
        },
        setAlert
      );
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
      {alert && alert.component}

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
            <label htmlFor="responsibilities">Responsibilities:</label>
            <Editor
              name="responsibilities"
              editorState={formData.responsibilities}
              onEditorStateChange={(editorState) =>
                handleEditorChange("responsibilities", editorState)
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
            <select
              className={styles.select__field}
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">Select Industry</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Construction">Construction</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Transportation">Transportation</option>
              <option value="Marketing">Marketing</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Legal">Legal</option>
              <option value="Non-profit">Non-profit</option>
              <option value="FinancialServices">Financial Services</option>
              <option value="RealEstate">Real Estate</option>
              <option value="Consulting">Consulting</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Insurance">Insurance</option>
              <option value="Energy">Energy</option>
              <option value="ConsumerGoods">Consumer Goods</option>
            </select>
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
              type="number"
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
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
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
              <option value="Full-Time">Full Time</option>
              <option value="Part-Time">Part Time</option>
              <option value="Contract">Contract</option>
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
              <option value="Entry-Level">Entry Level</option>
              <option value="Mid-Level">Mid Level</option>
              <option value="Senior-Level">Senior Level</option>
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
            <label htmlFor="deadline">Application Deadline:</label>
            <input
              type="date"
              className={styles.input__field}
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
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

          <button type="submit" className={styles.submit__button}>
            {isLoading
              ? "Creating Job Post..."
              : isSuccess
              ? "Job Posted"
              : "Create Job Post"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default JobPostForm;
