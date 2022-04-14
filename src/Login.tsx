import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import App from "./App";
import { app } from "./firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    console.log("UseEffectLogin");
    console.log(getAuth(app).currentUser);
    setTimeout(() => {
      checkLoggedIn();
    }, 500);
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, "321654987")
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        alert("False Password");
      });
  };

  const checkLoggedIn = () => {
    if (getAuth(app).currentUser !== null) {
      console.log("Setting Logged in");
      setLoggedIn(true);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(getAuth(app).currentUser);
    console.log(loggedIn);
  };

  const auth = getAuth(app);

  return (
    <div>
      {loggedIn ? (
        <App></App>
      ) : (
        <div
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            style={{ marginRight: "10px" }}
            type="text"
            onKeyPress={handleKeyPress}
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
