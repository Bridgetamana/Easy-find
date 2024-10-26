import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { companyStore } from "../../../../firebaseConfig/companyStore";
import CustomModal from "../../../utils/CustomModal/index";
import styles from "./style.module.scss";

export default function SecuritySettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirmationPassword, setDeleteConfirmationPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      await companyStore.updateCompanyPassword(user, password, newPassword);
      setSuccessMsg("Password updated successfully.");
      setErrorMsg(""); 
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setErrorMsg("Current password is incorrect.");
      } else {
        setErrorMsg("Failed to update password. Please try again.");
      }
    }
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setIsModalOpen(false);
      await companyStore.deleteCompanyAccount(user, deleteConfirmationPassword);
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMsg("Failed to delete account. Please check your password and try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className={styles.settings__section}>
      <div className={styles.settings__container}>
        <h2 className={styles.settings__title}>Settings</h2>

        <div className={styles.changePassword__section}>
          <h3 className={styles.section__title}>Change Password</h3>
          <div className={styles.form__group}>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
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

          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          {successMsg && <p className={styles.success}>{successMsg}</p>}
        </div>

        <div className={styles.deleteAccount__section}>
          <h3 className={styles.section__title}>Delete Account</h3>
          <div className={styles.form__group}>
            <label htmlFor="deleteConfirmation">Type Password:</label>
            <input
              type="password"
              id="deleteConfirmationPassword"
              className={styles.deleteAccount__input}
              value={deleteConfirmationPassword}
              onChange={(e) => setDeleteConfirmationPassword(e.target.value)}
            />
          </div>

          <button
            className={styles.settings__button}
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </div>
      </div>

      <CustomModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Delete"
        description="Are you sure you want to delete your account? This action cannot be undone."
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
        confirmButtonBgColor="bg-[#ff0000]"
        confirmButtonTextColor="text-white"
        cancelButtonBgColor="bg-gray-200"
        cancelButtonTextColor="text-gray-700"
        onConfirm={confirmDeleteAccount}
        onCancel={() => setIsModalOpen(false)}
        loading={isDeleting}
        showConfirmButton={true}
      />
    </section>
  );
}
