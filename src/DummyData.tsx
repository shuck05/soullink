import { Soulpartner, Soullink } from "./Types";

const soulpartner1: Soulpartner = {
  pokemon1: "Sichlor",
  pokemon2: "Lucario",
  pokemon1link:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png",
  pokemon2link:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png",
  route: "Route 1",
  alive: true,
  killer: "",
  reason: "",
};

const soulpartner2: Soulpartner = {
  pokemon1: "Glumanda",
  pokemon2: "Chelast",
  pokemon1link:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  pokemon2link:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/387.png",
  route: "Kraterberg",
  alive: true,
  killer: "",
  reason: "",
};

const soulpartner3: Soulpartner = {
  pokemon1: "Krabby",
  pokemon2: "Junglut",
  pokemon1link:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png",
  pokemon2link:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/256.png",
  route: "Kraftwerk",
  alive: false,
  killer: "Alex",
  reason: "Fast foreward wie ein Anfänger",
};

export const testSoullink: Soullink = {
  name: "Soullink1",
  Player1: "Alex",
  Player2: "Basti",
  soulpartner: [soulpartner1, soulpartner2, soulpartner3],
  lastPlayed: new Date(),
  Edition: "Platimant",
};

export const testSoullink2: Soullink = {
  name: "Soullink2",
  Player1: "Basti",
  Player2: "Alex",
  soulpartner: [soulpartner2, soulpartner3],
  lastPlayed: new Date(),
  Edition: "Smabin",
};
