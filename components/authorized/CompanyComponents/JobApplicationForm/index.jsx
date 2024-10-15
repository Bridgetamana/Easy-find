import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Spinner from "@/components/utils/Loaders/Spinner";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../../../../firebaseConfig/firebase';
import { getDownloadURL, getMetadata, ref, getStorage } from "firebase/storage";
import { talentStore } from "@/firebaseConfig/talentStore";

export default function JobApplicationForm({ closeApplicationForm, onSuccess, jobId, jobDetails }) {
  const [cvSelectedOption, setCvSelectedOption] = useState("applyWithUploadedCV");
  const [loading, setLoading] = useState(false);
  const [uploadedCV, setUploadedCV] = useState({ url: null, name: null });

  const handleOptionChange = (e) => {
    setCvSelectedOption(e.target.value);
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

        // Fetch user profile data (this function should already be defined in your talentStore)
        const userProfile = await talentStore.getTalentStoreById(userId);

        if (userProfile) {
          // Fetch resume details if it exists
          if (userProfile.resume) {
            const storage = getStorage();
            const resumeRef = ref(storage, userProfile.resume);
            const metadata = await getMetadata(resumeRef);
            const downloadURL = await getDownloadURL(resumeRef); // Fetch the download URL
            
            // Set the uploaded CV URL and filename
            setUploadedCV({ url: downloadURL, name: metadata.name });
          }
        } else {
          console.error("User profile not found");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const userId = auth.currentUser?.uid;
      const appliedJobRef = doc(db, `jobListings/${jobId}/applied`, userId);
  
      const appliedJobDoc = await getDoc(appliedJobRef);
      if (appliedJobDoc.exists()) {
        console.log("You have already applied for this job.");
        return; 
      }

      await setDoc(appliedJobRef, {
        userId: userId,
        jobId: jobId,
        resume: cvSelectedOption === "applyWithUploadedCV" ? uploadedCV.url : null, // Add the CV URL if selected
      });
  
      onSuccess(); 
      setTimeout(() => {
        closeApplicationForm();
      }, 4000);
    } catch (error) {
      console.error("Error submitting application:", error);
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
            </label>{" "}
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="email">
              Email Address <span className={styles.asterisk}>*</span>
            </label>{" "}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Your phone number"
              required
            />
          </div>

          {/* <div class="modal__field">
            <label for="experience">
              Years of Experience <span class="asterisk">*</span>
            </label>
            <select id="experience" name="experience" required>
              <option value="1" selected>
                1 year
              </option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
              <option value="8">8 years</option>
            </select>
          </div> */}

          <div>
            <label htmlFor="resume">
              Resume <span className={styles.asterisk}>*</span>
            </label>
            <div className={styles.checkbox__group}>
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
                {/* Display the uploaded CV name if selected */}
                {cvSelectedOption === "applyWithUploadedCV" && uploadedCV.name && (
                  <p className={styles.uploadedCVName}>{uploadedCV.name}</p> // Fixed to render name
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
                />
              </div>
            )}
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="coverLetter">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows="6"
              placeholder="Tell us about yourself"
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.modal__submit}>
          {loading ? <Spinner /> :
            'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
}
