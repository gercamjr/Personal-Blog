const firebaseConfig = {
    apiKey: "AIzaSyCWwz68EH9WWcz9t8_hoLPqkkHjwCA3LE8",
    authDomain: "no-hay-pedo-blog.firebaseapp.com",
    projectId: "no-hay-pedo-blog",
    storageBucket: "no-hay-pedo-blog.appspot.com",
    messagingSenderId: "578813113349",
    appId: "1:578813113349:web:b750fa1496a9230085186c"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload();
}