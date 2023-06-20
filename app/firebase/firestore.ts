import firebase_app from "./config";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

/**
 *
 * @param {*} colllection
 * @param {*} id
 * @param {*} data
 * @returns
 */
export async function setData(colllection: string, id: string, data: any) {
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

export async function addData(colllection: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, colllection), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDoument(collection: string, id: string) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function watchDocument(
  collectionName: string,
  id: string,
  callback: (data: any) => void
) {
  const unsub = onSnapshot(doc(db, collectionName, id), (doc) => {
    callback(doc.data());
  });
  return unsub();
}
export async function getDocuments(collectionName: string): Promise<any[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const listDocs: any[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return listDocs;
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

export async function deleteDocument(
  id: string,
  collectionName: string
): Promise<void> {
  try {
    return await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.log("error", error);
  }
}
