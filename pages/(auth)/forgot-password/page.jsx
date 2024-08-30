'use client';
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { sendPasswordResetEmail } from "firebase/auth"; 
// import { auth } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebase";
import "./style.module.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      await sendPasswordResetEmail(auth, email);
  
      await showAlert({
        type: "success",
        title: "Success",
        message: "Password reset email sent. Check your inbox.",
        showCloseButton: false,
        timeout: 4000,
        handleClose: () => setAlert(null),
      }, setAlert);
      
      setEmail("");
    } catch (error) {
      console.error("Password reset error:", error);
  
      // Show an error alert
      await showAlert({
        type: "error",
        title: "Error",
        message: error.message,
        showCloseButton: false,
        timeout: 14000,
        handleClose: () => setAlert(null),
      }, setAlert);
    } finally {
      setIsLoading(false);
    }
  }; 

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <section className="forgotPassword__form">
      {alert && alert.component}
      <div className="forgotPassword-form__container">
        <div className="header">
          <h1 className="title">Forgot Password</h1>
          <p className="subtitle">
            Enter your email address to reset your password.
          </p>
        </div>
        <form className="form__wrap" onSubmit={handleResetPassword}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input__field"
            value={email}
            onChange={handleInputChange}
          />

          <button className="reset-password__btn" type="submit">
            {isLoading ? <Spinner /> : "Reset Password"}
          </button>

          <div className="login__info">
            <p className="text">
              Remember your password?{" "}
              <Link href={"/signin"} className="signin__text">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
