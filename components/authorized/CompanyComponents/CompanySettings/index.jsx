import React, { useState } from "react";
import { useRouter } from "next/router";
import { deleteCompany } from "../../../../firebaseConfig/companyStore";
import CustomModal from "../../../utils/CustomModal/index";
import styles from "./style.module.scss";

export default function SecuritySettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setSuccessMsg("Password updated successfully.");
  };

  const handleDeleteAccount = () => {
    if (!deleteConfirmation) {
      setErrorMsg("Please enter your password to confirm.");
      return;
    }
    setIsModalOpen(true); 
  };

  const confirmDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setIsModalOpen(false);
      await deleteCompany(id);
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      setErrorMsg("Failed to delete account. Please try again.");
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

          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          {successMsg && <p className={styles.success}>{successMsg}</p>}
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
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
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
