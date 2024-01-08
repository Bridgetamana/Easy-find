'use client';
import React, { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/utils/Loaders/Spinner";
import showAlert from "@/components/utils/AlertBox/CustomAlert";
import { resetPassword } from "@/firebaseConfig/talentStore"; // Import your resetPassword function
import "./style.scss";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [message, setMessage] = useState("Verifing email address, please wait...");

  return (
    <section className="verifyEmail__form">
      {alert && alert.component}
      <div className="verifyEmail-form__container">
        <div className="header">
          <h1 className="title">Verify Email</h1>
          <p className="subtitle">
            {message}
          </p>
        </div>
        {message ===
              "Your email has been verified. You can now log in." && (
              <p className="text">Redirecting to the login page...</p>
            )}
      </div>
    </section>
  );
}