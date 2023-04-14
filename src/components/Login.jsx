import React, { useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const logingUser = result.user;
        console.log(logingUser);
        setUser(logingUser);
      })
      .catch((error) => {
        console.log("It's error broo", error.massage);
      });
  };
  const handleSingOut = () => {
    signOut(auth).then((result) => {
      console.log(result);
      setUser(result);
    });
  };
  return (
    <div>
      {user ? (
        <button onClick={handleSingOut}>Sing Out</button>
      ) : (
        <button onClick={handleGoogleLogin}> Google Login</button>
      )}
      {user && (
        <div>
          <h4>user: {user.displayName}</h4>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
