"use client";
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loginTalent } from "@/firebaseConfig/talentStore";
import "./style.scss";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isTalent, setIsTalent] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await setPersistence(auth, browserSessionPersistence);
  
      const userCredential = await loginUser(email, password);
  
      const user = userCredential.user;
      const userUID = user.uid;
  
      // Determine the collection based on user type
      const userCollection = isTalent ? "talentCollection" : "companyCollection";
      
      // Fetch the user's details from the corresponding Firestore collection
      const userRef = doc(db, userCollection, userUID);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        await showAlert({
          type: "error",
          title: "Error",
          message: "User not found. Please sign up.",
          showCloseButton: false,
          timeout: 4000,
          handleClose: () => setAlert(null),
        });
        setIsLoading(false);
        return;
      }
  
      // Check if the user's type matches the selected checkbox
      const userData = userDoc.data();
      const userType = userData.userType;
  
      if ((isTalent && userType === "company") || (isCompany && userType === "talent")) {
        // Show an error message if the user checked the wrong box
        await showAlert({
          type: "error",
          title: "Error",
          message: `This user isn't a ${isTalent ? 'talent' : 'company'} but a ${userType.toLowerCase()}, check the right box and try again`,
          showCloseButton: false,
          timeout: 4000,
          handleClose: () => setAlert(null),
        });
        setIsLoading(false);
        return;
      }
  
      const nameParts = userData.fullName;
  
      // Store the user's first name in secure storage
      secureLocalStorage.setItem("user_firstName", nameParts);
      setIsLoading(false);
  
      // Navigate based on user type
      if (isTalent) {
        navigate("/talent");
      } else if (isCompany) {
        navigate("/company");
      }
    } catch (error) {
      await showAlert({
        type: "error",
        title: "Error",
        message: error.message,
        showCloseButton: false,
        timeout: 4000,
        handleClose: () => setAlert(null),
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "talent" && checked) {
      setIsTalent(true);
      setIsCompany(false);
    } else if (name === "company" && checked) {
      setIsCompany(true);
      setIsTalent(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="login__form">
      <div className="login__form__container">
        <div className="login__signin">
          <div className="header">
            <h1 className="title">Sign In</h1>
            <p className="subtitle">
              To keep connected with us please login with your personal info.
            </p>
          </div>
          <form className="form__wrap" onSubmit={handleLogin}>
            <div className="checkbox__group">
              <div className="checkbox__item">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="talent"
                  id="talentCheckbox"
                  checked={isTalent}
                  onChange={handleInputChange}
                />
                <label htmlFor="talentCheckbox">I am a Talent</label>
              </div>
              <div className="checkbox__item">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="company"
                  id="companyCheckbox"
                  checked={isCompany}
                  onChange={handleInputChange}
                />
                <label htmlFor="companyCheckbox">I am a Company</label>
              </div>
            </div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input__field"
              value={email}
              onChange={handleInputChange}
            />
            <div className="password_field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="pass_field"
                value={password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              {showPassword ? (
                <IoEye
                  className="password_icon"
                  onClick={handleTogglePasswordVisibility}
                />
              ) : (
                <IoEyeOff
                  className="password_icon"
                  onClick={handleTogglePasswordVisibility}
                />
              )}
            </div>
            <div className="flex">
              <div className="remember__me">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="remember__me__text">
                  Remember Me
                </label>
              </div>
              <Link href="/forgot-password" className="forgot__password">
                Forgot your password?
              </Link>
            </div>

            <button className="signin__btn" type="submit">
              {isLoading ? <Spinner /> : "Sign In"}
            </button>

            <div className="signup__info">
              <p className="text">Do not have an account?</p>{" "}
              <Link href={"/signup"} className="signup__text">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <div className="login__signup">
          <h1 className="title">Hello Friend!</h1>
          <p className="subtitle">
            Discover new talents, become a talent, and connect with the
            community.
          </p>
        </div>
      </div>
    </section>
  );
}
