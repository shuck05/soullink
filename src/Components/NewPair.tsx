import React, { ChangeEvent, useState } from "react";
import { Soullink, Soulpartner } from "../Types";
import { setNewPair } from "../firebase/firestore";

type props = {
  activeSoullink: Soullink | null;
  setActiveSoullink: (soullink: Soullink) => void;
  setNewPair: (v: boolean) => void;
};

export const NewPair: React.FC<props> = (props) => {
  const [pokemon1, setPokemon1] = useState<string>("");
  const [pokemon2, setPokemon2] = useState<string>("");
  const [route, setRoute] = useState<string>("");

  const handlePokemon1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setPokemon1(event.target.value);
  };

  const handlePokemon2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setPokemon2(event.target.value);
  };

  const handleRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoute(event.target.value);
  };

  function capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  const createPair = async () => {
    if (pokemon1 === "" || pokemon2 === "" || route === "") {
      alert("Da fehlt eine Eingabe!");
      return;
    }
    let pokemon1link = "";
    let pokemon1Name = "";
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon1.toLowerCase())
      .then((res) => res.json())
      .then((data) => {
        pokemon1link = data.sprites.front_default;
        pokemon1Name = capitalize(data.name);
      });

    let pokemon2link = "";
    let pokemon2Name = "";
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon2.toLowerCase())
      .then((res) => res.json())
      .then((data) => {
        pokemon2link = data.sprites.front_default;
        pokemon2Name = capitalize(data.name);
      });

    const soulPartner: Soulpartner = {
      id: "",
      route: route,
      pokemon1: pokemon1Name,
      pokemon2: pokemon2Name,
      pokemon1link: pokemon1link,
      pokemon2link: pokemon2link,
      alive: true,
      killer: "",
      reason: "",
    };
    if (soulPartner.pokemon1link === "") {
      alert("The Pokemon 1 was not found!");
      return;
    } else if (soulPartner.pokemon2link === "") {
      alert("The Pokemon 2 was not found!");
      return;
    }
    if (props.activeSoullink === null) return;
    setNewPair(soulPartner, props.activeSoullink.id).then(() => {
      setPokemon1("");
      setPokemon2("");
      setRoute("");
      props.setNewPair(false);
    });
  };

  return (
    <div>
      <h3>Route:</h3>
      <input
        name="Route"
        type="text"
        onChange={(e) => {
          handleRouteChange(e);
        }}
      ></input>
      <h3> Pokemon Spieler 1:</h3>
      <input
        name="Pokemon 1"
        type="text"
        onChange={(e) => {
          handlePokemon1Change(e);
        }}
      ></input>
      <h3>Pokemon Spieler 2:</h3>
      <input
        name="Pokemon 2"
        type="text"
        onChange={(e) => {
          handlePokemon2Change(e);
        }}
      ></input>
      <button className="button button-near-text" onClick={createPair}>
        Create
      </button>
    </div>
  );
};
