import React, { useState } from "react";
import App from "./App";

export const Login = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <div>
      {loggedIn ? (
        <App></App>
      ) : (
        <h4>
          <input type="text" />
        </h4>
      )}
    </div>
  );
};

export default Login;
