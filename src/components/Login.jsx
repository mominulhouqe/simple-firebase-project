import React, { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { GithubAuthProvider } from "firebase/auth";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLogin = () => {

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const logingUser = result.user;
        console.log(logingUser);
        setUser(logingUser);
      })
      .catch((error) => {
        console.log("It's error broo", error.massage);
      });

  };
  const handleGithubSingIn = ()=>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const loginUser = result.user;
      setUser(loginUser);
    })
    .catch(error=>{
      console.log("It' s Your ", error.massage);
    })
  }


  const handleSingOut = () => {
    signOut(auth).then((result) => {
      console.log(result);
      setUser(result);
    });
  };

  return (
    <div>
      {
      user ? 
        <button onClick={handleSingOut}>Sing Out</button>
       :
      <>
         
        <button onClick={handleGoogleLogin}> Google Login</button>
        <button onClick={handleGithubSingIn}>Github login</button>
      

      </>


      }
      
      {user && (
        <div>
          <h4>user: {user.displayName}</h4>
          <p>Email: {user.email }</p>
          <p>LastSignIn Time: {user.metadata.lastSignInTime}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
