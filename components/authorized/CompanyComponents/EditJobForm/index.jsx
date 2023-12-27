import React, { useState } from "react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRouter } from "next/navigation";
import "./style.scss";

export default function EditJobForm() {
  if (typeof data === "object" && data !== null) {
    if (data._immutable) {
      delete data._immutable;
    }
    Object.keys(data).forEach((key) => {
      data[key] = removeImmutable(data[key]);
    });
  }
  return data;
};

const EditJobForm = () => {
  const router = useRouter();
  const jobId = router.query.jobId; // Get the jobId from the query parameters

  const [isEditMode, setIsEditMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Fetch the job data based on the jobId
    if (jobId) {
      fetchJobData(jobId);
    }
  }, [jobId]);

  const fetchJobData = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/jobs/${jobId}`
      );
      const jobData = response.data;

      // Populate the form data with the fetched job data
      setFormData({
        jobTitle: jobData.title,
        jobDescription: jobData.description,
        deadline: jobData.deadline,
        industry: jobData.industry,
        jobLevel: jobData.jobLevel,
        salaryMin: jobData.salaryMin,
        salaryMax: jobData.salaryMax,
        employmentType: jobData.employmentType,
        location: jobData.location,
        requirements: jobData.requirements,
        benefits: jobData.benefits,
        educationExperience: jobData.educationExperience,
        
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    // Clean up the formData before sending the request
    const cleanFormData = {
      title: formData.jobTitle,
      description: formData.jobDescription,
      datePosted: formatDate(new Date()), // Format the date to YYYY-MM-DD
      deadline: formatDate(new Date(formData.deadline)), // Format the deadline date to YYYY-MM-DD
      jobId: 1,
      industry: formData.industry,
      jobLevel: formData.jobLevel,
      salary: formData.salaryMax,
      jobType: formData.employmentType,
      location: formData.location,
      active: true,
      inactive: false,
      saved: true,
      seen: true,
      applied: true,
    };

    // Remove _immutable property from requirements, benefits, and educationExperience
    if (cleanFormData.requirements && cleanFormData.requirements._immutable) {
      delete cleanFormData.requirements._immutable;
    }
    if (cleanFormData.benefits && cleanFormData.benefits._immutable) {
      delete cleanFormData.benefits._immutable;
    }
    if (
      cleanFormData.educationExperience &&
      cleanFormData.educationExperience._immutable
    ) {
      delete cleanFormData.educationExperience._immutable;
    }

    const payload = {
      data: cleanFormData,
    };

    console.log("Data to be sent:", payload); // Log the data

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:1337/api/jobs",
        payload
      );
      console.log(response.data); // Handle the response
      setFormData(initialFormData);
      setTimeout(() => {
        setIsSuccess(true);
      }, 3000);
      router.push(`/company/dashboard`);
    } catch (error) {
      console.error(error); // Handle the error
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

  // Function to format the date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <section className="jobPostings__section">
      <div className="section__header">
        <h2 className="section__title">Edit Job</h2>
        <p className="section__subtitle">
          Edit the details of your job advert.
        </p>
      </div>
      <form className="jobPosting__form" onSubmit={handleSaveClick}>
        <div className="input__wrap">
          <label htmlFor="job-title">Job Title:</label>
          <input
            type="text"
            className="input__field"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter the job title"
            required
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="job-description">Job Description:</label>
          <textarea
            name="jobDescription"
            className="text__field"
            cols="30"
            rows="10"
            value={formData.jobDescription}
            onChange={handleChange}
            required
            placeholder="Describe the job in detail"
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="requirements">Requirements:</label>
          <Editor
            name="requirements"
            editorState={formData.requirements}
            onEditorStateChange={(editorState) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                requirements: editorState,
              }))
            }
            required
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="benefits">Benefits:</label>
          <Editor
            name="benefits"
            editorState={formData.benefits}
            onEditorStateChange={(editorState) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                benefits: editorState,
              }))
            }
            required
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="education-experience">Education & Experience:</label>
          <Editor
            name="educationExperience"
            editorState={formData.educationExperience}
            onEditorStateChange={(editorState) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                educationExperience: editorState,
              }))
            }
            required
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            className="input__field"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="e.g. Software Development"
            required
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            className="input__field"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Lagos, Nigeria"
            required
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            className="input__field"
            name="salaryMin"
            value={formData.salaryMin}
            onChange={handleChange}
            required
            placeholder="Minimum Salary"
          />
          <input
            type="text"
            className="input__field"
            name="salaryMax"
            value={formData.salaryMax}
            onChange={handleChange}
            required
            placeholder="Maximum Salary"
          />
        </div>

        <div className="input__wrap">
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

        <div className="input__wrap">
          <label htmlFor="employment-type">Employment Type:</label>
          <select
            className="select__field"
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

        <div className="input__wrap">
          <label htmlFor="experience-level">Experience Level:</label>
          <select
            className="select__field"
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

        <div className="input__wrap">
          <label htmlFor="experience">Years of Experience:</label>
          <input
            type="number"
            min={0}
            className="input__field"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of Experience"
            required
          />
        </div>

        <div className="input__wrap">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            className="input__field"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            placeholder="Deadline"
            required
          />
        </div>
        {isEditMode ? (
          <button type="submit" className="submit__button">
            {isLoading ? <div className="spinner"></div> : "Create Job Post"}
          </button>
        ) : (
          <button
            type="button"
            className="edit__button"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
        {isSuccess && (
          <p className="success__msg">Job Post Edited Successfully</p>
        )}
      </form>
    </section>
  );
};
