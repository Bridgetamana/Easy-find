// ResetPasswordSuccess.js
import React from "react";

export default function ResetPasswordSuccess({ state, navigate }) {
  return (
    <section className="resetPassword__form">
      <div className="resetPassword-form__container">
        <div className="header">
          <h1 className="title">Password Set</h1>
          <p className="subtitle">
            Password set successfully! You can now proceed to log in to your
            account. Click the "Login" button below to access your account.
          </p>
        </div>
        {state.loading ? (
          <button className="change_btn" type="submit" disabled>
            <div className="spinner"></div>
          </button>
        ) : (
          <button className="reset_btn" onClick={() => navigate("/")}>
            Login
          </button>
        )}
      </div>
    </section>
  );
}
