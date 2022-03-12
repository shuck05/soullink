import React, { ChangeEvent, useEffect, useState } from "react";
import { Soullink, Soulpartner } from "../Types";
import { NewPair } from "./NewPair";

type props = {
  activeSoullink: Soullink;
};

export const Main: React.FC<props> = (props) => {
  const [activePair, setActivePair] = useState<Soulpartner | null>(null);
  const [newPair, setNewPair] = useState<Boolean>(false);
  const [textfield, setTextfield] = useState<string>("");
  const [killingPlayer, setKillingPlayer] = useState<string>(
    props.activeSoullink.Player1
  );

  useEffect(() => {
    console.log("UseEffect Main");
  }, []);

  const playerArr = [
    props.activeSoullink.Player1,
    props.activeSoullink.Player2,
  ];

  const toggleActivePair = (partner: Soulpartner) => {
    partner === activePair ? setActivePair(null) : setActivePair(partner);
  };

  const handleTextfieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextfield(event.target.value);
  };

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setKillingPlayer(event.target.value);
  };

  const newDeadPartners = () => {
    console.log(textfield);
    console.log(killingPlayer);
  };

  function dummy() {
    console.log(activePair);
  }

  return (
    <div className="mainpage">
      <div className="mainpage-middle">
        <div className="flex-space-between">
          <h1>{props.activeSoullink.name}</h1>
          <h3
            onClick={() => {
              setNewPair(!newPair);
              setActivePair(null);
            }}
          >
            Neues Paar
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <h2>Route</h2>
            <h2>{props.activeSoullink.Player1}</h2>
            <h2>{props.activeSoullink.Player2}</h2>
          </div>
          <ul className="u-List-sidedrawer u-List">
            {props.activeSoullink.soulpartner.map((e) => (
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
        <h2>
          Letzte Änderung am
          {props.activeSoullink.lastPlayed.toLocaleDateString()}
        </h2>
      </div>
      <div className="mainpage-right">
        {newPair ? (
          <NewPair></NewPair>
        ) : (
          <div>
            {activePair !== null ? (
              <div>
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
                      <option value={props.activeSoullink.Player1}>
                        {props.activeSoullink.Player1}
                      </option>
                      <option value={props.activeSoullink.Player2}>
                        {props.activeSoullink.Player2}
                      </option>
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
                    <button>Klicken zum Wiederbeleben</button>
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

/*
fetch("https://pokeapi.co/api/v2/pokemon/" + r)
      .then((res) => res.json())
      .then((data) => {
        setSpritesPlayer1([...spritesPlayer1, data.sprites.front_default]);
        console.log(spritesPlayer1);
      });
*/
