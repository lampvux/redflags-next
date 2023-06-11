import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

import firebase_app from "./config";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const auth = getAuth(firebase_app);

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
      return result;
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
