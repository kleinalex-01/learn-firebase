/* === Imports === */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged,
         GoogleAuthProvider, 
         signInWithPopup} from "firebase/auth";

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyCwm3w-4p_h7tUepPowS2LfPb77WnO_Rp4",
    authDomain: "auth-test-app-49b1d.firebaseapp.com",
    projectId: "auth-test-app-49b1d",
    storageBucket: "auth-test-app-49b1d.firebasestorage.app",
    messagingSenderId: "571092113677",
    appId: "1:571092113677:web:46ace9cba7006bbe337844",
    measurementId: "G-P82M6BVWYC"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")
const signOutButtonEl = document.getElementById("sign-out-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)


/* === Main Code === */

showLoggedOutView()
authState()

/* === Functions === */

const getEmailInputValue = () => emailInputEl.value;
const getPasswordInputValue = () => passwordInputEl.value;
const clearInputFields = () => {
    emailInputEl.value = "";
    passwordInputEl.value = "";
}


/* = Functions - Firebase - Authentication = */
function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    })
}

function authSignInWithEmail() {
    signInWithEmailAndPassword(auth, getEmailInputValue(), getPasswordInputValue())
        .then((userCredential) => {
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
}

function authState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            showLoggedInView()
        } else {
            showLoggedOutView()
        }
    })
}

 function authSignOut() {
    signOut(auth)
     .then(() => {
     })
     .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
     })
 }

function authCreateAccountWithEmail() {
    createUserWithEmailAndPassword(auth, getEmailInputValue(), getPasswordInputValue())
    .then((userCredential) => {
          showLoggedInView()
          clearInputFields()
      })
    .catch((error) => {
      const errorCode =  error.code;
      const errorMessage = error.message;
    });
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}