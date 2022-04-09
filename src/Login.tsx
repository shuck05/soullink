import React, { ChangeEvent, useState } from "react";
import App from "./App";
import { app } from "./firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const login = () => {
    signInWithEmailAndPassword(auth, email, "321654987")
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        alert("False Password");
      });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const auth = getAuth(app);

  return (
    <div>
      {loggedIn ? (
        <App></App>
      ) : (
        <div>
          <input
            type="text"
            onChange={(e) => {
              handleEmailChange(e);
            }}
          />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
