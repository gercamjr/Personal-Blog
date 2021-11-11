let firebaseConfig = {
    apiKey: "AIzaSyDktfNez5j4Q0NzdoSXI85XU_l6fisdxJI",
    authDomain: "one-star-thoughts.firebaseapp.com",
    projectId: "one-star-thoughts",
    storageBucket: "one-star-thoughts.appspot.com",
    messagingSenderId: "695195344947",
    appId: "1:695195344947:web:a5c32a8624840e5b010346",
    measurementId: "G-WKHMKTH7YF"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload();
}