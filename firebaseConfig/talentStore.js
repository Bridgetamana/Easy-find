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
  import { db } from "./firebase";
  import { getAuth, signOut } from "firebase/auth";
//   import { useNavigate } from "react-router-dom";

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
    }
}

//Add New Talent
export const addNewTalent = async (talent) => {
    const user = getAuth().currentUser;
    const createdAt = serverTimestamp();
    const newTalent = {
        ...talent,
        createdAt,
        // createdBy: user.uid,
    };
    const docRef = await addDoc(collection(db, TALENT), newTalent);
    return docRef.id;
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
