import React, { ChangeEvent, useState } from "react";
import { Soullink } from "../Types";
import { createNewSoullink } from "../firebase/firestore";

type props = {
  setActiveSoullink: (soullink: Soullink) => void;
};

export const NewSoullink: React.FC<props> = (props) => {
  const [name, setName] = useState<string>("");
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [edition, setEdition] = useState<string>("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePlayer1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer1(event.target.value);
  };
  const handlePlayer2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer2(event.target.value);
  };
  const handleEditionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEdition(event.target.value);
  };
  const handleNewSoullink = () => {
    const soullink: Soullink = {
      name: name,
      player1: player1,
      player2: player2,
      edition: edition,
      id: "dummy",
      lastPlayed: new Date(),
      soulpartner: [],
    };
    console.log(soullink);
    createNewSoullink(soullink)
      .then(() => {
        alert("Soullink wurde erstellt.");
      })
      .catch(() => {
        alert("An Error occoured");
      });
  };

  return (
    <div
      style={{
        padding: "5vh",
        width: "50vw",
        borderRight: "solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <h3>Name:</h3>
      <input
        name="Name"
        type="text"
        onChange={(e) => {
          handleNameChange(e);
        }}
      ></input>
      <h3>Player 1:</h3>
      <input
        name="Player1"
        type="text"
        onChange={(e) => {
          handlePlayer1Change(e);
        }}
      ></input>
      <h3>Player 2:</h3>
      <input
        name="Player2"
        type="text"
        onChange={(e) => {
          handlePlayer2Change(e);
        }}
      ></input>
      <h3>Edition:</h3>
      <input
        name="Edition"
        type="text"
        onChange={(e) => {
          handleEditionChange(e);
        }}
      ></input>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <h2 onClick={handleNewSoullink}>Neue Soullink erstellen</h2>
      </div>
    </div>
  );
};

export default NewSoullink;
