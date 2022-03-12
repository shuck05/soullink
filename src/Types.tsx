export type Soulpartner = {
  pokemon1: string;
  pokemon2: string;
  pokemon1link: string;
  pokemon2link: string;
  route: string;
  alive: boolean;
  killer: string;
  reason: string;
};

export type Soullink = {
  name: string;
  Player1: string;
  Player2: string;
  soulpartner: Soulpartner[];
  lastPlayed: Date;
  Edition: string;
};
