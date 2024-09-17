/*
* @license
* Copyright 2022 Google LLC
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  where,
  onSnapshot,
  orderBy,
  query,
  arrayUnion ,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  setPersistence,
  verifyPasswordResetCode,
  confirmPasswordReset,
  browserSessionPersistence,
} from "firebase/auth";

const TALENT = "talentCollection";

export const talentStore = {
  // Talent Store
  async getTalentStore() {
    const q = query(collection(db, TALENT), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const talentStore = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return talentStore;
  },

  async getTalentStoreById(id) {
    const docRef = doc(db, TALENT, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  },
};

//Add New Talent
export const registerTalent = async (fullName, email, password) => {
  const auth = getAuth();
  try {
    // Step 1: Create the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Step 2: Send email verification
    await sendEmailVerification(user);

    // Step 3: Create the user in Firestore
    const newUserId = userCredential.user.uid;
    await setDoc(doc(db, TALENT, newUserId), {
      fullName: fullName,
      email: email,
      user: "talent",
    });
    return newUserId;
  } catch (error) {
    throw error;
  }
};

//Handle Login Talent
export const loginUser = async (email, password, setUser) => {
  const auth = getAuth();

  try {
    await setPersistence(auth, browserSessionPersistence); 
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 1: Fetch the user's document from Firestore using the user's UID
    const userDocRef = doc(db, "talentCollection", user.uid); 
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      // Step 2: Set user information in the context with fullName from Firestore
      setUser({
        username: userData.fullName, 
        email: user.email,           
        uid: user.uid                
      });

      return user;
    } else {
      throw new Error("User document not found");
    }
  } catch (error) {
    throw error;
  }
};

//Handle Password Reset
export const resetPassword = async (oobCode, newPassword) => {
  try {
    await verifyPasswordResetCode(auth, oobCode, newPassword);

    await confirmPasswordReset(auth, oobCode, newPassword);

    console.log('Password reset successful.');

    return true; // Password reset successful
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return false; // Password reset failed
  }
};

//Update Talent
export const updateTalent = async (talent) => {
  const docRef = doc(db, TALENT, talent.id);
  await updateDoc(docRef, talent);
};

//Delete Talent
export const deleteTalent = async (id) => {
  const docRef = doc(db, TALENT, id);
  await deleteDoc(docRef);
};

const JOBS = "jobListings";
//Fetch jobs
export const getJobs = async () => {
  const q = query(collection(db, JOBS), orderBy("datePosted", "desc"));
  const querySnapshot = await getDocs(q);
  const jobs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return jobs;
};

//Fetch jobs by id
export const getJobById = async (id) => {
  const docRef = doc(db, JOBS, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

// get jobs based on search input
export const searchJobs = (searchInput, setJobs, setNoResults) => {
  if (!searchInput.trim()) return;

  const q = query(
    collection(db, JOBS),
    where("title", ">=", searchInput),
    where("title", "<=", searchInput + "\uf8ff")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        setNoResults(true);
        setJobs([]);
      } else {
        const matchingJobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoResults(false);
        setJobs(matchingJobs);
      }
    },
    (error) => {
      console.error("Error fetching jobs:", error);
      setJobs([]);
      setNoResults(true);
    }
  );

  return unsubscribe;
};

// Readable Timestamp
export function convertTimestamp(timestamp) {
  if (!timestamp) {
    return 'Invalid timestamp';
  }

  const now = new Date();
  const timestampDate = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date

  const diff = now - timestampDate;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (days >= 2) {
    // More than 2 days, show the days ago
    return `${days} days ago`;
  } else if (days === 1) {
    // Yesterday
    return 'Yesterday';
  } else {
    // Today
    return 'Today';
  }
}

export function convertFutureTimestamp(timestamp) {
  if (!timestamp) {
    return 'Invalid timestamp';
  }

  const now = new Date();
  const timestampDate = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date

  const diff = timestampDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days >= 2) {
    // More than 2 days in the future, show the full date
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return timestampDate.toLocaleDateString(undefined, options);
  } else if (days === 1) {
    // Tomorrow
    return 'Tomorrow';
  } else if (days === 0) {
    // Today
    return 'Today';
  } else {
    // In the past
    return `${-days} ${days === 1 ? 'day' : 'days'} ago`;
  }
}

// Function to save a job ID to the user's saved jobs array
export const saveJob = async (jobId, jobTitle) => {
  const auth = getAuth();
    // Ensure the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

  try {
    console.log("User UID:", user.uid);
    // Get the user's document reference
    const userDocRef = doc(db, TALENT, user.uid);

    // Check if the document exists
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      // Document does not exist, create it 
      await setDoc(userDocRef, { jobs: { saved: [] } });
    } else {
      // If document exists, ensure the `jobs` field has the `saved` array
      const userDocData = userDocSnapshot.data();
      if (!userDocData.jobs) {
        // Create the `jobs` field with an empty `saved` array 
        await updateDoc(userDocRef, { jobs: { saved: [] } });
      }
    }

    // Update the user's document with the new saved job ID
    await updateDoc(userDocRef, {
      'jobs.saved': arrayUnion(jobId),
    });

    // Create a notification for the specific user
    const notificationsRef = collection(userDocRef, 'notifications');
    const notificationDocRef = await addDoc(notificationsRef, {
      type: 'save',
      jobTitle: jobTitle,
      date: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error saving job:', error.message);
    throw error;
  }
};

// Function to fetch notifications
export const fetchNotifications = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const notificationsRef = collection(db, TALENT, user.uid, 'notifications');
    const querySnapshot = await getDocs(notificationsRef);
    
    // Map over documents to extract notification data
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
  }
};

// Function to unsave a job ID from the user's saved jobs array
export const unsaveJob = async (jobId) => {
  try {
    // Ensure the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get the user's document reference
    const userDocRef = db.collection('users').doc(user.uid);

    // Update the user's document to remove the job ID from the saved array
    await userDocRef.update({
      saved: db.FieldValue.arrayRemove(jobId),
    });

    console.log('Job unsaved successfully!');
  } catch (error) {
    console.error('Error unsaving job:', error.message);
    throw error;
  }
};
