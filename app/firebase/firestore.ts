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
  const listDocs: any[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        listDocs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
    } catch (error) {
      console.log("error", error);
    }
    Promise.all(listDocs).then((documents) => {
      resolve(documents);
    });
  });
}
