import firebase_app from "./config";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

/**
 *
 * @param {*} colllection
 * @param {*} id
 * @param {*} data
 * @returns
 */
export async function addData(colllection, id, data) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDoument(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDocuments(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const listDocs = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    listDocs.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return Promise.all(listDocs);
}
