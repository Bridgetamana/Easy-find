import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Spinner from "@/components/utils/Loaders/Spinner";

export default function JobApplicationForm({
  closeApplicationForm,
  onSuccess,
}) {
  const [cvSelectedOption, setCvSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [notificationVisible, setNotificationVisible] = useState(false);

  const showNotification = (message) => {
    setNotification({ message, type: "success" });
    setNotificationVisible(true);

    setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);
  };

  const handleOptionChange = (e) => {
    setCvSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showNotification("Job successfully submitted!");

      setTimeout(() => {
        closeApplicationForm();
      }, 3000);

      onSuccess();
    } catch (error) {
      showNotification("Failed to submit the job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.modal__overlay}>
        <div className={styles.modal__container}>
          <button
            className={styles.modal__close}
            onClick={closeApplicationForm}
          >
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
                type="tel"
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
                  <label
                    htmlFor="uploadNewCV"
                    className={styles.checkbox__label}
                  >
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
              {loading ? <Spinner /> : "Submit Application"}
            </button>
          </form>
        </div>
      </section>

      {notification.message && (
        <div
          className={`${styles.notification} ${styles[notification.type]} ${
            notification.message ? styles.show : ""
          }`}
        >
          <span>{notification.message}</span>
          <div className={styles.notification__progressBar}>
            <div className={styles.notification__progress}></div>
          </div>
        </div>
      )}
    </>
  );
}
