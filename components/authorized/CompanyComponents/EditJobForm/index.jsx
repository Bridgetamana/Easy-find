import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRouter } from "next/router";
import { getJobDetailsById, updateJobDetails } from "@/firebaseConfig/companyStore"; 
import styles from "./style.module.scss";

const EditJobForm = () => {
  const router = useRouter();
  const { jobId } = router.query; 

  const [isEditMode, setIsEditMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

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
  };

  const [formData, setFormData] = useState(initialFormData);

  // function to convert EditorState to HTML
  const convertEditorStateToHtml = (editorState) => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
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
        location: jobData.location || "",
        industry: jobData.industry || "",
        salaryMin: jobData.salaryMin || "",
        salaryMax: jobData.salaryMax || "",
        salaryType: jobData.salaryType || "",
        employmentType: jobData.jobType || "",
        jobLevel: jobData.jobLevel || "",
        experience: jobData.experience || "",
        deadline: jobData.deadline ? formatDate(new Date(jobData.deadline)) : "",
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
      requirements: convertEditorStateToHtml(formData.requirements),
      benefits: convertEditorStateToHtml(formData.benefits),
      experience: formData.experience,
      deadline: formatDate(new Date(formData.deadline)),
      createdAt: new Date(),
      active: true,
      inactive: false,
      saved: true,
      seen: true,
      applied: true,
    };

    setIsLoading(true);
    try {
      await updateJobDetails(jobId, cleanFormData);

      setFormData(initialFormData);
      setTimeout(() => {
        setIsSuccess(true);
      }, 3000);
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
          <label htmlFor="education-experience">Education & Experience:</label>
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
            className="select__field"
            id="salary-type"
            name="salaryType"
            value={formData.salaryType}
            onChange={handleChange}
            required
          >
            <option value="">Select Salary Type</option>
            <option value="hourly">Hourly</option>
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
        {isEditMode ? (
          <button type="submit" className={styles.submit__button}>
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Create Job Post"
            )}
          </button>
        ) : (
          <button
            type="button"
            className={styles.edit__button}
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
        {isSuccess && (
          <p className={styles.success__msg}>Job Post Edited Successfully</p>
        )}
      </form>
      </div>
    </section>
  );
};

export default EditJobForm