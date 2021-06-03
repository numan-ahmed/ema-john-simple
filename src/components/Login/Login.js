import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import firebase from "firebase/app";

import { handleFbSignIn, handleGoogleSignIn, initializeLoginFramework,handleSignOut, createUserWithEmailAndPassword, signInUserWithPassword } from '../../loginManager';

initializeLoginFramework();

function Login () {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();
   
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn =() =>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res,true);
    
    })
  }
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res,true);
    })

  }

  const signOut = () => {
    handleSignOut()
    .then(res =>{
      handleResponse(res,false);

    })

  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false,
        }
        setUser(signedOutUser);
        console.log('');
      })
      .catch(err => {

      })
    }

const handleResponse = (res,redirect) =>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }

}

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = (isPasswordValid && passwordHasNumber)

    }
    if (isFieldValid) {
      //[...cart,newItem]
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);

    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res =>{
        handleResponse(res,true);

      })

    }
    if (!newUser && user.email && user.password) {
      signInUserWithPassword(user.email,user.password)
      .then(res =>{
        console.log(res);
        handleResponse(res,true);

      })
    
    }
  }

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      <button onClick={fbSignIn}>Sign in using facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome! {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt='' />
        </div>
      }

      <h1> Our own Authentication</h1>
      <input type='checkbox' onChange={() => setNewUser(!newUser)}></input>
      <label htmlFor='newUser'>New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input onBlur={handleBlur} name='name' placeholder='your name' />
        }
        <br></br>
        <input onBlur={handleBlur} name='email' type='text' placeholder='your email address' required />
        <br></br>
        <input onBlur={handleBlur} name='password' type='password' placeholder='your password' required />
        <br></br>
        <input type='submit' value={newUser ? 'sign up' : 'sign in'} />

      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} successfully</p>
      }
    </div>
  );
};

export default Login;