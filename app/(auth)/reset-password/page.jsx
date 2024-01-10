'use client';
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { resetPassword } from "@/firebaseConfig/talentStore"; // Import your resetPassword function
import "./style.scss";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(""); 
  const [alert, setAlert] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the function to send a password reset email
      await resetPassword(email);

      // Show a success alert
      await showAlert({
        type: "success",
        title: "Success",
        message: "Password reset email sent. Check your inbox.",
        showCloseButton: false,
        timeout: 4000,
        handleClose: () => setAlert(null),
      }, setAlert);

      // Reset the form field
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password reset error:", error);
      // Show an error alert
      await showAlert({
        type: "error",
        title: "Error",
        message: error.message,
        showCloseButton: false,
        timeout: 4000,
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
    <section className="resetPassword__form">
      {alert && alert.component}
      <div className="resetPassword-form__container">
        <div className="header">
          <h1 className="title">Reset Password</h1>
          <p className="subtitle">
            Enter your new password.
          </p>
        </div>
        <form className="form__wrap" onSubmit={handleResetPassword}>
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="input__field"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="confirm-password"
            placeholder="Confirm Password"
            className="input__field"
            value={confirmPassword}
            onChange={handleInputChange}
          />

          <button className="reset-password__btn" type="submit">
            {isLoading ? <Spinner /> : "Submit"}
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