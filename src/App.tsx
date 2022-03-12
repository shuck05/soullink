import { useEffect, useState } from "react";
import "./App.css";
import { Side } from "./Components/Side";
import { Main } from "./Components/Main";
import { Soullink } from "./Types";
import { testSoullink, testSoullink2 } from "./DummyData";

export const App = () => {
  const [soullinkList, setSoullinkList] = useState([
    testSoullink,
    testSoullink2,
  ]);
  const [activeSoullink, setActiveSoullink] = useState(testSoullink);

  useEffect(() => {
    console.log("App UseEffect");
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
        <Main activeSoullink={activeSoullink}></Main>
      </div>
    </div>
  );
};

export default App;
