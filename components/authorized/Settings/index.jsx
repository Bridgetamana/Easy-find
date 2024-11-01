"use client";
import React from 'react';
import { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser } from "firebase/auth";
import { deleteTalent } from '@/firebaseConfig/talentStore';
import showAlert from '@/components/utils/AlertBox/CustomAlert';
import styles from './style.module.scss';

export default function TalentSettings() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [alert, setAlert] = useState(null)
  
    const handleChangePassword = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        password 
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showAlert(
        {
          type: "success",
          message: "Password Updated Successfully!",
          timeout: 2000,
        },
        setAlert
      );
    } catch (error) {
      console.error("Failed to change password:", error.message);
    }
  };
  
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    try {
      if (!deleteConfirmation) {
        console.error("Delete confirmation is required.");
        return;
      }
  
      await deleteTalent(user.uid);
      await deleteUser(user);

      setDeleteConfirmation("");
      showAlert(
        {
          type: "error",
          message: "Account Deleted!",
          timeout: 2000,
        },
        setAlert
      );
      router.push("/"); 
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };
  
    return (
      <section className={styles.settings__section}>
        <div className={styles.settings__container}>
          <h2 className={styles.settings__title}>Settings</h2>

          {alert && alert.component}
          <div className={styles.changePassword__section}>
            <h3 className={styles.section__title}>Change Password</h3>
            <div className={styles.form__group}>
              <label htmlFor="password">Current Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                className={styles.changePassword__input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                className={styles.changePassword__input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.changePassword__input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className={styles.settings__button} onClick={handleChangePassword}>
              Change Password
            </button>
          </div>

          <div className={styles.deleteAccount__section}>
            <h3 className={styles.section__title}>Delete Account</h3>
            <div className={styles.form__group}>
              <label htmlFor="deleteConfirmation">Type Password:</label>
              <input
                type="text"
                id="deleteConfirmation"
                className={styles.deleteAccount__input}
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
              />
            </div>
            <button
              className={styles.settings__button}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>

          {/* Additional settings options */}
        </div>
      </section>
    );
}
