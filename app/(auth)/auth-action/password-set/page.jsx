// ResetPasswordSuccess.js
import React from "react";

export default function ResetPasswordSuccess({ state, navigate }) {
  return (
    <section className="resetPassword__form">
      {
        state.stage === 'success' ? (
          <div className="resetPassword-form__container">
            <div className="header">
              <h1 className="title">Password Reset</h1>
              <p className="subtitle">
                A password reset email has been sent to your email address. Click
                the link in the email to reset your password.
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
        ) : (
          <div className="resetPassword-form__container">
            <div className="header">
              <h1 className="title">Try resetting your password again</h1>
              <p className="subtitle">
              Your request to reset your password has expired or the link has already been used.
              </p>
            </div>
            {state.loading ? (
              <button className="change_btn" type="submit" disabled>
                <div className="spinner"></div>
              </button>
            ) : (
              <button className="reset_btn" onClick={() => navigate("/forgot-password")}>
                Forgot Password
              </button>
            )}
          </div>
        )
      }
    </section>
  );
}
