import React, { ChangeEvent, useEffect, useState } from "react";
import { Soullink, Soulpartner } from "../Types";
import { NewPair } from "./NewPair";
import {
  setPartner,
  getSoullinkById,
  deleteSoulpartnerById,
} from "../firebase/firestore";

type props = {
  activeSoullink: Soullink | null;
  setActiveSoullink: (soullink: Soullink) => void;
};

export const Main: React.FC<props> = (props) => {
  const [activePair, setActivePair] = useState<Soulpartner | null>(null);
  const [newPair, setNewPair] = useState<Boolean>(false);
  const [textfield, setTextfield] = useState<string>("");
  const [playerArray, setPlayerArray] = useState<String[]>([]);
  const [killingPlayer, setKillingPlayer] = useState<string | null>(
    props.activeSoullink?.player1 || null
  );

  useEffect(() => {
    console.log("UseEffect Main");
    if (props.activeSoullink !== null) {
      setPlayerArray([
        props.activeSoullink.player1,
        props.activeSoullink.player2,
      ]);
    }
  }, [props.activeSoullink]);

  const toggleActivePair = (partner: Soulpartner) => {
    partner === activePair ? setActivePair(null) : setActivePair(partner);
  };

  const handleTextfieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextfield(event.target.value);
  };

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setKillingPlayer(event.target.value);
  };

  const revive = () => {
    if (props.activeSoullink === null) return;
    if (activePair === null) return;
    const pair: Soulpartner = {
      id: activePair.id,
      alive: true,
      killer: "",
      reason: "",
      pokemon1: activePair.pokemon1,
      pokemon1link: activePair.pokemon1link,
      pokemon2: activePair.pokemon2,
      pokemon2link: activePair.pokemon2link,
      route: activePair.route,
      catched: activePair.catched,
    };
    setPartner(pair, props.activeSoullink.id);
    getSoullinkById(props.activeSoullink.id).then((soullink) => {
      if (soullink === null) return;
      props.setActiveSoullink(soullink);
      setActivePair(null);
    });
  };

  const newDeadPartners = () => {
    if (props.activeSoullink === null) return;
    let killer = "";
    if (killingPlayer === "player1" || killingPlayer === null) {
      killer = props.activeSoullink.player1;
    } else if (killingPlayer === "player2") {
      killer = props.activeSoullink.player2;
    }
    if (activePair === null) return;
    const deadPair: Soulpartner = {
      id: activePair.id,
      alive: false,
      killer: killer,
      reason: textfield,
      pokemon1: activePair.pokemon1,
      pokemon1link: activePair.pokemon1link,
      pokemon2: activePair.pokemon2,
      pokemon2link: activePair.pokemon2link,
      route: activePair.route,
      catched: activePair.catched,
    };
    setPartner(deadPair, props.activeSoullink.id);
    getSoullinkById(props.activeSoullink.id).then((soullink) => {
      if (soullink === null) return;
      props.setActiveSoullink(soullink);
      setActivePair(null);
    });
  };

  const handleDeleteSoulpartner = () => {
    if (props.activeSoullink === null) return;
    if (activePair === null) return;
    deleteSoulpartnerById(props.activeSoullink.id, activePair.id).then(() => {
      alert("Erfolgreich gelöscht");
    });
    getSoullinkById(props.activeSoullink.id).then((soullink) => {
      if (soullink === null) return;
      props.setActiveSoullink(soullink);
      setActivePair(null);
    });
  };

  const getKillCount = () => {
    if (props.activeSoullink === null) return;
    let killsPlayer1 = 0;
    let killsPlayer2 = 0;
    for (let i = 0; i < props.activeSoullink.soulpartner.length; i++) {
      if (!props.activeSoullink.soulpartner[i].alive) {
        if (
          props.activeSoullink.player1 ===
          props.activeSoullink.soulpartner[i].killer
        ) {
          killsPlayer1++;
        } else {
          killsPlayer2++;
        }
      }
    }
    return (
      <h2>
        {"Killcounter: "} {props.activeSoullink.player1}: {killsPlayer1}{" "}
        {props.activeSoullink.player2}: {killsPlayer2}{" "}
      </h2>
    );
  };

  return (
    <div className="mainpage">
      {props.activeSoullink !== null ? (
        <div className="mainpage-middle">
          <div className="flex-space-between">
            <h1>{props.activeSoullink?.name}</h1>
            <h3
              onClick={() => {
                setNewPair(!newPair);
                setActivePair(null);
              }}
            >
              Neues Paar
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "70vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <h2>Route</h2>
              <h2>{props.activeSoullink?.player1}</h2>
              <h2>{props.activeSoullink?.player2}</h2>
            </div>
            <ul className="u-List-sidedrawer u-List">
              {props.activeSoullink?.soulpartner.map((e) => (
                <div
                  key={e.route}
                  onClick={() => toggleActivePair(e)}
                  className="pokemonList"
                >
                  <h2>{e.route}</h2>
                  <img
                    src={e.pokemon1link}
                    alt={e.pokemon1}
                    style={{ ["--alive" as any]: e.alive ? 0 : 1 }}
                  ></img>
                  <img
                    src={e.pokemon2link}
                    alt={e.pokemon2}
                    style={{ ["--alive" as any]: e.alive ? 0 : 1 }}
                  ></img>
                </div>
              ))}
            </ul>
          </div>
          {getKillCount()}
        </div>
      ) : (
        <div></div>
      )}

      <div className="mainpage-right">
        {newPair && props.activeSoullink !== null ? (
          <NewPair
            activeSoullink={props.activeSoullink}
            setActiveSoullink={props.setActiveSoullink}
            setNewPair={setNewPair}
          ></NewPair>
        ) : (
          <div>
            {activePair !== null ? (
              <div>
                <div className="flex-justify-end">
                  <button onClick={handleDeleteSoulpartner}>X</button>
                </div>
                <h1>
                  Paar: {activePair?.pokemon1} und {activePair?.pokemon2}
                </h1>
                {activePair.alive ? (
                  <div>
                    <h3>Wer ist verantwortlich?</h3>
                    <select
                      name="Player"
                      id="players"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                    >
                      <option value={"player1"}>{playerArray[0]}</option>
                      <option value={"player2"}>{playerArray[1]}</option>
                    </select>
                    <h3>Warum sind sie gestorben?</h3>
                    <input
                      name="Reason"
                      type="text"
                      onChange={(e) => {
                        handleTextfieldChange(e);
                      }}
                    ></input>
                    <button
                      className="button-near-text"
                      onClick={newDeadPartners}
                    >
                      RIP
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2>Killer: {activePair?.killer}</h2>
                    <h2>Grund des Todes: </h2>
                    <h3>{activePair?.reason}</h3>
                    <button
                      onClick={() => {
                        revive();
                      }}
                    >
                      Klicken zum Wiederbeleben
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
