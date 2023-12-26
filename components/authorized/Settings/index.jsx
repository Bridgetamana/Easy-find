"use client";
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './style.scss';

export default function Settings() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
  
    const handleChangePassword = async () => {
      try {
        // Make API request to change password
        const response = await axios.post("/api/change-password", {
          password,
          newPassword,
        });
        console.log(response.data); // Handle success response
        // Reset input fields
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Failed to change password:", error);
        // Handle error response
      }
    };
  
    const handleDeleteAccount = async () => {
      try {
        // Make API request to delete account
        const response = await axios.delete("/api/delete-account", {
          data: {
            confirmation: deleteConfirmation,
          },
        });
        console.log(response.data); // Handle success response
        // Reset input fields
        setDeleteConfirmation("");
      } catch (error) {
        console.error("Failed to delete account:", error);
        // Handle error response
      }
    };
  
    return (
      <section className="settings__section">
        <div className="settings__container">
          <h2 className="settings__title">Settings</h2>
  
          <div className="changePassword__section">
            <h3 className="section__title">Change Password</h3>
            <div className="form__group">
              <label htmlFor="password">Current Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                className='changePassword__input'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                className='changePassword__input'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className='changePassword__input'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="settings__button" onClick={handleChangePassword}>
              Change Password
            </button>
          </div>
  
          <div className="deleteAccount__section">
            <h3 className="section__title">Delete Account</h3>
            <div className="form__group">
              <label htmlFor="deleteConfirmation">Type Password:</label>
              <input
                type="text"
                id="deleteConfirmation"
                className='deleteAccount__input'
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
              />
            </div>
            <button className="settings__button" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
  
          {/* Additional settings options */}
        </div>
      </section>
    );
}
