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
  onSnapshot,
  orderBy,
  query,
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
  browserSessionPersistence,
} from "firebase/auth";
import showAlert from "@/components/utils/AlertBox/CustomAlert";

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
export const loginUser = async (email, password) => {
  const auth = getAuth();
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
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
export const saveJob = async (jobId) => {
  try {
    // Ensure the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get the user's document reference
    const userDocRef = db.collection(TALENT).doc(user.uid);

    // Update the user's document with the new saved job ID
    await userDocRef.update({
      saved: db.FieldValue.arrayUnion(jobId),
    });

    console.log('Job saved successfully!');
  } catch (error) {
    console.error('Error saving job:', error.message);
    throw error;
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
