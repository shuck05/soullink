import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
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
  const [checkPokemon, setCheckPokemon] = useState<string>("");
  const [checkRoute, setCheckRoute] = useState<string>("");

  useEffect(() => {
    console.log("App UseEffect");
    getSoullinks().then((arr) => setSoullinkList(arr));
  }, []);

  const toggleNewSL = () => {
    setNewSoullink(!newSoullink);
  };
  const handlePokemonTFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckPokemon(event.target.value);
  };

  const checkPokemonfunc = () => {
    if (activeSoullink === null) return;
    var bool1: boolean = false;
    var bool2: boolean = false;

    console.log("asdasdasd");
    for (let i = 0; i < activeSoullink.soulpartner.length; i++) {
      if (!bool1 && checkPokemon === activeSoullink.soulpartner[i].pokemon1) {
        bool1 = true;
      } else if (
        !bool2 &&
        checkPokemon === activeSoullink.soulpartner[i].pokemon2
      ) {
        bool2 = true;
      }
    }
    if (bool1 && bool2) {
      alert("Ihr beide hattet dieses Pokemon schon. Nuttenmon!");
      return;
    } else if (bool1) {
      alert(
        "Das Pokemon wurde von " + activeSoullink.player1 + " schon gefangen."
      );
      return;
    } else if (bool2) {
      alert(
        "Das Pokemon wurde von " + activeSoullink.player2 + " schon gefangen."
      );
      return;
    } else {
      alert("Das Pokemon wurde nocht nicht gefangen.");
    }
  };

  const handleKeyPressPokemon = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      checkPokemonfunc();
    }
  };

  const handleRouteTFChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckRoute(event.target.value);
    console.log(activeSoullink?.soulpartner);
  };

  const checkRoutefunc = () => {
    if (activeSoullink === null) return;
    for (let i = 0; i < activeSoullink.soulpartner.length; i++) {
      if (checkRoute === activeSoullink.soulpartner[i].route) {
        alert("Auf dieser Route wurde bereits gefangen!");
        return;
      }
    }
    alert("Auf dieser Route kann noch etwas gefangen werden!");
  };

  const handleKeyPressRoute = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      checkRoutefunc();
    }
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
        {activeSoullink ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginRight: "10px" }}>Pokemon: </h2>
            <input
              style={{ marginRight: "10px" }}
              onChange={(e) => {
                handlePokemonTFChange(e);
              }}
              onKeyPress={handleKeyPressPokemon}
            ></input>
            <h2 style={{ marginRight: "10px" }}>Route: </h2>
            <input
              onChange={(e) => {
                handleRouteTFChange(e);
              }}
              onKeyPress={handleKeyPressRoute}
            ></input>
          </div>
        ) : (
          <div></div>
        )}
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
