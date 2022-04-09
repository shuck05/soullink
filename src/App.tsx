import { useEffect, useState } from "react";
import "./App.css";
import { Side } from "./Components/Side";
import { Main } from "./Components/Main";
import { Soullink } from "./Types";
import { getSoullinks } from "./firebase/firestore";
import NewSoullink from "./Components/NewSoullink";
import { signOut, getAuth } from "firebase/auth";
import { app } from "./firebase/firebase";

export const App = () => {
  const [soullinkList, setSoullinkList] = useState<Soullink[]>([]);
  const [activeSoullink, setActiveSoullink] = useState<Soullink | null>(null);
  const [newSoullink, setNewSoullink] = useState<boolean>(true);
  useEffect(() => {
    console.log("App UseEffect");
    getSoullinks().then((arr) => setSoullinkList(arr));
  }, []);

  const toggleNewSL = () => {
    setNewSoullink(!newSoullink);
  };

  const logout = () => {
    signOut(getAuth(app)).catch(() => {
      alert("Logout Failed");
    });
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="Header">
        <h2>Soullink Schosch</h2>
        <h2 onClick={logout}>Logout</h2>
      </div>
      <div className="Page">
        <Side
          soullinkList={soullinkList}
          setActiveSoullink={setActiveSoullink}
          activeSoullink={activeSoullink}
          toggleNewSL={toggleNewSL}
        ></Side>
        {newSoullink ? (
          <Main
            activeSoullink={activeSoullink}
            setActiveSoullink={setActiveSoullink}
          ></Main>
        ) : (
          <NewSoullink setActiveSoullink={setActiveSoullink}></NewSoullink>
        )}
      </div>
    </div>
  );
};

export default App;
