import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import "./style.scss";
import { useRouter } from "next/navigation";

export default function TalentProfileForm() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const initialFormData = {
    id: null,
    username: "",
    email: "",
    bio: "",
    photo: null,
    dob: "",
    gender: "",
    pronouns: "",
    jobTitle: "",
    minSalary: "",
    maxSalary: "",
    linkedin: "",
    portfolio: "",
    address: "",
    phone: "",
    mobile: "",
    resume: null,
    skills: "",
    institute: "",
    degree: "",
    company: "",
    position: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [form, setForm] = useState({ ...initialFormData });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch the user ID first, then use it to fetch user data
    const fetchInitialUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${apiUrl}/users/me`, { headers });
        const userId = response.data.id;
        // Now that we have the userId, fetch the user data
        if (userId) {
          fetchUserData(userId);
          handleSaveClick(userId);
        }
      } catch (error) {
        console.error("An error occurred while fetching user ID:", error);
      }
    };

    fetchInitialUserId();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${apiUrl}/talents/${userId}`, {
        headers,
      });
      const fetchedUserData = response.data.data.attributes;

      setFormData((fetchedUserData) => ({
        ...fetchedUserData,
        id: fetchedUserData.id,
        username: fetchedUserData.username,
        email: fetchedUserData.email,
        bio: fetchedUserData.bio,
        photo: fetchedUserData.photo,
        dob: fetchedUserData.dob,
        gender: fetchedUserData.gender,
        pronouns: fetchedUserData.pronouns,
        jobTitle: fetchedUserData.jobTitle,
        minSalary: fetchedUserData.minSalary,
        maxSalary: fetchedUserData.maxSalary,
        linkedin: fetchedUserData.linkedin,
        portfolio: fetchedUserData.portfolio,
        address: fetchedUserData.address,
        phone: fetchedUserData.phone,
        mobile: fetchedUserData.mobile,
        resume: fetchedUserData.resume,
        skills: fetchedUserData.skills,
        institute: fetchedUserData.institute,
        degree: fetchedUserData.degree,
        company: fetchedUserData.company,
        position: fetchedUserData.position,
      }));
      if (!fetchedUserData) {
        console.log("No user data returned from API");
        return;
      }

      // Update your state with the fetched user data
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...fetchedUserData,
      }));
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setForm((prevForm) => ({
        ...prevForm,
        [name]: file,
        photo: imageUrl,
      }));

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: imageUrl,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const router = useRouter();

  const handleSaveClick = async (userId) => {
    // e.preventDefault();
    console.log(userId);
    // Validate the form data
    if (formData.email.length < 1 || formData.username.length < 1) {
      setErrorMsg("Email and username must have at least 1 character.");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      // Set headers
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Prepare the payload
      const payload = {
        data: {
          formData,
        },
      };
      console.log("payload:", payload);

      // POST data to /api/talents
      const response = await axios.put(`${apiUrl}/talents/${userId}`, payload, {
        headers: headers,
      });

      console.log("POST Response:", response.data);

      // Reset the form and set a success message
      setForm(initialFormData);
      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

      // Redirect to the talent profile
      router.push("/talent/profile");

      // Optional: Fetch updated user data
      fetchUserData();
    } catch (error) {
      console.error(
        "Error Response:",
        error.response ? error.response.data : "No response data"
      );
      setErrorMsg(error.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile__page">
      <div className="profile__form">
        <div className="profile__image">
          <div className="edit__image">
            <MdEdit size={20} fill="#2563eb" />
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleInputChange}
              className="form__input"
              // value={formData.photo}
            />
          </div>
          {formData.photo && (
            <img src={formData.photo} alt="Profile" className="image" />
          )}
        </div>
        <div className="form__group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your name"
            title="Start with capital letter and use only letters"
            pattern="^[A-Z][a-z]+$"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your bio"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your date of birth"
          />
        </div>

        <div className="form__group">
          <label htmlFor="pronouns">Pronouns:</label>
          <select
            name="pronouns"
            className="form__select"
            value={formData.pronouns}
            onChange={handleInputChange}
            required
          >
            <option value="">Select pronouns</option>
            <option value="She/Her">She/Her</option>
            <option value="He/Him">He/Him</option>
            <option value="They/Them">They/Them</option>
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            className="form__select"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your job title"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="socialLinks">LinkedIn Link:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your LinkedIn link"
          />
        </div>

        <div className="form__group">
          <label htmlFor="socialLinks">Portfolio Link:</label>
          <input
            type="link"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your portfolio link"
          />
        </div>

        <div className="form__group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your mobile number"
          />
        </div>

        <div className="form__group">
          <label htmlFor="resume">Update Resume:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            name="resume"
            onChange={handleInputChange}
            className="form__input"
            placeholder="Upload your resume"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your skills"
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="skills">Education:</label>
          <input
            type="text"
            name="institute"
            value={formData.institute}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your institute"
          />
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your degree"
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="skills">Experience:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your company"
            required
          />
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your position"
          />
        </div>

        <div className="form__group">
          <label htmlFor="desiredSalary">Desired Salary:</label>
          <input
            type="number"
            name="minSalary"
            value={formData.minSalary}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your desired minimum salary"
          />
          <input
            type="num"
            name="maxSalary"
            value={formData.maxSalary}
            onChange={handleInputChange}
            className="form__input"
            placeholder="Enter your desired maximum salary"
          />
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className="success">{successMsg}</p>}
        <button onClick={handleSaveClick} className="save__button">
          {isLoading ? <div className="spinner"></div> : "Save"}
        </button>
      </div>
    </div>
  );
}
