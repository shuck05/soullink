export type Soulpartner = {
  id: string;
  route: string;
  pokemon1: string;
  pokemon2: string;
  pokemon1link: string;
  pokemon2link: string;
  alive: boolean;
  killer: string;
  reason: string;
};

export type Soullink = {
  id: string;
  name: string;
  player1: string;
  player2: string;
  soulpartner: Soulpartner[];
  lastPlayed: Date;
  edition: string;
};
