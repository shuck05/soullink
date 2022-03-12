import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Soullink, Soulpartner } from "../Types";

const db = getFirestore(app);

const getSoullinks = async () => {
  const arr: Soullink[] = [];
  const querySnapshot = await getDocs(collection(db, "soullinks"));
  querySnapshot.forEach((doc) => {
    const soullink: Soullink = {
      id: doc.id,
      name: doc.data().name,
      player1: doc.data().player1,
      player2: doc.data().player2,
      edition: doc.data().edition,
      lastPlayed: new Date(doc.data().lastPlayed.seconds * 1000),
      soulpartner: [],
    };
    arr.push(soullink);
  });
  for (let i = 0; i < arr.length; i++) {
    const querySnapshotSoulpartners = await getDocs(
      collection(db, "soullinks/" + arr[i].id + "/soulpartners")
    );
    querySnapshotSoulpartners.forEach((soulpartner) => {
      const partner: Soulpartner = {
        route: soulpartner.data().route,
        pokemon1: soulpartner.data().pokemon1,
        pokemon2: soulpartner.data().pokemon2,
        pokemon1link: soulpartner.data().pokemon1link,
        pokemon2link: soulpartner.data().pokemon2link,
        alive: soulpartner.data().alive,
        killer: soulpartner.data().killer,
        reason: soulpartner.data().reason,
      };
      arr[i].soulpartner.push(partner);
    });
  }
  console.log(arr);
  return arr;
};

export { getSoullinks };