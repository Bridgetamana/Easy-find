import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Spinner from "@/components/utils/Loaders/Spinner";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../../../../firebaseConfig/firebase';
import { getDownloadURL, getMetadata, ref, getStorage, uploadBytes } from "firebase/storage";
import { talentStore } from "@/firebaseConfig/talentStore";

export default function JobApplicationForm({ closeApplicationForm, onSuccess, jobId, companyId }) {
  const [cvSelectedOption, setCvSelectedOption] = useState("applyWithUploadedCV");
  const [loading, setLoading] = useState(false);
  const [uploadedCV, setUploadedCV] = useState({ url: null, name: null });
  const [newCV, setNewCV] = useState(null);
  const [error, setError] = useState("");
  const [isCoverLetterRequired, setIsCoverLetterRequired] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  const handleOptionChange = (e) => {
    setCvSelectedOption(e.target.value);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes('pdf') && !file.type.includes('document')) {
        setError("Please upload a PDF or Word document");
        return;
      }
      setNewCV(file);
      setError("");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          console.error("No user is logged in");
          return;
        }

        const userId = user.uid;
        const userProfile = await talentStore.getTalentStoreById(userId);

        if (userProfile) {
          setFormData(prev => ({
            ...prev,
            fullName: userProfile.fullName || '',
            email: user.email || '',
            phone: userProfile.phone || ''
          }));

          if (userProfile.resume) {
            const storage = getStorage();
            const resumeRef = ref(storage, userProfile.resume);
            try {
              const metadata = await getMetadata(resumeRef);
              const downloadURL = await getDownloadURL(resumeRef); 
              setUploadedCV({ url: downloadURL, name: metadata.name });
            } catch (error) {
              console.error("Error fetching CV:", error);
            }
          } else {
            setCvSelectedOption("uploadNewCV");
          }
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try { 
        const jobRef = doc(db, `companyCollection/${companyId}/jobs/${jobId}`);
        const jobDoc = await getDoc(jobRef);

        if (jobDoc.exists()) {
          const jobData = jobDoc.data();
          setIsCoverLetterRequired(jobData.coverLetterRequired);
        } else {
          console.error("Job document doesn't exist.");
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [companyId, jobId]);

  const uploadNewCV = async (file) => {
    const storage = getStorage();
    const userId = auth.currentUser?.uid;
    const timestamp = Date.now();
    const fileName = `resumes/${userId}/${timestamp}_${file.name}`;
    const fileRef = ref(storage, fileName);
    
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    
    return { url: downloadURL, name: file.name };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("No user logged in");
      }

      let resumeData = null;

      if (cvSelectedOption === "applyWithUploadedCV") {
        if (!uploadedCV.url) {
          setError("No CV found in your profile. Please upload a new CV or update your profile.");
          setLoading(false);
          return;
        }
        resumeData = uploadedCV;
      } else {
        if (!newCV) {
          setError("Please select a CV file to upload");
          setLoading(false);
          return;
        }
        resumeData = await uploadNewCV(newCV);
      }

      const applicationData = {
        userId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeUrl: resumeData.url,
        resumeName: resumeData.name,
      };

      await onSuccess(applicationData);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.modal__overlay}>
      <div className={styles.modal__container}>
        <button className={styles.modal__close} onClick={closeApplicationForm}>
          &times;
        </button>
        <h2 className={styles.modal__title}> Apply Here</h2>
       
        <form className={styles.modal__form} onSubmit={handleSubmit}>
          <div className={styles.modal__field}>
            <label htmlFor="fullName">
              Full Name <span className={styles.asterisk}>*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="email">
              Email Address <span className={styles.asterisk}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
              required
            />
          </div>

          <div>
            <label htmlFor="resume">
              Resume <span className={styles.asterisk}>*</span>
            </label>
            <div className={styles.checkbox__group}>
              <div className="flex flex-col mb-[0.5rem]">
                <div className={styles.checkbox__option}>
                  <input
                    type="radio"
                    id="applyWithUploadedCV"
                    name="resume"
                    value="applyWithUploadedCV"
                    checked={cvSelectedOption === "applyWithUploadedCV"}
                    onChange={handleOptionChange}
                    className={styles.checkbox__input}
                  />
                  <label
                    htmlFor="applyWithUploadedCV"
                    className={styles.checkbox__label}
                  >
                    Apply with my uploaded CV
                  </label>
                </div>
                {cvSelectedOption === "applyWithUploadedCV" && uploadedCV.name && (
                  <p className="self-center">{uploadedCV.name}</p>
                )}
              </div>
              <div className={styles.checkbox__option}>
                <input
                  type="radio"
                  id="uploadNewCV"
                  name="resume"
                  value="uploadNewCV"
                  checked={cvSelectedOption === "uploadNewCV"}
                  onChange={handleOptionChange}
                  className={styles.checkbox__input}
                />
                <label htmlFor="uploadNewCV" className={styles.checkbox__label}>
                  Upload new CV
                </label>
              </div>
            </div>
            {cvSelectedOption === "uploadNewCV" && (
              <div className={styles.modal__field}>
                <label htmlFor="resumeUpload">
                  Upload CV <span className={styles.asterisk}>*</span>
                </label>
                <input
                  type="file"
                  id="resumeUpload"
                  className={styles.form__input}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="coverLetter">
              Cover Letter {isCoverLetterRequired && <span className={styles.asterisk}>*</span>}
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows="6"
              placeholder="Tell us about yourself"
              required={isCoverLetterRequired}
            ></textarea>
          </div>

          {error && (
          <div className={`${styles.error__message} mb-4 p-3 bg-red-100 text-red-700 rounded`}>
            {error}
          </div>
        )}

          <button type="submit" className={styles.modal__submit}>
          {loading ? <Spinner /> :
            'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
}
