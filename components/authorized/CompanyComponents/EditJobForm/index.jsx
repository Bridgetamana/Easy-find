import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRouter } from "next/router";
import {
  getJobDetailsById,
  updateJobDetails,
} from "@/firebaseConfig/companyStore";
import dynamic from "next/dynamic";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import styles from "./style.module.scss";
import LoadingScreen from "../../../utils/Loaders/Loader";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const EditJobForm = () => {
  const router = useRouter();
  const { jobId } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [isCoverLetterRequired, setIsCoverLetterRequired] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

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
  };
  const [formData, setFormData] = useState(initialFormData);
  const [htmlToDraft, setHtmlToDraft] = useState(null);
  const [draftToHtml, setDraftToHtml] = useState(null);

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  useEffect(() => {
    const loadLibraries = async () => {
      const htmlToDraftModule = await import("html-to-draftjs");
      const draftToHtmlModule = await import("draftjs-to-html");
      setHtmlToDraft(() => htmlToDraftModule.default);
      setDraftToHtml(() => draftToHtmlModule.default);
    };
    
    loadLibraries();
  }, []);

  // Convert HTML to EditorState
  const convertHtmlToEditorState = (htmlContent) => {
    if (htmlToDraft) {
      const contentBlock = htmlToDraft(htmlContent);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  };

  // Convert EditorState to HTML
  const convertEditorStateToHtml = (editorState) => {
    if (!draftToHtml || !editorState) return "";
    const contentState = editorState.getCurrentContent();
    return draftToHtml(convertToRaw(contentState));
  };

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true);
      const jobData = await getJobDetailsById(jobId);

      setFormData({
        jobTitle: jobData.title || "",
        jobDescription: jobData.description || "",
        requirements: convertHtmlToEditorState(jobData.requirements || ""),
        benefits: convertHtmlToEditorState(jobData.benefits || ""),
        responsibilities: convertHtmlToEditorState(
          jobData.responsibilities || ""
        ),
        educationExperience: convertHtmlToEditorState(
          jobData.educationExperience || ""
        ),
        location: jobData.location || "",
        industry: jobData.industry || "",
        salaryMin: jobData.salaryMin || "",
        salaryMax: jobData.salaryMax || "",
        salaryType: jobData.salaryType || "",
        employmentType: jobData.jobType || "",
        jobLevel: jobData.jobLevel || "",
        experience: jobData.experience || "",
        deadline: jobData.deadline
          ? formatDate(new Date(jobData.deadline))
          : "",
        coverLetterRequired: jobData.coverLetterRequired || "",
      });
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Failed to fetch job details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const cleanSalaryMin = formData.salaryMin.replace(/,/g, '');
    const cleanSalaryMax = formData.salaryMax.replace(/,/g, '');

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

    const cleanFormData = {
      title: formData.jobTitle,
      description: formData.jobDescription,
      deadline: formatDate(new Date(formData.deadline)), // Format the deadline date to YYYY-MM-DD
      industry: formData.industry,
      jobLevel: formData.jobLevel,
      salaryType: formData.salaryType,
      salaryMin: formatNumberWithCommas(cleanSalaryMin),
      salaryMax: formatNumberWithCommas(cleanSalaryMax),
      jobType: formData.employmentType,
      location: formData.location,
      requirements: convertEditorStateToHtml(formData.requirements),
      responsibilities: convertEditorStateToHtml(formData.responsibilities),
      benefits: convertEditorStateToHtml(formData.benefits),
      educationExperience: convertEditorStateToHtml(
        formData.educationExperience
      ),
      experience: formData.experience,
      createdAt: new Date(),
      active: true,
      isCoverLetterRequired: isCoverLetterRequired,
    };

    setIsLoading(true);

    try {
      await updateJobDetails(jobId, cleanFormData);

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData(initialFormData);
      }, 1000);
      router.push(`/company/jobs`);
    } catch (error) {
      console.error("Error updating job post:", error);
      setError("Failed to update job. Please try again.");
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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className={styles.jobPosting__container}>
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Edit Job</h2>
            <p className={styles.section__subtitle}>
              Edit the details of your job advert.
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
                required
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
              <label htmlFor="responsibilities">Responsibilities:</label>
              <Editor
                name="responsibilities"
                editorState={formData.responsibilities}
                onEditorStateChange={(editorState) =>
                  handleEditorChange("responsibilities", editorState)
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
                <option value="Nonprofit">Nonprofit</option>
                <option value="Financial Services">Financial Services</option>
                <option value="RealEstate">Real Estate</option>
                <option value="Consulting">Consulting</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Insurance">Insurance</option>
                <option value="Energy">Energy</option>
                <option value="Consumer Goods">Consumer Goods</option>
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
                type="text"
                className={styles.input__field}
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                required
                placeholder="Minimum Salary"
              />
              <input
                type="text"
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
            <button type="submit" className={styles.submit__button}>
              {isLoading
                ? "Updating Job Post..."
                : isSuccess
                ? "Update Saved"
                : "Save Edit"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default EditJobForm;
