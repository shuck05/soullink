import { useEffect, useState } from "react";
import "./App.css";
import { Side } from "./Components/Side";
import { Main } from "./Components/Main";
import { Soullink } from "./Types";
import { getSoullinks } from "./firebase/firestore";

export const App = () => {
  const [soullinkList, setSoullinkList] = useState<Soullink[]>([]);
  const [activeSoullink, setActiveSoullink] = useState<Soullink | null>(null);

  useEffect(() => {
    console.log("App UseEffect");
    getSoullinks().then((arr) => setSoullinkList(arr));
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <h2>Soullink Schosch</h2>
        <h2>Maybe ein Button oder so</h2>
      </div>
      <div className="Page">
        <Side
          soullinkList={soullinkList}
          setActiveSoullink={setActiveSoullink}
          activeSoullink={activeSoullink}
        ></Side>
        <Main
          activeSoullink={activeSoullink}
          setActiveSoullink={setActiveSoullink}
        ></Main>
      </div>
    </div>
  );
};

export default App;
