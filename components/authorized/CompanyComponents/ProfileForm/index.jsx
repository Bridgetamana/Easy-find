import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import {
  companyStore,
  updateCompany,
} from "../../../../firebaseConfig/companyStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CompanyProfileForm() {
  const initialFormData = {
    id: null,
    fullName: "",
    email: "",
    bio: "",
    linkedin: "",
    photo: null,
    location: "",
    phone: "",
    website: "",
    industry: "",
    size: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!id) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await companyStore.getCompanyStoreById(id);

        if (data) {
          setFormData((prevState) => ({
            ...prevState,
            ...data,
          }));
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
        photo: imageUrl,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (formData.email.length < 1 || formData.fullName.length < 1) {
      setErrorMsg("Email and full name must have at least 1 character.");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        ...formData,
        id,
      };
      await updateCompany(payload);

      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

      router.push("/company/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMsg(error.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: imageUrl,
        file,
      }));
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.profile__page}>
      <div className={styles.profile__form}>
        <div className={styles.profile__image}>
          <div className={styles.edit__image}>
            <MdEdit size={20} fill="#2563eb" />
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleImageUpload}
              className={styles.form__input}
            />
          </div>
          {formData.photo ? (
            <img src={formData.photo} alt="Profile" className={styles.image} />
          ) : (
            <img src="" alt="Default Profile" className={styles.image} />
          )}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your bio"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="address">Location:</label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your website link"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="linkedin">Linkedin:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your company's linkedin"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            name="industry"
            value={formData.industry || ""}
            onChange={handleInputChange}
            className={styles.form__input}
            placeholder="Enter your industry"
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="size">Company Size:</label>
          <select
            name="size"
            value={formData.size || ""}
            onChange={handleInputChange}
            className={styles.form__input}
          >
            <option value="" disabled>
              Select your company size
            </option>
            <option value="2-10">2-10 employees</option>
            <option value="10-50">10-50 employees</option>
            <option value="50-200">50-200 employees</option>
            <option value="200-500">200-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        {successMsg && <p className={styles.success}>{successMsg}</p>}
        <button onClick={handleSaveClick} className={styles.save__button}>
          {isLoading ? <div className={styles.spinner}></div> : "Save"}
        </button>
      </div>
    </div>
  );
}
