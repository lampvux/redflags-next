import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  setPersistence,
  browserSessionPersistence,
  User,
  Auth,
  inMemoryPersistence,
} from "firebase/auth";

import firebase_app from "./config";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const getCurrentUser = async (): Promise<User | null> => {
  const auth = getAuth(firebase_app);
  try {
    await setPersistence(auth, inMemoryPersistence);
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  }

  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
};

/**
 * We only allow sign through google account
 */
export function signIn() {
  // Step 1.
  const auth = getAuth(firebase_app);
  // User tries to sign in to Google.

  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user", user);
      return user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch(function (error) {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return null;
    });
}
/**
 * Sign out
 */
export function logOut() {
  const auth = getAuth(firebase_app);
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
