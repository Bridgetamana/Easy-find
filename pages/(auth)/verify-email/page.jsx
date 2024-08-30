'use client';
import React, { useState } from "react";
import "./style.module.scss";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [message, setMessage] = useState("Verifing email address, please wait...");

  useEffect(() => {
    const auth = getAuth();
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get("mode");
    const actionCode = urlParams.get("oobCode");
    setOobCode(actionCode);

    handleVerifyEmail(auth, actionCode);
  }, [router, location.search, auth]);

  const handleVerifyEmail = async (auth, actionCode) => {
    try {
      await applyActionCode(auth, actionCode);
      setMessage("Your email has been verified. You can now log in.");
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      setMessage("Error verifying email. Please try again.");
    }
  };


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