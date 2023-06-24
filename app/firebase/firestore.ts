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
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
  query,
  where,
  updateDoc,
  arrayUnion,
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

export async function updateDocumentArrayField(
  collectionName: string,
  id: string,
  field: string,
  data: any
) {
  const docRef = doc(db, collectionName, id);
  let result = null;
  let error = null;

  try {
    result = await updateDoc(docRef, {
      [field]: arrayUnion(data),
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function addData(colllection: string, data: any) {
  let result: DocumentReference<any> | null = null;
  let error = null;

  try {
    result = await addDoc(collection(db, colllection), data);
  } catch (e) {
    error = e;
    throw new Error(JSON.stringify(e));
  }

  return { id: result.id, result, error };
}

// find document by field value
export async function findDocument(
  collectionName: string,
  field: any,
  value: any
) {
  const q = query(collection(db, collectionName), where(field, "==", value));

  const querySnapshot = await getDocs(q);

  const listDocs: any[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  return listDocs.pop();
}

export async function getDoument(collection: string, id: string) {
  const docRef = doc(db, collection, id);

  let result: DocumentSnapshot<DocumentData> | null = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

/**
 *
 *  @param {string} collectionName
 *  @param {string} id
 *  @param {(data: any) => void} callback
 *  @returns {Promise<() => void>}
 *
 * */

export async function watchDocument(
  collectionName: string,
  id: string,
  callback: (data: any) => void
) {
  //
  const unsub = onSnapshot(doc(db, collectionName, id), (doc) => {
    console.log("data: ", [doc.id, doc.data()]);
    callback(doc.data());
  });
  return unsub();
}

/**
 * @param {string} collectionName
 *  @returns {Promise<any[]>}
 * */

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
