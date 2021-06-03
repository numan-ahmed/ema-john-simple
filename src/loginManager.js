import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./components/Login/FaireBaseConfig";
export const initializeLoginFramework = () => {
   if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
   }
}
initializeLoginFramework();
export  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success:true,
        }
        return signedInUser;
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
  export  const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      console.log(result)
    var user = result.user;
    user.success = true;
    return user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode,errorMessage,email,credential)
  });
  }
  export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false,
        }
        return signedOutUser;
      })
      .catch(err => {

      })
  }

  export const createUserWithEmailAndPassword = (name,email,password) => {
   return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      console.log(res);
      updateUserName(name);
      return newUserInfo;
    })
    .catch(function(error){
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });

  }

  export const signInUserWithPassword = (email,password) =>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      console.log(res);
      return newUserInfo;
      

    })
    .catch(function(error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      
    }).then(function () {
      console.log('user name updated successfully');
    }).catch(function (error) {
     console.log(error)
    });
  }
