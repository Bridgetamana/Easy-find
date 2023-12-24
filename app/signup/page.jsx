"use client";
import React, { useState } from "react";
import "./style.scss";
import Link from "next/link";
import axios from "axios";
require("dotenv").config();

export default function Signup() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [activeTab, setActiveTab] = useState("talents");
  const [alert, setAlert] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // State for talent
  const [talentFormData, setTalentFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // State for companies
  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    companyEmail: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "talents") {
      handleTalentSub(talentFormData);
    } else if (activeTab === "companies") {
      handleCompanySub(companyFormData);
    }
  };


 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (activeTab === "talents") {
      setTalentFormData((prevTalentFormData) => ({
        ...prevTalentFormData,
        [name]: fieldValue,
      }));
    } else if (activeTab === "companies") {
      setCompanyFormData((prevCompanyFormData) => ({
        ...prevCompanyFormData,
        [name]: fieldValue,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    if (activeTab === "talents") {
      setTalentFormData((prevTalentFormData) => ({
        ...prevTalentFormData,
        [name]: value,
      }));
      setPasswordMatch(validatePassword(value));
    } else if (activeTab === "companies") {
      setCompanyFormData((prevCompanyFormData) => ({
        ...prevCompanyFormData,
        [name]: value,
      }));
      setPasswordMatch(validatePassword(value));
    }
  };

  //validate password
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLengthValid = password.length >= 6;

    return hasUppercase && hasNumber && isLengthValid;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //handle email confirmation
  const sendEmailConfirmation = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/send-email-confirmation",
        { email }
      );
      console.log("Email confirmation sent successfully:", response.data);
    } catch (error) {
      console.error("Failed to send email confirmation:", error);
    }
  };

  return (
    <section className="registeration__form">
      <div className="registeration__form_container">
        <div className="registeration__signin">
          <h1 className="title">Welcome To EasyFind!</h1>
          <p className="subtitle">
            Become our member and get access to over{" "}
            {activeTab === "talents" ? "a 100 companies" : "3,000 talents"} in
            Malta.
          </p>
          <Link href={"/signin"} className="signin__btn">
            Sign In
          </Link>
        </div>

        <div className="registeration__signup">
          <div className="registeration__tabs">
            <div
              className={`tab ${activeTab === "talents" ? "active" : ""}`}
              onClick={() => handleTabChange("talents")}
            >
              For Talents
            </div>
            <div
              className={`tab ${activeTab === "companies" ? "active" : ""}`}
              onClick={() => handleTabChange("companies")}
            >
              For Companies
            </div>
          </div>
          <div className="signup__form">
            <div className="header">
              <h1 className="title">
                Sign Up
                {/* {activeTab === "talents" ? "Talent Sign Up" : "Company Sign Up"} */}
              </h1>
              <p className="subtitle">
                To join us as{" "}
                {activeTab === "talents" ? "a talent" : "a company"}, kindly
                fill in your info below.
              </p>
            </div>
            {activeTab === "talents" && (
              <form className="form__wrap" onSubmit={handleSubmit}>
                <div className="input__group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="input__field"
                    value={talentFormData.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="input__field"
                    value={talentFormData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input__field"
                  value={talentFormData.email}
                  onChange={handleChange}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input__field"
                  value={talentFormData.password}
                  onChange={handlePasswordChange}
                />
                <div className="show__password">
                  <input
                    type="checkbox"
                    id="showPassword"
                    name="showPassword"
                    checked={showPassword}
                    onChange={handleTogglePasswordVisibility}
                  />
                  <label htmlFor="showPassword">Show Password</label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input__field"
                  value={talentFormData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch && (
                  <p className="error">
                    {talentFormData.password.length < 6 &&
                      "Password must be at least 6 characters long. "}
                    {!/[A-Z]/.test(talentFormData.password) &&
                      "Password must contain an uppercase letter. "}
                    {!/\d/.test(talentFormData.password) &&
                      "Password must contain a number. "}
                    {talentFormData.confirmPassword &&
                      talentFormData.password !==
                        talentFormData.confirmPassword &&
                      "Password does not match. "}
                  </p>
                )}
                <button
                  className="signup__btn"
                  type="submit"
                  disabled={!passwordMatch}
                >
                  Sign Up as Talent
                </button>
                <div className="signin__info">
                  <p className="text">Already have an account?</p>{" "}
                  <Link href={"/login"} className="signin__text">
                    Sign In
                  </Link>
                </div>
              </form>
            )}
            {activeTab === "companies" && (
              <form className="form__wrap" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="input__field"
                  value={companyFormData.companyName}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Company Email"
                  className="input__field"
                  value={companyFormData.companyEmail}
                  onChange={handleChange}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input__field"
                  value={companyFormData.password}
                  onChange={handlePasswordChange}
                />
                <div className="show__password">
                  <input
                    type="checkbox"
                    id="showPassword"
                    name="showPassword"
                    checked={showPassword}
                    onChange={handleTogglePasswordVisibility}
                  />
                  <label htmlFor="showPassword">Show Password</label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input__field"
                  value={companyFormData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch && (
                  <p className="error">
                    {companyFormData.password.length < 6 &&
                      "Password must be at least 6 characters long. "}
                    {!/[A-Z]/.test(companyFormData.password) &&
                      "Password must contain an uppercase letter. "}
                    {!/\d/.test(companyFormData.password) &&
                      "Password must contain a number. "}
                    {companyFormData.confirmPassword &&
                      companyFormData.password !==
                        companyFormData.confirmPassword &&
                      "Password does not match. "}
                  </p>
                )}
                {
                  error && <p className="error">{error}</p>
                }
                {
                  success && <p className="success">{success}</p>
                }
                <button
                  className="signup__btn"
                  type="submit"
                  disabled={!passwordMatch}
                >
                  Sign Up as Company
                </button>
                <div className="signin__info">
                  <p className="text">Already have an account?</p>{" "}
                  <Link href={"/login"} className="signin__text">
                    Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
